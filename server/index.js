import express from 'express';
import AuthRoute from './routes/auth.routes.js';
import TodoRoute from './routes/todo.routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Add these debug middleware to see all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Test endpoint to verify API connectivity
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Map your routes
app.use("/api/user", AuthRoute);
app.use("/api/todos", TodoRoute);

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');  // Ensure HTML response
  res.send('Welcome to TODO API,<br>Please test using Postman...');
});


//Global Error Handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Available routes:");
    console.log("- /api/user/* (Auth routes)");
    console.log("- /api/todos/* (Todo routes)");
    console.log("- /api/test (Test endpoint)");
});