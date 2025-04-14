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