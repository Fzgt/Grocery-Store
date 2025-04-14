import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { cartAtom, notificationsAtom } from '../store/atoms';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { saveCartToStorage, clearCartFromStorage } from '../utils/cartUtils';
import './Cart.css';

// 20 minutes in milliseconds
const CART_TIMEOUT_MS = 20 * 60 * 1000;
const STORAGE_KEY = 'beyz-cart';

const Cart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [notifications, setNotifications] = useAtom(notificationsAtom);
    const navigate = useNavigate();
    const location = useLocation();
    
    // State for minimized cart
    const [isMinimized, setIsMinimized] = useState(true);
    
    // If we're on the cart page, we don't need the mini cart
    const isCartPage = location.pathname === '/cart';
    
    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Handle item quantity increase
    const increaseQuantity = (itemId) => {
        const newCart = cart.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(newCart);
        // Update cart timestamp
        saveCartToStorage(newCart);
    };

    // Handle item quantity decrease
    const decreaseQuantity = (itemId) => {
        const newCart = cart.map(item =>
            item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(newCart);
        // Update cart timestamp
        saveCartToStorage(newCart);
    };

    // Handle item removal
    const removeItem = (itemId) => {
        const newCart = cart.filter(item => item.id !== itemId);
        setCart(newCart);
        // Update cart timestamp or clear if empty
        if (newCart.length > 0) {
            saveCartToStorage(newCart);
        } else {
            clearCartFromStorage();
        }
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
        // Clear cart from localStorage
        clearCartFromStorage();
    };

    // Handle proceed to checkout
    const handleProceedToCheckout = () => {
        if (cart.length === 0) return;
        navigate('/delivery');
    };
    
    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            saveCartToStorage(cart);
        }
    }, [cart]);

    // If we're viewing the full cart page
    if (isCartPage) {
        return (
            <div className="cart-page">
                <h1 className="cart-title">Shopping Cart</h1>

                {cart.length > 0 ? (
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
                                >
                                    Clear Cart
                                </button>
                                <button
                                    className={`checkout-button ${cart.length === 0 ? 'disabled' : ''}`}
                                    onClick={handleProceedToCheckout}
                                    disabled={cart.length === 0}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <ShoppingCartIcon style={{ fontSize: 60, opacity: 0.7 }} />
                        <h2>Your cart is empty</h2>
                        <p>Items added to your cart will appear here</p>
                        <Link to="/" className="continue-shopping-link">
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        );
    }
    
    // Mini floating cart for other pages
    return (
        <>
            {/* Floating cart toggle button */}
            <div className="cart-float-button" onClick={() => setIsMinimized(!isMinimized)}>
                <ShoppingCartIcon />
                {cart.length > 0 && <span className="cart-float-count">{cart.length}</span>}
            </div>
            
            {/* Floating cart panel */}
            <div className={`floating-cart ${isMinimized ? 'minimized' : ''}`}>
                <div className="floating-cart-header">
                    <h3>Your Cart ({cart.length})</h3>
                    <div className="floating-cart-controls">
                        <button 
                            className="minimize-button" 
                            onClick={() => setIsMinimized(true)}
                            aria-label="Minimize cart"
                        >
                            <ExpandMoreIcon />
                        </button>
                        <button 
                            className="close-button" 
                            onClick={() => setIsMinimized(true)}
                            aria-label="Close cart"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                
                <div className="floating-cart-items">
                    {cart.length > 0 ? (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="floating-cart-item">
                                    <div className="floating-cart-item-image">{item.image}</div>
                                    <div className="floating-cart-item-details">
                                        <div className="floating-cart-item-name">{item.name}</div>
                                        <div className="floating-cart-item-price">${item.price.toFixed(2)} x {item.quantity}</div>
                                    </div>
                                    <div className="floating-cart-item-controls">
                                        <button 
                                            className="quantity-adjust" 
                                            onClick={() => decreaseQuantity(item.id)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button 
                                            className="quantity-adjust" 
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            <AddIcon fontSize="small" />
                                        </button>
                                        <button 
                                            className="floating-cart-remove"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="floating-cart-total">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            
                            <div className="floating-cart-actions">
                                <button 
                                    className="clear-button"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>
                                <button 
                                    className="checkout-button"
                                    onClick={() => navigate('/cart')}
                                >
                                    View Cart
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="floating-cart-empty">
                            <ShoppingCartIcon style={{ fontSize: 40, opacity: 0.7 }} />
                            <p>Your cart is empty</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart; 