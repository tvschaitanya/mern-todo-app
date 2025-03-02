import express from 'express';
import { login, logout, register } from '../controllers/auth.controllers.js';

const router = express.Router();

// Simple login route (you can expand it later)
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

export default router;