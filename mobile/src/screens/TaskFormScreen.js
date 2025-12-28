import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  SegmentedButtons,
  ActivityIndicator,
} from 'react-native-paper';
import { tasksAPI } from '../services/api';

const TaskFormScreen = ({ route, navigation }) => {
  const { task } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    }
  }, [task]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate && formData.dueDate.trim() ? formData.dueDate.trim() : null,
      };
      
      if (task) {
        await tasksAPI.update(task._id, submitData);
        Alert.alert('Success', 'Task updated successfully');
      } else {
        await tasksAPI.create(submitData);
        Alert.alert('Success', 'Task created successfully');
      }
      navigation.goBack();
    } catch (error) {
      let message = 'Operation failed';
      
      if (error.response?.data) {
        // Show validation errors if available
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          message = error.response.data.errors.join('\n');
        } else if (error.response.data.message) {
          message = error.response.data.message;
        }
      } else if (error.message) {
        message = error.message;
      }
      
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          label="Title"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          mode="outlined"
          style={styles.input}
          disabled={loading}
        />

        <TextInput
          label="Description"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
          disabled={loading}
        />

        <View style={styles.section}>
          <Button disabled style={styles.sectionLabel}>
            Status
          </Button>
          <SegmentedButtons
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
            buttons={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
            disabled={loading}
          />
        </View>

        <View style={styles.section}>
          <Button disabled style={styles.sectionLabel}>
            Priority
          </Button>
          <SegmentedButtons
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value })}
            buttons={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
            disabled={loading}
          />
        </View>

        <TextInput
          label="Due Date"
          value={formData.dueDate}
          onChangeText={(text) => setFormData({ ...formData, dueDate: text })}
          mode="outlined"
          placeholder="YYYY-MM-DD (optional, e.g., 2025-12-29)"
          helperText="Leave empty or use format: YYYY-MM-DD"
          style={styles.input}
          disabled={loading}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          disabled={loading}
        >
          {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </Button>

        {loading && (
          <ActivityIndicator animating={true} style={styles.loader} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 8,
    paddingVertical: 4,
  },
  loader: {
    marginTop: 16,
  },
});

export default TaskFormScreen;

