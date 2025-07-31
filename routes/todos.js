const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error('❌ GET Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  console.log('📩 POST BODY:', req.body);  // Debug log
  const { task } = req.body;

  try {
    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.error('❌ POST Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    console.error('❌ DELETE Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
