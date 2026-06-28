import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-list" id="task-list">
      {tasks.map((task, index) => (
        <div key={task._id} style={{ animationDelay: `${index * 0.05}s` }}>
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </div>
      ))}
    </div>
  );
}
