import React, { useState } from 'react';
import { useTodo } from '../../context/todo/TodoContext';

const TodoForm = () => {
  const { addTodo, loading } = useTodo();
  
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const { title, description, dueDate, priority } = todo;

  const onChange = e => setTodo({ 
    ...todo, 
    [e.target.name]: e.target.value 
  });

  const onSubmit = e => {
    e.preventDefault();
    
    if (title.trim() === '') {
      return;
    }
    
    addTodo({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority
    });
    
    // Clear form
    setTodo({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });
  };

  return (
    <div>
      <h3 className="form-title">Add New Task</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Task title..."
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Task description..."
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="dueDate">Due Date (optional)</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={onChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="btn-flex"
          disabled={loading}
        >
          <span>{loading ? 'Adding...' : 'Add Task'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TodoForm;