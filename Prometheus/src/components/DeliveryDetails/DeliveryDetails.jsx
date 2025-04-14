import { useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom, notificationsAtom } from '../../store/atoms';
import { useNavigate } from 'react-router-dom';
import { clearCartFromStorage } from '../../utils/cartUtils';
import { placeOrder } from '../../utils/utils';
import './DeliveryDetails.css';


const DeliveryDetails = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [, setNotifications] = useAtom(notificationsAtom);
    const navigate = useNavigate();

    // Form metadata
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        street: '',
        city: '',
        state: 'NSW',
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [stockIssues, setStockIssues] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when field is changed
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Mobile validation
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
            newErrors.mobile = 'Mobile number must be 10 digits';
        }

        // Street validation
        if (!formData.street.trim()) {
            newErrors.street = 'Street address is required';
        }

        // City validation
        if (!formData.city.trim()) {
            newErrors.city = 'City/Suburb is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkInventory = async () => {
        try {
            setLoading(true);

            const response = await placeOrder(cart);

            if (!response.success) {
                if (response.insufficientItems && response.insufficientItems.length > 0) {
                    // transform the insufficient items into a more user-friendly format
                    return response.insufficientItems.map(item => ({
                        productId: item.id,
                        name: item.name,
                        reason: `Requested: ${item.requestedQuantity}, Available: ${item.availableQuantity}`
                    }));
                } else {
                    // API error or other issues
                    return [{
                        productId: 'error',
                        name: 'Order Error',
                        reason: response.message || 'An error occurred while processing your order'
                    }];
                }
            }

            return []; // errorIssues is empty
        } catch (error) {
            console.error('Error checking inventory:', error);
            return [{
                productId: 'network-error',
                name: 'Connection Error',
                reason: 'Unable to connect to the server. Please try again later.'
            }];
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const inventoryIssues = await checkInventory();

        if (inventoryIssues.length > 0) {
            setStockIssues(inventoryIssues);
            return;
        }

        const orderId = new Date().getTime().toString().slice(-8);

        const orderData = {
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: Number(item.price),
                total: Number(item.price) * item.quantity
            })),
            totalAmount: cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0),
            orderDate: new Date().toISOString(),
            shippingAddress: `${formData.street}, ${formData.city}, ${formData.state}`,
            recipient: formData.name,
            orderId: orderId
        };

        setNotifications(prev => [
            {
                id: Date.now(),
                message: 'Order placed successfully!',
                type: 'success',
                read: false,
                orderDetails: orderData
            },
            ...prev
        ]);

        setCart([]);
        clearCartFromStorage();

        navigate('/order-success', {
            state: { orderId }
        });
    };

    return (
        <div className="delivery-details-container">
            <h1>Delivery Details</h1>

            {stockIssues.length > 0 ? (
                <div className="stock-issues">
                    <h2>Order Cannot Be Placed</h2>
                    <p>The following issues were found:</p>
                    <ul>
                        {stockIssues.map(issue => (
                            <li key={issue.productId}>
                                <strong>{issue.name}</strong>: {issue.reason}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="return-to-cart-button"
                        onClick={() => navigate('/cart')}
                    >
                        Return to Cart
                    </button>
                </div>
            ) : (
                <form className="delivery-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Recipient's Name <span className="required">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email Address <span className="required">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="mobile">Mobile Number <span className="required">*</span></label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className={errors.mobile ? 'error' : ''}
                            placeholder="e.g. 0412345678"
                        />
                        {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="street">Street Address <span className="required">*</span></label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className={errors.street ? 'error' : ''}
                        />
                        {errors.street && <span className="error-message">{errors.street}</span>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="city">City/Suburb <span className="required">*</span></label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={errors.city ? 'error' : ''}
                        />
                        {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>

                    <div className="form-field">
                        <label htmlFor="state">State <span className="required">*</span></label>
                        <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        >
                            <option value="NSW">New South Wales (NSW)</option>
                            <option value="VIC">Victoria (VIC)</option>
                            <option value="QLD">Queensland (QLD)</option>
                            <option value="WA">Western Australia (WA)</option>
                            <option value="SA">South Australia (SA)</option>
                            <option value="TAS">Tasmania (TAS)</option>
                            <option value="ACT">Australian Capital Territory (ACT)</option>
                            <option value="NT">Northern Territory (NT)</option>
                            <option value="OTHER">Others</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate('/cart')}
                            disabled={loading}
                        >
                            Back to Cart
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={(Object.keys(errors).length > 0 && Object.values(errors).some(error => error)) || loading}
                        >
                            {loading ? 'Processing...' : 'Submit Order'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default DeliveryDetails; 