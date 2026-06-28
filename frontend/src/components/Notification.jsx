import React, { useEffect } from 'react';

export default function Notification({ notifications, onDismiss }) {
  return (
    <div className="notifications" id="notifications">
      {notifications.map((notif) => (
        <Toast key={notif.id} notification={notif} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ notification, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <div
      className={`toast toast--${notification.type}`}
      onClick={() => onDismiss(notification.id)}
      role="alert"
    >
      <span className="toast__icon">{icons[notification.type]}</span>
      <span className="toast__message">{notification.message}</span>
    </div>
  );
}
