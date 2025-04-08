// atoms.js
import { atom } from 'jotai';

// 存储当前产品列表的atom
export const productsAtom = atom([]);

// 存储当前选中分类的atom
export const categoryAtom = atom('fruits');

// 购物车atom
export const cartAtom = atom([]);

// 用户状态atom
export const userAtom = atom(null);

// 通知消息atom
export const notificationsAtom = atom([]);

// 订单历史atom
export const ordersAtom = atom([]);

// 搜索关键词atom
export const searchTermAtom = atom('');

// Store all products across all categories for global search
export const allProductsAtom = atom([]);

// 未读通知数量
export const unreadNotificationsCountAtom = atom(
  (get) => get(notificationsAtom).filter(notification => !notification.read).length
);

// 计算购物车中商品总数量
export const cartItemCountAtom = atom(
  (get) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
);

// 计算购物车总价
export const cartTotalAtom = atom(
  (get) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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