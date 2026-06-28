import React, { useState, useEffect } from 'react';

const INITIAL_STATE = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

export default function TaskForm({ onSubmit, onClose, editingTask }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'pending',
        priority: editingTask.priority || 'medium',
        dueDate: editingTask.dueDate
          ? new Date(editingTask.dueDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [editingTask]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || null,
    };

    onSubmit(taskData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="task-form-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <form className="task-form" id="task-form" onSubmit={handleSubmit}>
        <div className="task-form__header">
          <h2 className="task-form__title">
            {editingTask ? '✏️ Edit Task' : '✨ New Task'}
          </h2>
          <button
            type="button"
            className="task-form__close"
            id="form-close-btn"
            onClick={onClose}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="task-title">
            Title *
          </label>
          <input
            type="text"
            className={`form-group__input ${errors.title ? 'form-group__input--error' : ''}`}
            id="task-title"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            autoFocus
          />
          {errors.title && (
            <div className="form-group__error">⚠ {errors.title}</div>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="task-description">
            Description
          </label>
          <textarea
            className={`form-group__textarea ${errors.description ? 'form-group__textarea--error' : ''}`}
            id="task-description"
            placeholder="Add more details..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
          />
          {errors.description && (
            <div className="form-group__error">⚠ {errors.description}</div>
          )}
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>
            {formData.description.length}/500
          </div>
        </div>

        {/* Status & Priority */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-group__label" htmlFor="task-status">
              Status
            </label>
            <select
              className="form-group__select"
              id="task-status"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-group__label" htmlFor="task-priority">
              Priority
            </label>
            <select
              className="form-group__select"
              id="task-priority"
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="task-due-date">
            Due Date
          </label>
          <input
            type="date"
            className="form-group__input"
            id="task-due-date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" id="submit-task-btn">
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
