import { connectToDatabase } from '../utils/connect.js';
import { createError } from '../utils/error.js';
import Todo from '../models/todoModel.js';
import mongoose from 'mongoose';

// Helper function to check if the todo ID is valid
async function isValidTodoId(id, userId) {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return createError(400, "Invalid Todo ID format");
    }

    // Check if todo exists and belongs to the user
    const todo = await Todo.findById(id);
    if (!todo) {
        return createError(404, "Todo not found");
    }

    // Ensure the user making the request is the one who owns the todo
    if (todo.userID.toString() !== userId) {
        return createError(403, "Unauthorized to access this todo");
    }

    return null; // No error, ID is valid
}

// Function to get all todos for a user
export async function getAllTodos(req, res, next) {
    try {
        await connectToDatabase();
        const todos = await Todo.find({ userID: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        next(createError(500, "Failed to retrieve todos"));
    }
}

// Get a specific todo by ID
export async function getTodo(req, res, next) {
    const validationError = await isValidTodoId(req.params.id, req.user.id);
    if (validationError) return next(validationError);

    try {
        await connectToDatabase();
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    } catch (error) {
        next(createError(500, "Failed to retrieve todo"));
    }
}

// Update a todo
export async function updateTodo(req, res, next) {
    const validationError = await isValidTodoId(req.params.id, req.user.id);
    if (validationError) return next(validationError);

    if (!req.body) return next(createError(400, "No update data provided"));

    try {
        await connectToDatabase();
        const todo = await Todo.findById(req.params.id);

        // Preserve existing data and update only provided fields
        todo.title = req.body.title || todo.title;
        todo.description = req.body.description || todo.description;
        
        // Explicitly handle isCompleted to ensure it's set correctly
        if (req.body.isCompleted !== undefined) {
            todo.isCompleted = req.body.isCompleted;
        }
        
        // Update the timestamp
        todo.updatedAt = Date.now();

        // Save the updated todo
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(createError(500, "Failed to update todo"));
    }
}

// Delete a todo
export async function deleteTodo(req, res, next) {
    const validationError = await isValidTodoId(req.params.id, req.user.id);
    if (validationError) return next(validationError);

    try {
        await connectToDatabase();
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        
        if (!deletedTodo) {
            return next(createError(404, "Todo not found"));
        }
        
        res.status(200).json({ 
            message: "Todo deleted successfully",
            deletedTodoId: req.params.id 
        });
    } catch (error) {
        next(createError(500, "Failed to delete todo"));
    }
}

// Create a new todo
export async function createTodo(req, res, next) {
    // Validate required fields
    if (!req.body || !req.body.title) {
        return next(createError(400, "Title is required"));
    }

    try {
        await connectToDatabase();
        
        // Create new todo with all potential fields
        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.description || '', // Optional description
            userID: req.user.id,
            isCompleted: false // Default to not completed
        });

        // Save and return the new todo
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        // More specific error handling
        if (error.name === 'ValidationError') {
            return next(createError(400, error.message));
        }
        next(createError(500, "Failed to create todo"));
    }
}