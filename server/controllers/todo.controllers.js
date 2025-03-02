import {connectToDatabase} from '../utils/connect.js';
import Todo from '../models/todoModel.js';
import {createError} from '../utils/error.js';

export async function getAllTodos(req, res, next){
    await connectToDatabase();
    const todos = await Todo.find({ userID: req.user.id });
    res.status(200).send(todos);
}

export async function getTodo(req, res, next){
    res.send('Get Single Todo');
}

export async function createTodo(req, res, next) {
    console.log(req.body);
    if (!req.body || !req.body.title) {
        return next(createError(400, 'Title is required'));
    }

    await connectToDatabase();

    try {
        const newTodo = new Todo({
            title: req.body.title,
            userID: req.user.id // Ensure userID is set correctly
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log("[ERROR] Error creating todo:", error);
        next(createError(500, 'Internal Server Error'));
    }
}

export async function updateTodo(req, res, next){
    res.send('Update Todo');
}

export async function deleteTodo(req, res, next){
    res.send('Delete Todo');
}