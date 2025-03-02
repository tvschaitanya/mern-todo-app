import { createError } from "../utils/error.js";
import { connectToDatabase } from '../utils/connect.utils.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
export async function register(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createError(400, 'Email and Password are required'));
    }

    try {
        // Connect to the database
        await connectToDatabase();

        // Check if user already exists
        const alreadyRegistered = await User.exists({ email });
        if (alreadyRegistered) {
            return next(createError(400, 'User already registered'));
        }

        // Hash the password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(createError(500, 'Internal Server Error'));
    }
}

// Login User
export async function login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createError(400, 'Email and Password are required'));
    }

    try {
        // Connect to the database
        await connectToDatabase();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(400, 'User not found'));
        }

        // Check if password matches
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, 'Invalid credentials'));
        }

        // Generate JWT
        const token = generateToken(user._id);

        // Log token to the terminal for debugging purposes
        console.log("Generated Token:", token);

        // Send token in the API response
        res.json({ message: "Login successful", token });

    } catch (error) {
        next(createError(500, 'Internal Server Error'));
    }
}

// Logout User (placeholder)
export async function logout(req, res) {
    res.json({ message: 'Logout successful' });
}