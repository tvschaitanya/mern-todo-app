import { createError } from "../utils/error.js";
import { connectToDatabase } from '../utils/connect.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper function to generate JWT
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("\n" + "=".repeat(50)); // Separator
    console.log("[JWT GENERATED] " + token); // Log the generated JWT
    console.log("=" .repeat(50) + "\n");
    return token;
};

// Register User
export async function register(req, res, next) {
    const { email, password } = req.body;

    console.log("\n" + "=".repeat(50));
    console.log("[REGISTER] Input - Email:", email, ", Password: *****"); // Hide the password for security

    if (!email || !password) {
        console.log("[ERROR] Email and Password are required.");
        return next(createError(400, 'Email and Password are required'));
    }

    try {
        await connectToDatabase();
        console.log("[DATABASE] Connected to the database successfully.");

        // Check if user already exists
        const userExists = await User.exists({ email });
        if (userExists) {
            console.log("[ERROR] User already registered.");
            return next(createError(400, 'User already registered'));
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        console.log("[SUCCESS] User registered successfully:", email);
        console.log("=" .repeat(50) + "\n");
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("[ERROR] Error during registration:", error);
        next(createError(500, 'Internal Server Error'));
    }
}

// Login User
export async function login(req, res, next) {
    const { email, password } = req.body;

    console.log("\n" + "=".repeat(50));
    console.log("[LOGIN] Input - Email:", email, ", Password: *****"); // Hide the password for security

    if (!email || !password) {
        console.log("[ERROR] Email and Password are required.");
        return next(createError(400, 'Email and Password are required'));
    }

    try {
        await connectToDatabase();
        console.log("[DATABASE] Connected to the database successfully.");

        const user = await User.findOne({ email });
        if (!user) {
            console.log("[ERROR] User not found.");
            return next(createError(400, 'User not found'));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("[ERROR] Invalid credentials.");
            return next(createError(400, 'Invalid credentials'));
        }

        const token = generateToken(user._id);

        console.log("[COOKIE] Setting cookie: access_token=" + token);
        console.log("[SUCCESS] Login successful for:", email);
        console.log("=" .repeat(50) + "\n");

        // Set token as HttpOnly cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }).status(200).json({ message: "Login successful" });

    } catch (error) {
        console.log("[ERROR] Error during login:", error);
        next(createError(500, 'Internal Server Error'));
    }
}

// Logout User (placeholder)
export async function logout(req, res) {
    console.log("\n" + "=".repeat(50));
    console.log("[LOGOUT] User logged out successfully.");
    res.clearCookie("access_token");
    res.json({ message: 'Logout successful' });
}
