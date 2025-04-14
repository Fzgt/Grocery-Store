import { useEffect, useState, useCallback, memo } from 'react';
import { useAtom } from 'jotai';
import { notificationsAtom } from '../../store/atoms';
import './Messages.css';

const NotificationItem = memo(({ notification, expanded, onToggle, onRemove, formatTime, formatPrice }) => {
  const getNotificationTypeClass = (type) => {
    switch (type) {
      case 'success': return 'notification-success';
      case 'error': return 'notification-error';
      case 'warning': return 'notification-warning';
      case 'info':
      default: return 'notification-info';
    }
  };

  return (
    <div
      className={`notification-item ${getNotificationTypeClass(notification.type)} ${notification.orderDetails ? 'clickable' : ''}`}
      onClick={() => notification.orderDetails && onToggle(notification.id)}
    >
      <div className="notification-content">
        <div className="notification-message">{notification.message}</div>
        <div className="notification-time">{formatTime(notification.id)}</div>

        {notification.orderDetails && expanded && (
          <div className="order-details">
            <div className="order-info">
              <div className="order-recipient">
                <span className="detail-label">Recipient:</span>
                <span>{notification.orderDetails.recipient}</span>
              </div>
              <div className="order-address">
                <span className="detail-label">Shipping Address:</span>
                <span>{notification.orderDetails.shippingAddress}</span>
              </div>
              <div className="order-date">
                <span className="detail-label">Order Date:</span>
                <span>{formatTime(new Date(notification.orderDetails.orderDate).getTime())}</span>
              </div>
            </div>

            <div className="order-items-header">
              <span className="item-name">Item</span>
              <span className="item-quantity">Qty</span>
              <span className="item-price">Price</span>
              <span className="item-total">Total</span>
            </div>

            {notification.orderDetails.items.map(item => (
              <div key={item.id} className="order-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">{formatPrice(item.price)}</span>
                <span className="item-total">{formatPrice(item.total)}</span>
              </div>
            ))}

            <div className="order-total">
              <span>Total:</span>
              <span>{formatPrice(notification.orderDetails.totalAmount)}</span>
            </div>
          </div>
        )}
      </div>
      <button
        className="notification-delete"
        onClick={(e) => onRemove(notification.id, e)}
      >
        &times;
      </button>
    </div>
  );
});

const Messages = () => {
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [expandedNotifications, setExpandedNotifications] = useState({});

  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const formatPrice = useCallback((price) => {
    return `$${price.toFixed(2)}`;
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      const updatedNotifications = notifications.map(notification =>
        notification.read ? notification : { ...notification, read: true }
      );

      const hasUnread = updatedNotifications.some((notification, index) =>
        notification.read !== notifications[index].read
      );

      if (hasUnread) {
        setNotifications(updatedNotifications);
      }
    }
  }, [notifications, setNotifications]);

  const removeNotification = useCallback((id, event) => {
    if (event) {
      event.stopPropagation();
    }
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, [setNotifications]);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  const toggleExpand = useCallback((id) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const renderContent = () => {
    if (notifications.length === 0) {
      return (
        <div className="no-notifications">
          <div className="empty-icon">📭</div>
          <p>You have no notifications</p>
        </div>
      );
    }

    return (
      <>
        <div className="messages-controls">
          <button
            className="clear-all-button"
            onClick={clearAllNotifications}
          >
            Clear All
          </button>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              expanded={!!expandedNotifications[notification.id]}
              onToggle={toggleExpand}
              onRemove={removeNotification}
              formatTime={formatTime}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="messages-container">
      <h1 className="messages-title">Notifications</h1>
      {renderContent()}
    </div>
  );
};

export default Messages; 