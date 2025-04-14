import { atom } from 'jotai';

// Store current product list atom
export const productsAtom = atom([]);

// Store current selected category atom
export const categoryAtom = atom('fruits');

// Cart atom
export const cartAtom = atom([]);

// Notification messages atom
export const notificationsAtom = atom([]);

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