// src/context/todo/TodoContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isAuthenticated, user } = useAuth();

  // Set up axios with credentials
  axios.defaults.withCredentials = true;

  // Get all todos with optional filtering and sorting
  const getTodos = async (queryParams = {}) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      
      // Construct query string
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(queryParams).filter(([_, v]) => v != null)
        )
      ).toString();
      
      const res = await axios.get(`/api/todos${queryString ? `?${queryString}` : ''}`);
      
      console.log('Todos fetched:', res.data);
      
      setTodos(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error fetching todos');
      toast.error(err.response?.data?.error || 'Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (todoData) => {
    try {
      setLoading(true);
      
      // The todo object to be sent to the server
      const todoToAdd = {
        ...todoData
        // Backend will extract userID from JWT token
      };
      
      console.log('Adding todo:', todoToAdd);
      const res = await axios.post('/api/todos', todoToAdd);
      console.log('Todo added response:', res.data);
      
      // Update the todos state with the new todo
      setTodos(prevTodos => [res.data, ...prevTodos]);
      toast.success('Todo added successfully');
      return true;
    } catch (err) {
      console.error('Error adding todo:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error adding todo');
      toast.error(err.response?.data?.error || 'Error adding todo');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      
      console.log('Deleting todo:', id);
      await axios.delete(`/api/todos/${id}`);
      
      // Update todos state by filtering out the deleted todo
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      toast.success('Todo deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting todo:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error deleting todo');
      toast.error(err.response?.data?.error || 'Error deleting todo');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update todo
  const updateTodo = async (todo) => {
    try {
      setLoading(true);
      
      console.log('Updating todo:', todo);
      const res = await axios.put(`/api/todos/${todo._id}`, todo);
      console.log('Todo updated response:', res.data);
      
      // Update todos state by mapping and replacing the updated todo
      setTodos(prevTodos => prevTodos.map(t => t._id === todo._id ? res.data : t));
      setCurrentTodo(null);
      toast.success('Todo updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating todo:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error updating todo');
      toast.error(err.response?.data?.error || 'Error updating todo');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Set current todo for editing
  const setCurrent = (todo) => {
    setCurrentTodo(todo);
  };

  // Clear current todo
  const clearCurrent = () => {
    setCurrentTodo(null);
  };

  // Clear todos (e.g., on logout)
  const clearTodos = () => {
    setTodos([]);
    setCurrentTodo(null);
  };

  // Load todos when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getTodos();
    } else {
      clearTodos();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        currentTodo,
        loading,
        error,
        getTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        setCurrent,
        clearCurrent,
        clearTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export default TodoContext;