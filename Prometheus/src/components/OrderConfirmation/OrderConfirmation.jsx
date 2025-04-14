import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../store/atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { clearCartFromStorage } from '../../utils/cartUtils';
import './OrderConfirmation.css';


const OrderConfirmation = () => {
    const [, setCart] = useAtom(cartAtom);
    const location = useLocation();
    const navigate = useNavigate();
    const { formData } = location.state || {};

    const orderId = `ORD-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`;

    useEffect(() => {
        // Clear the cart when this component mounts
        setCart([]);

        // Ensure localStorage cart is cleared
        clearCartFromStorage();

        // Redirect to home if no form data 
        // (protects against direct navigation to this page)
        if (!formData) {
            navigate('/');
        }
    }, [formData, navigate, setCart]);

    if (!formData) {
        return null; // Will redirect in the useEffect
    }

    return (
        <div className="order-confirmation-container">
            <div className="confirmation-card">
                <div className="confirmation-header">
                    <CheckCircleIcon className="confirmation-icon" />
                    <h1>Order Confirmed!</h1>
                </div>

                <div className="confirmation-details">
                    <p className="confirmation-message">
                        Thank you for your order. We have sent a confirmation email to <strong>{formData.email}</strong>.
                    </p>

                    <div className="order-info">
                        <div className="order-info-row">
                            <span>Order ID:</span>
                            <span>{orderId}</span>
                        </div>

                        <div className="order-info-row">
                            <span>Recipient:</span>
                            <span>{formData.name}</span>
                        </div>

                        <div className="order-info-row">
                            <span>Delivery Address:</span>
                            <span>{formData.street}, {formData.city}, {formData.state}</span>
                        </div>

                        <div className="order-info-row">
                            <span>Contact:</span>
                            <span>{formData.mobile}</span>
                        </div>
                    </div>

                    <p className="estimated-delivery">
                        Estimated delivery: <strong>2-3 business days</strong>
                    </p>
                </div>

                <div className="confirmation-actions">
                    <button
                        className="continue-shopping-button"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation; 