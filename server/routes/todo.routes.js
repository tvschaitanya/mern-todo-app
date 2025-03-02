import express from 'express';
import { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controllers.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// Get all todos
router.get('/', verifyToken, getAllTodos);

// Get a single todo by id
router.get('/:id', verifyToken, getTodo);

// Create a new todo
router.post('/', verifyToken, createTodo);

// Update an existing todo by id
router.put('/:id', verifyToken, updateTodo);

// Delete a todo by id
router.delete('/:id', verifyToken, deleteTodo);

export default router;