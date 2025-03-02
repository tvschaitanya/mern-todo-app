import express from 'express';
import AuthRoute from './routes/auth.routes.js';
import TodoRoute from './routes/todo.routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();
const PORT = 3000;

dotenv.config();
app.use(bodyParser.json());
app.use("/api/user", AuthRoute);
app.use("/api/todos", TodoRoute);

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

//Global Error Handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});