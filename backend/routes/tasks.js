const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const {
  validateCreateTask,
  validateUpdateTask,
} = require('../middleware/validation');

// All routes require authentication
router.use(protect);

router.post('/', validateCreateTask, createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', validateUpdateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;

