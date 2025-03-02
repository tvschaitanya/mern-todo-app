import React, { useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoEditModal from './TodoEditModal';
import { useTodo } from '../../context/todo/TodoContext';
import { useAuth } from '../../context/auth/AuthContext';

const Dashboard = () => {
  const { getTodos, loading, currentTodo } = useTodo();
  const { user } = useAuth();

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="todo-container">
      <div className="dashboard-header">
        <h2 className="dashboard-welcome">
          Welcome, <span>{user ? user.name : 'User'}</span>
        </h2>
        <p>Manage your tasks efficiently with our todo app</p>
      </div>
      
      <div className="todo-form-container">
        <TodoForm />
      </div>
      
      <div className="todo-list">
        <div className="todo-list-header">
          <h3>Your Tasks</h3>
        </div>
        {loading ? (
          <div className="empty-state">
            <div className="loader"></div>
          </div>
        ) : (
          <TodoList />
        )}
      </div>
      
      {currentTodo && <TodoEditModal />}
    </div>
  );
};

export default Dashboard;