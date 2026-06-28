import React from 'react';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  };

  const getNextStatus = () => {
    const cycle = {
      pending: 'in-progress',
      'in-progress': 'completed',
      completed: 'pending',
    };
    return cycle[task.status];
  };

  const statusLabels = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  return (
    <div
      className={`task-card task-card--${task.priority} ${task.status === 'completed' ? 'task-card--completed' : ''}`}
      id={`task-${task._id}`}
    >
      <div className="task-card__top">
        <h3 className="task-card__title">{task.title}</h3>
        <div className="task-card__badges">
          <span className={`badge badge--priority-${task.priority}`}>
            {task.priority}
          </span>
          <span className={`badge badge--status-${task.status}`}>
            {statusLabels[task.status]}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}

      <div className="task-card__footer">
        <div className="task-card__meta">
          <span className="task-card__date">
            📅 Created {formatDate(task.createdAt)}
          </span>
          {task.dueDate && (
            <span className={`task-card__date ${isOverdue() ? 'task-card__date--overdue' : ''}`}>
              {isOverdue() ? '⚠️ Overdue:' : '🎯 Due:'} {formatDate(task.dueDate)}
            </span>
          )}
        </div>

        <div className="task-card__actions">
          <button
            className="action-btn action-btn--status"
            onClick={() => onStatusChange(task._id, getNextStatus())}
            title={`Mark as ${statusLabels[getNextStatus()]}`}
            aria-label={`Change status to ${getNextStatus()}`}
          >
            {task.status === 'completed' ? '↩' : task.status === 'in-progress' ? '✓' : '▶'}
          </button>
          <button
            className="action-btn action-btn--edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            ✎
          </button>
          <button
            className="action-btn action-btn--delete"
            onClick={() => onDelete(task)}
            title="Delete task"
            aria-label="Delete task"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}
