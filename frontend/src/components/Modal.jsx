import React, { useEffect } from 'react';

export default function Modal({ title, message, icon, confirmLabel, confirmClass, onConfirm, onCancel }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal" id="confirm-modal">
        {icon && <div className="modal__icon">{icon}</div>}
        <h3 className="modal__title">{title}</h3>
        <p className="modal__text">{message}</p>
        <div className="modal__actions">
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`btn ${confirmClass || 'btn--danger'}`}
            id="confirm-delete-btn"
            onClick={onConfirm}
          >
            {confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
