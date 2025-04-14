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

// 下单并更新库存的API
export const placeOrder = async (cart) => {
    try {
        // 准备数据 - 只发送后端需要的字段
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
        
        // 处理后端返回的库存不足信息
        if (!data.success && data.insufficientStock) {
            // 转换为前端需要的格式
            const insufficientItems = data.insufficientStock.map(item => ({
                id: item.id,
                name: item.name,
                requestedQuantity: item.requested,
                availableQuantity: item.available
            }));
            
            return {
                success: false,
                message: data.message || '部分商品库存不足，无法完成订单',
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