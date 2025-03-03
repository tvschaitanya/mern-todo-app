import React from 'react';
import { useTodo } from '../../context/todo/TodoContext';

const TodoItem = ({ todo }) => {
  const { deleteTodo, setCurrent, updateTodo } = useTodo();
  
  const { 
    _id, 
    title, 
    description, 
    isCompleted, 
    createdAt, 
    updatedAt, 
    dueDate,
    priority 
  } = todo;

  const onDelete = () => {
    deleteTodo(_id);
  };

  const onEdit = () => {
    setCurrent(todo);
  };

  const toggleComplete = () => {
    updateTodo({
      ...todo,
      isCompleted: !isCompleted
    });
  };

  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get priority color
  const getPriorityColor = () => {
    switch(priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <div className="todo-item-header">
        <div className="todo-title-group">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={isCompleted}
            onChange={toggleComplete}
          />
          <h3 className={`todo-title ${isCompleted ? 'completed' : ''}`}>
            {title}
          </h3>
        </div>
        <div className="todo-actions">
          <button onClick={onEdit} className="edit-btn" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button onClick={onDelete} className="delete-btn" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {description && (
        <p className={`todo-description ${isCompleted ? 'completed' : ''}`}>
          {description}
        </p>
      )}
      
      <div className="todo-meta">
        <div className="todo-meta-dates">
          <span>Created: {formatDate(createdAt)}</span>
          <span>Updated: {formatDate(updatedAt)}</span>
        </div>
        <div className="todo-meta-details">
          {dueDate && (
            <span className="todo-due-date">
              Due: {formatDate(dueDate)}
            </span>
          )}
          <span className={`todo-priority ${getPriorityColor()}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;