const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { createTaskRules, updateTaskRules, validate } = require('../middleware/validation');

// GET /api/tasks — Get all tasks with optional filtering & sorting
router.get('/', async (req, res) => {
  try {
    const { status, priority, sort, search } = req.query;

    // Build filter object
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (priority && priority !== 'all') filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    let sortObj = { createdAt: -1 }; // default: newest first
    switch (sort) {
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'dueDate':
        sortObj = { dueDate: 1, createdAt: -1 };
        break;
      case 'priority':
        // Custom sort: high > medium > low
        sortObj = { priority: -1, createdAt: -1 };
        break;
      case 'title':
        sortObj = { title: 1 };
        break;
      default:
        break;
    }

    const tasks = await Task.find(filter).sort(sortObj);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/tasks/:id — Get a single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }
    console.error('Error fetching task:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/tasks — Create a new task
router.post('/', createTaskRules, validate, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
    });

    const savedTask = await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask,
    });
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/tasks/:id — Update a task
router.put('/:id', updateTaskRules, validate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const allowedFields = ['title', 'description', 'status', 'priority', 'dueDate'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    const updatedTask = await task.save();

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }
    console.error('Error updating task:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/tasks/:id — Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }
    console.error('Error deleting task:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
