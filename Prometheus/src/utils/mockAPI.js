// Mock API utility functions

// Mock category data
const categories = [
    { id: 'fruits', name: 'Fresh Fruits', icon: '🍎', color: 'green' },
    { id: 'vegetables', name: 'Seasonal Vegetables', icon: '🥦', color: 'lime' },
    { id: 'dairy', name: 'Dairy Products', icon: '🧀', color: 'amber' },
    { id: 'bakery', name: 'Bakery Items', icon: '🍞', color: 'orange' },
    { id: 'meat', name: 'Meat', icon: '🥩', color: 'red' },
    { id: 'drinks', name: 'Beverages', icon: '🥤', color: 'blue' },
];

// Mock product data for all categories
const allProductsData = {
    fruits: [
        { id: 1, name: 'New Zealand Apple', price: 12.9, unit: '500g', image: '🍎', discount: '15% off', stock: 35, category: 'fruits' },
        { id: 2, name: 'Thai Banana', price: 6.5, unit: 'bunch', image: '🍌', hot: true, stock: 42, category: 'fruits' },
        { id: 3, name: 'Dragon Fruit', price: 15.8, unit: 'piece', image: '🐉', discount: 'Buy 2 save $5', stock: 18, category: 'fruits' },
        { id: 4, name: 'Blueberries', price: 28.9, unit: 'box', image: '🫐', organic: true, stock: 15, category: 'fruits' }
    ],
    vegetables: [
        { id: 5, name: 'Organic Broccoli', price: 8.8, unit: '250g', image: '🥦', organic: true, stock: 28, category: 'vegetables' },
        { id: 6, name: 'Carrots', price: 3.5, unit: '500g', image: '🥕', discount: '2nd at half price', stock: 56, category: 'vegetables' },
        { id: 7, name: 'Cherry Tomatoes', price: 9.9, unit: 'box', image: '🍅', hot: true, stock: 32, category: 'vegetables' },
        { id: 8, name: 'Cucumber', price: 4.8, unit: 'piece', image: '🥒', stock: 47, category: 'vegetables' }
    ],
    dairy: [
        { id: 9, name: 'Plain Yogurt', price: 13.8, unit: '500ml', image: '🥛', hot: true, stock: 22, category: 'dairy' },
        { id: 10, name: 'Cheddar Cheese', price: 25.9, unit: '200g', image: '🧀', imported: true, stock: 15, category: 'dairy' },
        { id: 11, name: 'Organic Milk', price: 19.8, unit: '1L', image: '🥛', organic: true, stock: 38, category: 'dairy' },
        { id: 12, name: 'Butter', price: 18.5, unit: '100g', image: '🧈', imported: true, stock: 12, category: 'dairy' }
    ],
    bakery: [
        { id: 13, name: 'Whole Wheat Bread', price: 12.8, unit: 'loaf', image: '🍞', fresh: true, stock: 18, category: 'bakery' },
        { id: 14, name: 'Croissant', price: 8.9, unit: 'piece', image: '🥐', fresh: true, stock: 25, category: 'bakery' },
        { id: 15, name: 'Chocolate Donut', price: 6.5, unit: 'piece', image: '🍩', discount: 'Buy 3 get 1 free', stock: 30, category: 'bakery' },
        { id: 16, name: 'Cheesecake', price: 32.8, unit: '6-inch', image: '🍰', hot: true, stock: 8, category: 'bakery' }
    ],
    meat: [
        { id: 17, name: 'Premium Beef Steak', price: 58.8, unit: '300g', image: '🥩', premium: true, stock: 10, category: 'meat' },
        { id: 18, name: 'Chicken Breast', price: 13.9, unit: '500g', image: '🍗', stock: 45, category: 'meat' },
        { id: 19, name: 'Organic Pork', price: 29.9, unit: '500g', image: '🐖', organic: true, stock: 16, category: 'meat' },
        { id: 20, name: 'Salmon Fillet', price: 48.8, unit: '300g', image: '🐟', imported: true, stock: 12, category: 'meat' }
    ],
    drinks: [
        { id: 21, name: 'Mineral Water', price: 2.5, unit: '550ml', image: '💧', stock: 120, category: 'drinks' },
        { id: 22, name: 'Orange Juice', price: 9.9, unit: '1L', image: '🍊', stock: 35, category: 'drinks' },
        { id: 23, name: 'Iced Coffee', price: 13.8, unit: '500ml', image: '☕', hot: true, stock: 28, category: 'drinks' },
        { id: 24, name: 'Sparkling Water', price: 6.5, unit: '330ml', image: '🫧', imported: true, stock: 42, category: 'drinks' }
    ],
    // Subcategories
    'fruits-local': [
        { id: 101, name: 'NSW Apple', price: 9.9, unit: '500g', image: '🍎', local: true, stock: 45, category: 'fruits-local' },
        { id: 102, name: 'QLD Banana', price: 5.5, unit: 'bunch', image: '🍌', local: true, stock: 38, category: 'fruits-local' }
    ],
    'fruits-imported': [
        { id: 103, name: 'New Zealand Kiwi', price: 12.8, unit: '4 pack', image: '🥝', imported: true, stock: 25, category: 'fruits-imported' },
        { id: 104, name: 'US Grapes', price: 18.5, unit: '500g', image: '🍇', imported: true, stock: 18, category: 'fruits-imported' }
    ],
    'vegetables-leafy': [
        { id: 105, name: 'Baby Spinach', price: 4.5, unit: 'bag', image: '🥬', fresh: true, stock: 30, category: 'vegetables-leafy' },
        { id: 106, name: 'Lettuce', price: 3.9, unit: 'head', image: '🥬', fresh: true, stock: 25, category: 'vegetables-leafy' }
    ],
};

// Function to get products for a specific category
export const getProductsByCategory = async (categoryId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return allProductsData[categoryId] || [];
};

// Function to get all products across all categories
export const getAllProducts = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Combine all products from all categories into a single array
    const allProducts = Object.values(allProductsData).flat();
    
    return allProducts;
};

// Function to get all categories
export const getAllCategories = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return categories;
};

// Function to search products by term
export const searchProducts = async (searchTerm) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!searchTerm.trim()) {
        return [];
    }
    
    const allProducts = Object.values(allProductsData).flat();
    
    return allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}; 