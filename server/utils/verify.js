// Desc: Middleware to verify user token
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { createError } from '../utils/error.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(createError(401, 'Access denied. No token provided.'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        console.log("[ERROR] Invalid token:", error);
        next(createError(400, 'Invalid token.'));
    }
};