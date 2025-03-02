import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token; // Get token from cookies
    if (!token) {
        return next(createError(401, "Not authorized")); // No token, return error
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, "Invalid token")); // Invalid token, return error
        }
        req.user = user; // Add user info to request
        next(); // Proceed to next middleware
    });
};
