import express from 'express';
import { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controllers.js';

const router = express.Router();

// Get all todos
router.get('/', getAllTodos);

// Get a single todo by id
router.get('/:id', getTodo);

// Create a new todo
router.post('/', createTodo);

// Update an existing todo by id
router.put('/:id', updateTodo);

// Delete a todo by id
router.delete('/:id', deleteTodo);

export default router;