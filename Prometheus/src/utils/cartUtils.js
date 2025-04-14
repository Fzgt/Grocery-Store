// Cart storage and retrieval utilities
const STORAGE_KEY = 'beyz-cart';
const CART_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes in milliseconds

/**
 * Save cart to localStorage with current timestamp
 * @param {Array} cartItems - Array of cart items
 */
export const saveCartToStorage = (cartItems) => {
    const cartData = {
        items: cartItems,
        timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
};

/**
 * Load cart from localStorage
 * @returns {Array|null} Cart items if valid, null if expired or not found
 */
export const loadCartFromStorage = () => {
    try {
        const savedCartData = localStorage.getItem(STORAGE_KEY);
        
        if (!savedCartData) return null;
        
        const parsedCartData = JSON.parse(savedCartData);
        const { items, timestamp } = parsedCartData;
        
        // Check if cart has expired (older than 20 minutes)
        const currentTime = Date.now();
        const timeDifference = currentTime - timestamp;
        
        if (timeDifference > CART_TIMEOUT_MS) {
            // Cart has expired, remove it
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        
        // Cart is still valid, return it
        if (items && items.length > 0) {
            return items;
        }
        
        return null;
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};

/**
 * Clear cart from localStorage
 */
export const clearCartFromStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get total quantity of items in cart
 * @param {Array} cartItems - Array of cart items
 * @returns {Number} Total quantity
 */
export const getCartTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get total price of items in cart
 * @param {Array} cartItems - Array of cart items
 * @returns {Number} Total price
 */
export const getCartTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}; 