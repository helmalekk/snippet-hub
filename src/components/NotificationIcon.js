import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

function NotificationIcon() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { notifications, unreadCount, markNotificationsRead } = useAuth();

  const handleClick = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown && unreadCount > 0) {
      markNotificationsRead();
    }
  };

  return (
    <div className="notification-container">
      <button 
        className="notification-icon" 
        onClick={handleClick}
        aria-label="Notifications"
      >
        <span className="icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <div className="notification-empty">
              No notifications yet
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <p className="notification-text">{notification.message}</p>
                <span className="notification-time">
                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationIcon; 