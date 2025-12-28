import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'warning';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    default:
      return 'info';
  }
};

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString();
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {task.description}
              </Typography>
            )}
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mt={2}>
              <Chip
                label={task.status}
                color={getStatusColor(task.status)}
                size="small"
              />
              <Chip
                label={task.priority}
                color={getPriorityColor(task.priority)}
                size="small"
              />
              {task.dueDate && (
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`Due: ${formatDate(task.dueDate)}`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>
          <Box>
            <IconButton color="primary" onClick={() => onEdit(task)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(task._id)} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

