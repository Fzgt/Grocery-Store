import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { notificationsAtom } from '../../store/atoms';
import './Messages.css';

const Messages = () => {
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [expandedNotifications, setExpandedNotifications] = useState({});
  
  // 将所有通知标记为已读
  useEffect(() => {
    if (notifications.length > 0) {
      // 将所有未读通知标记为已读
      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        read: true
      }));
      setNotifications(updatedNotifications);
    }
  }, [notifications, setNotifications]);

  // 删除通知
  const removeNotification = (id, event) => {
    // 阻止事件冒泡，避免触发展开
    event.stopPropagation();
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // 清空所有通知
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // 切换通知展开/折叠状态
  const toggleExpand = (id) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 通知类型对应的样式
  const getNotificationTypeClass = (type) => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      case 'info':
      default:
        return 'notification-info';
    }
  };

  // 格式化时间
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 格式化价格
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="messages-container">
      <h1 className="messages-title">Notifications</h1>
      
      {notifications.length > 0 ? (
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
              <div 
                key={notification.id} 
                className={`notification-item ${getNotificationTypeClass(notification.type)} ${notification.orderDetails ? 'clickable' : ''}`}
                onClick={() => notification.orderDetails && toggleExpand(notification.id)}
              >
                <div className="notification-content">
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-time">{formatTime(notification.id)}</div>
                  
                  {/* 订单详情展开区域 */}
                  {notification.orderDetails && expandedNotifications[notification.id] && (
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
                  onClick={(e) => removeNotification(notification.id, e)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-notifications">
          <div className="empty-icon">📭</div>
          <p>You have no notifications</p>
        </div>
      )}
    </div>
  );
};

export default Messages; 