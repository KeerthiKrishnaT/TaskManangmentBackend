import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import {
  FAB,
  Card,
  Text,
  Chip,
  IconButton,
  ActivityIndicator,
  Searchbar,
  Menu,
  Button,
} from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

const TaskListScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = useCallback(async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  }, [logout, navigation]);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleLogout}
          style={{ 
            marginRight: 16,
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          <RNText style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Logout
          </RNText>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleLogout]);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchTasks = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const params = {
        limit: 50,
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter && { status: statusFilter }),
      };

      const response = await tasksAPI.getAll(params);
      setTasks(response.data.data.tasks);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch tasks');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [searchQuery, statusFilter])
  );

  const handleDelete = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await tasksAPI.delete(taskId);
              fetchTasks();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task');
            }
          },
        },
      ]
    );
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return;

      await tasksAPI.update(taskId, {
        ...task,
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      Alert.alert('Error', 'Failed to update task status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      default:
        return '#2196f3';
    }
  };

  const renderTask = ({ item }) => (
    <Card style={styles.taskCard} onPress={() => navigation.navigate('TaskForm', { task: item })}>
      <Card.Content>
        <View style={styles.taskHeader}>
          <Text variant="titleMedium" style={styles.taskTitle}>
            {item.title}
          </Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => handleDelete(item._id)}
          />
        </View>

        {item.description ? (
          <Text variant="bodyMedium" style={styles.taskDescription}>
            {item.description}
          </Text>
        ) : null}

        <View style={styles.chipContainer}>
          <Chip
            icon="circle"
            style={[styles.chip, { backgroundColor: getStatusColor(item.status) }]}
            textStyle={styles.chipText}
            onPress={() => {
              const statuses = ['pending', 'in-progress', 'completed'];
              const currentIndex = statuses.indexOf(item.status);
              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
              handleUpdateStatus(item._id, nextStatus);
            }}
          >
            {item.status}
          </Chip>
          <Chip
            style={[styles.chip, { backgroundColor: getPriorityColor(item.priority) }]}
            textStyle={styles.chipText}
          >
            {item.priority}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );


  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search tasks"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={styles.searchbar}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={styles.filterButton}
            >
              Filter: {statusFilter || 'All'}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setStatusFilter('');
              setMenuVisible(false);
            }}
            title="All"
          />
          <Menu.Item
            onPress={() => {
              setStatusFilter('pending');
              setMenuVisible(false);
            }}
            title="Pending"
          />
          <Menu.Item
            onPress={() => {
              setStatusFilter('in-progress');
              setMenuVisible(false);
            }}
            title="In Progress"
          />
          <Menu.Item
            onPress={() => {
              setStatusFilter('completed');
              setMenuVisible(false);
            }}
            title="Completed"
          />
        </Menu>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchTasks(true)} />
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              No tasks found. Create your first task!
            </Text>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm', { task: null })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchbar: {
    marginBottom: 8,
  },
  filterButton: {
    marginTop: 8,
  },
  listContent: {
    padding: 16,
  },
  taskCard: {
    marginBottom: 12,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  taskDescription: {
    color: '#666',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    height: 32,
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
});

export default TaskListScreen;

