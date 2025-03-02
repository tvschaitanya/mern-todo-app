import { connectToDatabase } from '../utils/connect.js';
import { createError } from '../utils/error.js';
import Todo from '../models/todoModel.js';
import mongoose from 'mongoose';

// Helper function to check if the todo ID is valid
async function isValidTodoId(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return createError(400, "Invalid Todo ID format");
    }

    const todo = await Todo.findById(id);
    if (!todo) {
        return createError(404, "Todo not found");
    }

    // Ensure the user making the request is the one who owns the todo
    if (todo.userID.toString() !== userId) {
        return createError(403, "Unauthorized User");
    }

    return null; // No error, ID is valid
}

// Function to get all todos
export async function getAllTodos(req, res, next) {
    try {
        await connectToDatabase();
        const todos = await Todo.find({ userID: req.user.id });
        res.status(200).send(todos);
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
}

export async function getTodo(req, res, next) {
    const validationError = await isValidTodoId(req.params.id, req.user.id);
    if (validationError) return next(validationError);

    try {
        await connectToDatabase();
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
}

export async function updateTodo(req, res, next) {
    const validationError = await isValidTodoId(req.params.id, req.user.id);
    if (validationError) return next(validationError);

    if (!req.body) return next(createError(400, "Request body is empty"));

    try {
        await connectToDatabase();
        const todo = await Todo.findById(req.params.id);
        todo.title = req.body.title || todo.title;
        if (req.body.isCompleted !== undefined) {
            todo.isCompleted = req.body.isCompleted; // Corrected typo
        }
        
        await todo.save();
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
}

export async function deleteTodo(req, res, next) {
    const validationError = await isValidTodoId(req.params.id, req.user.id);
    if (validationError) return next(validationError);

    try {
        await connectToDatabase();
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
}

export async function createTodo(req, res, next) {
    if (!req.body || !req.body.title) {
        return next(createError(400, "Title is required"));
    }

    try {
        await connectToDatabase();
        const newTodo = new Todo({
            title: req.body.title,
            userID: req.user.id
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        return next(createError(500, "Internal Server Error"));
    }
}