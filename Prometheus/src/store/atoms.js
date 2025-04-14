// atoms.js
import { atom } from 'jotai';

// Store current product list atom
export const productsAtom = atom([]);

// Store current selected category atom
export const categoryAtom = atom('fruits');

// Cart atom
export const cartAtom = atom([]);

// User state atom
export const userAtom = atom(null);

// Notification messages atom
export const notificationsAtom = atom([]);

// Order history atom
export const orderHistoryAtom = atom([]);

// Search term atom
export const searchTermAtom = atom('');

// Store all products across all categories for global search
export const allProductsAtom = atom([]);

// Unread notifications count
export const unreadNotificationsCountAtom = atom(
  (get) => get(notificationsAtom).filter(notification => !notification.read).length
);

// Calculate total quantity of items in cart
export const cartItemCountAtom = atom(
  (get) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
);

// Calculate cart total price
export const cartTotalAtom = atom(
  (get) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  }
);

// Search results atom derived from search term and all products
export const searchResultsAtom = atom(
  (get) => {
    const searchTerm = get(searchTermAtom);
    const allProducts = get(allProductsAtom);
    
    if (!searchTerm.trim()) {
      return [];
    }
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);