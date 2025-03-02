import express from 'express';
import { login, logout, register, getUserProfile } from '../controllers/auth.controllers.js';
import { verifyToken } from '../utils/verify.js';
const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

// User profile route
router.get('/profile', verifyToken, getUserProfile);

export default router;