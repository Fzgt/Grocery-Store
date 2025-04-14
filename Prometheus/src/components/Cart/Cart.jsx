import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../../store/atoms';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { saveCartToStorage, clearCartFromStorage } from '../../utils/cartUtils';
import { placeOrder } from '../../utils/utils';
import './Cart.css';


const Cart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [loading, setLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const navigate = useNavigate();


    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const increaseQuantity = (itemId) => {
        const newCart = cart.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(newCart);
        saveCartToStorage(newCart);
    };

    const decreaseQuantity = (itemId) => {
        const newCart = cart.map(item =>
            item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(newCart);
        saveCartToStorage(newCart);
    };

    const removeItem = (itemId) => {
        const newCart = cart.filter(item => item.id !== itemId);
        setCart(newCart);
        if (newCart.length > 0) {
            saveCartToStorage(newCart);
        } else {
            clearCartFromStorage();
        }
    };

    const clearCart = () => {
        setCart([]);
        clearCartFromStorage();
    };

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;

        setLoading(true);
        setOrderError(null);

        try {
            const response = await placeOrder(cart);

            if (response.success) {
                navigate('/delivery');
            } else {
                setOrderError({
                    message: response.message || 'Order processing failed',
                    insufficientItems: response.insufficientItems || []
                });
            }
        } catch (error) {
            console.error('Place order error:', error);
            setOrderError({
                message: 'Network error occurred while processing the order',
                insufficientItems: []
            });
        } finally {
            setLoading(false);
        }
    };

    const dismissError = () => {
        setOrderError(null);
    };

    useEffect(() => {
        if (cart.length > 0) {
            saveCartToStorage(cart);
        }
    }, [cart]);


    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart</h1>

            {orderError && (
                <div className="order-error-container">
                    <div className="order-error">
                        <h3>Order processing failed</h3>
                        <p>{orderError.message}</p>
                        {orderError.insufficientItems && orderError.insufficientItems.length > 0 && (
                            <div>
                                <p>Out of Stock Items:</p>
                                <ul>
                                    {orderError.insufficientItems.map(item => (
                                        <li key={item.id}>
                                            {item.name} - Need: {item.requestedQuantity}, Available: {item.availableQuantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button onClick={dismissError}>Close</button>
                    </div>
                </div>
            )}

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <ShoppingCartIcon style={{ fontSize: 60, opacity: 0.7 }} />
                    <h2>Your cart is empty</h2>
                    <p>Items added to your cart will appear here</p>
                    <Link to="/" className="continue-shopping-link">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        <div className="cart-header">
                            <span className="cart-header-product">Product</span>
                            <span className="cart-header-price">Price</span>
                            <span className="cart-header-quantity">Quantity</span>
                            <span className="cart-header-total">Total</span>
                            <span className="cart-header-actions"></span>
                        </div>

                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-product">
                                    <div className="cart-item-image">{item.image}</div>
                                    <span className="cart-item-name">{item.name}</span>
                                </div>

                                <div className="cart-item-price">${item.price.toFixed(2)}</div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="quantity-button"
                                        onClick={() => decreaseQuantity(item.id)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button
                                        className="quantity-button"
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        <AddIcon fontSize="small" />
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                <div className="cart-item-actions">
                                    <button
                                        className="remove-button"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2 className="summary-title">Order Summary</h2>
                        <div className="cart-summary-row">
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="cart-summary-row total">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="cart-actions">
                            <button
                                className="clear-cart-button"
                                onClick={clearCart}
                                disabled={loading}
                            >
                                Clear Cart
                            </button>
                            <button
                                className={`checkout-button ${cart.length === 0 ? 'disabled' : ''}`}
                                onClick={handlePlaceOrder}
                                disabled={cart.length === 0 || loading}
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Cart; 