import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoEditModal from './TodoEditModal';
import { useTodo } from '../../context/todo/TodoContext';
import { useAuth } from '../../context/auth/AuthContext';

const Dashboard = () => {
  const { getTodos, loading, currentTodo, todos } = useTodo();
  const { user } = useAuth();

  // Filtering and Sorting States
  const [filters, setFilters] = useState({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    isCompleted: null,
    priority: ''
  });

  // Fetch todos with current filters
  useEffect(() => {
    // Convert filter values to query parameters
    const queryParams = {
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder
    };

    // Add optional filters
    if (filters.isCompleted !== null) {
      queryParams.isCompleted = filters.isCompleted;
    }
    if (filters.priority) {
      queryParams.priority = filters.priority;
    }

    getTodos(queryParams);
  }, [filters]);

  // Handler to update filters
  const updateFilters = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      sortBy: 'createdAt',
      sortOrder: 'desc',
      isCompleted: null,
      priority: ''
    });
  };

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
      
      {/* Filters Section */}
      <div className="todo-filters">
        <div className="filter-group">
          <label>Sort By:</label>
          <select 
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
          >
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort Order:</label>
          <select 
            value={filters.sortOrder}
            onChange={(e) => updateFilters({ sortOrder: e.target.value })}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filters.isCompleted === null ? '' : filters.isCompleted}
            onChange={(e) => {
              const value = e.target.value;
              updateFilters({ 
                isCompleted: value === '' ? null : (value === 'true')
              });
            }}
          >
            <option value="">All</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select 
            value={filters.priority}
            onChange={(e) => updateFilters({ priority: e.target.value })}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button 
          onClick={resetFilters}
          className="reset-filters-btn"
        >
          Reset Filters
        </button>
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