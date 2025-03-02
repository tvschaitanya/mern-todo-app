// Desc: Middleware to verify user token
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { createError } from '../utils/error.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    // If no token, return an error
    if (!token) {
        return next(createError(401, 'Access denied. User not Logged-in.'));
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the decoded userId
        req.user = await User.findById(decoded.userId).select('-password');
        
        // If user not found, return an error
        if (!req.user) {
            return next(createError(401, 'User not found.'));
        }

        // Proceed if token is valid and user is found
        next();
    } catch (error) {
        console.log("[ERROR] Token verification failed:", error);
        // If token is invalid, return an error
        next(createError(401, 'User not logged in or token is not valid.'));
    }
};