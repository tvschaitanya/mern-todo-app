# Todo App

A full-stack todo application with user authentication, built with React (frontend) and Node.js (backend).

## Screenshots

![Todo App Login Page](./Screenshot%20-%20Login%20Page.jpeg)
![Todo App Dashboard](./Screenshot%20-%20Dashboard.jpeg)

## Project Structure

The project is organized into two main parts:

- `frontend`: React application built with Vite
- `server`: Node.js backend API

## Features

- User authentication (register/login)
- Create, read, update, and delete todos
- Responsive design

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (optional, for containerized setup)

## Installation

### Option 1: Without Docker

1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies for both frontend and server:

```bash
# Install server dependencies
cd server
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Option 2: With Docker

1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Create a `.env` file in the project root with your environment variables.

3. Start the application using Docker Compose:

```bash
docker-compose up
```

## Running the Application

### Without Docker

1. Start the backend server:

```bash
cd server
npm start
```

2. In a new terminal, start the frontend:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### With Docker

After running `docker-compose up`, open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Todos

- `GET /api/todos` - Get all todos for the authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
