import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = location.state || { orderId: new Date().getTime().toString().slice(-8) };
    
    const handleContinueShopping = () => {
        navigate('/');
    };
    
    const handleViewOrderDetails = () => {
        navigate('/messages');
    };
    
    return (
        <div className="order-success-container">
            <div className="order-success-card">
                <div className="success-icon">✓</div>
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for your order. We have sent a confirmation email with your order details.</p>
                <p className="order-number">Order #: {orderId}</p>
                
                <div className="delivery-info">
                    <p>Your items will be delivered within <strong>2-3 business days</strong>.</p>
                    <p>You can track your order status in the notifications section.</p>
                </div>
                
                <div className="success-actions">
                    <button 
                        className="continue-shopping-btn"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                    <button 
                        className="view-details-btn"
                        onClick={handleViewOrderDetails}
                    >
                        View Order Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess; 