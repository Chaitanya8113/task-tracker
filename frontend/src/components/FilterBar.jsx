import React from 'react';

export default function FilterBar({ filters, onFilterChange }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-bar" id="filter-bar">
      <input
        type="text"
        className="filter-bar__search"
        id="search-input"
        placeholder="Search tasks..."
        value={filters.search || ''}
        onChange={(e) => handleChange('search', e.target.value)}
      />
      <select
        className="filter-bar__select"
        id="filter-status"
        value={filters.status || 'all'}
        onChange={(e) => handleChange('status', e.target.value)}
      >
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        className="filter-bar__select"
        id="filter-priority"
        value={filters.priority || 'all'}
        onChange={(e) => handleChange('priority', e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select
        className="filter-bar__select"
        id="sort-select"
        value={filters.sort || 'newest'}
        onChange={(e) => handleChange('sort', e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title A–Z</option>
      </select>
    </div>
  );
}
