import React, { useState, useEffect } from 'react';
import { useTodo } from '../../context/todo/TodoContext';

const TodoEditModal = () => {
  const { currentTodo, updateTodo, clearCurrent, loading } = useTodo();
  
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  });

  // Set todo when currentTodo changes
  useEffect(() => {
    if (currentTodo) {
      setTodo({
        ...currentTodo
      });
    }
  }, [currentTodo]);

  const { title, description } = todo;

  const onChange = e => setTodo({ ...todo, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    
    if (title.trim() === '') {
      return;
    }
    
    updateTodo(todo);
  };

  // Handle modal close
  const onClose = () => {
    clearCurrent();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Task</h3>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Task title..."
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="edit-description">Description (optional)</label>
            <textarea
              id="edit-description"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Task description..."
            />
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-light"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoEditModal;