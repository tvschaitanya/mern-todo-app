// Initialize express router
import express from 'express';
import { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controllers.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// Route for getting all todos
router.get('/', verifyToken, getAllTodos);

// Route for getting a single todo by ID
router.get('/:id', verifyToken, getTodo);

// Route for creating a new todo
router.post('/', verifyToken, createTodo);

// Route for updating a todo by ID
router.put('/:id', verifyToken, updateTodo);

// Route for deleting a todo by ID
router.delete('/:id', verifyToken, deleteTodo);

export default router;