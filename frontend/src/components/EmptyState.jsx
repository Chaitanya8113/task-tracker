import React from 'react';

export default function EmptyState({ hasFilters }) {
  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-state__icon">
        {hasFilters ? '🔍' : '📋'}
      </div>
      <h3 className="empty-state__title">
        {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
      </h3>
      <p className="empty-state__text">
        {hasFilters
          ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
          : 'Click the button above to create your first task and start getting organized!'}
      </p>
    </div>
  );
}
