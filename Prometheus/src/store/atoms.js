// atoms.js
import { atom } from 'jotai';

// 存储当前产品列表的atom
export const productsAtom = atom([]);

// 存储当前选中分类的atom
export const categoryAtom = atom('fruits');

// 如果需要，可以添加购物车atom
export const cartAtom = atom([]);