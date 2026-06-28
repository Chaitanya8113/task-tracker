import React from 'react';

export default function Header({ tasks }) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;

  return (
    <header className="header">
      <h1 className="header__title">Task Tracker</h1>
      <p className="header__subtitle">Organize, prioritize, and conquer your tasks</p>
      <div className="header__stats">
        <div className="stat-badge stat-badge--total">
          <span className="stat-badge__count">{total}</span> Total
        </div>
        <div className="stat-badge stat-badge--pending">
          <span className="stat-badge__count">{pending}</span> Pending
        </div>
        <div className="stat-badge stat-badge--progress">
          <span className="stat-badge__count">{inProgress}</span> In Progress
        </div>
        <div className="stat-badge stat-badge--completed">
          <span className="stat-badge__count">{completed}</span> Completed
        </div>
      </div>
    </header>
  );
}
