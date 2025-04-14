// import { useState, useEffect } from 'react';

export const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/products');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('get products data failed', error);
        return null;
    }
};

// API for placing orders and updating inventory
export const placeOrder = async (cart) => {
    try {
        // Prepare data - only send fields needed by backend
        const cartData = cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));

        const response = await fetch('http://localhost:3000/api/order/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: cartData }),
        });

        const data = await response.json();
        
        // Handle insufficient stock information returned from backend
        if (!data.success && data.insufficientStock) {
            // Convert to format needed by frontend
            const insufficientItems = data.insufficientStock.map(item => ({
                id: item.id,
                name: item.name,
                requestedQuantity: item.requested,
                availableQuantity: item.available
            }));
            
            return {
                success: false,
                message: data.message || 'Some items are out of stock, cannot complete order',
                insufficientItems
            };
        }

        return data;
    } catch (error) {
        console.error('Place order failed:', error);
        throw error;
    }
};

// export const useDebounce = (value, delay) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(timer);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// };