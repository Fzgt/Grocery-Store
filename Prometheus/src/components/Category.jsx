// Category.jsx
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom } from '../store/atoms';
import { ChevronRightIcon } from '@radix-ui/react-icons';

// Mock category data
const categories = [
    { id: 'fruits', name: 'Fresh Fruits', icon: '🍎', color: 'green' },
    { id: 'vegetables', name: 'Seasonal Vegetables', icon: '🥦', color: 'lime' },
    { id: 'dairy', name: 'Dairy Products', icon: '🧀', color: 'amber' },
    { id: 'bakery', name: 'Bakery Items', icon: '🍞', color: 'orange' },
    { id: 'meat', name: 'Meat', icon: '🥩', color: 'red' },
    { id: 'drinks', name: 'Beverages', icon: '🥤', color: 'blue' },
];

// Color mapping
const colorMap = {
    'green': { bg: '#10b981', light: '#ecfdf5' },
    'lime': { bg: '#84cc16', light: '#f7fee7' },
    'amber': { bg: '#f59e0b', light: '#fffbeb' },
    'orange': { bg: '#f97316', light: '#fff7ed' },
    'red': { bg: '#ef4444', light: '#fef2f2' },
    'blue': { bg: '#3b82f6', light: '#eff6ff' }
};

// Mock API request function
const fetchProductsByCategory = async (categoryId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Return different products based on category
    const productsByCategory = {
        fruits: [
            { id: 1, name: 'New Zealand Apple', price: 12.9, unit: '500g', image: '🍎', discount: '15% off', stock: 35 },
            { id: 2, name: 'Thai Banana', price: 6.5, unit: 'bunch', image: '🍌', hot: true, stock: 42 },
            { id: 3, name: 'Dragon Fruit', price: 15.8, unit: 'piece', image: '🐉', discount: 'Buy 2 save $5', stock: 18 },
            { id: 4, name: 'Blueberries', price: 28.9, unit: 'box', image: '🫐', organic: true, stock: 15 }
        ],
        vegetables: [
            { id: 5, name: 'Organic Broccoli', price: 8.8, unit: '250g', image: '🥦', organic: true, stock: 28 },
            { id: 6, name: 'Carrots', price: 3.5, unit: '500g', image: '🥕', discount: '2nd at half price', stock: 56 },
            { id: 7, name: 'Cherry Tomatoes', price: 9.9, unit: 'box', image: '🍅', hot: true, stock: 32 },
            { id: 8, name: 'Cucumber', price: 4.8, unit: 'piece', image: '🥒', stock: 47 }
        ],
        dairy: [
            { id: 9, name: 'Plain Yogurt', price: 13.8, unit: '500ml', image: '🥛', hot: true, stock: 22 },
            { id: 10, name: 'Cheddar Cheese', price: 25.9, unit: '200g', image: '🧀', imported: true, stock: 15 },
            { id: 11, name: 'Organic Milk', price: 19.8, unit: '1L', image: '🥛', organic: true, stock: 38 },
            { id: 12, name: 'Butter', price: 18.5, unit: '100g', image: '🧈', imported: true, stock: 12 }
        ],
        bakery: [
            { id: 13, name: 'Whole Wheat Bread', price: 12.8, unit: 'loaf', image: '🍞', fresh: true, stock: 18 },
            { id: 14, name: 'Croissant', price: 8.9, unit: 'piece', image: '🥐', fresh: true, stock: 25 },
            { id: 15, name: 'Chocolate Donut', price: 6.5, unit: 'piece', image: '🍩', discount: 'Buy 3 get 1 free', stock: 30 },
            { id: 16, name: 'Cheesecake', price: 32.8, unit: '6-inch', image: '🍰', hot: true, stock: 8 }
        ],
        meat: [
            { id: 17, name: 'Premium Beef Steak', price: 58.8, unit: '300g', image: '🥩', premium: true, stock: 10 },
            { id: 18, name: 'Chicken Breast', price: 13.9, unit: '500g', image: '🍗', stock: 45 },
            { id: 19, name: 'Organic Pork', price: 29.9, unit: '500g', image: '🐖', organic: true, stock: 16 },
            { id: 20, name: 'Salmon Fillet', price: 48.8, unit: '300g', image: '🐟', imported: true, stock: 12 }
        ],
        drinks: [
            { id: 21, name: 'Mineral Water', price: 2.5, unit: '550ml', image: '💧', stock: 120 },
            { id: 22, name: 'Orange Juice', price: 9.9, unit: '1L', image: '🍊', stock: 35 },
            { id: 23, name: 'Iced Coffee', price: 13.8, unit: '500ml', image: '☕', hot: true, stock: 28 },
            { id: 24, name: 'Sparkling Water', price: 6.5, unit: '330ml', image: '🫧', imported: true, stock: 42 }
        ]
    };

    return productsByCategory[categoryId] || [];
};

const Category = () => {
    const [, setProducts] = useAtom(productsAtom);
    const [activeCategory, setActiveCategory] = useAtom(categoryAtom);

    const handleCategoryClick = async (categoryId) => {
        setActiveCategory(categoryId);
        const products = await fetchProductsByCategory(categoryId);
        setProducts(products);
    };

    useEffect(() => {
        // Load products from the first category on initialization
        handleCategoryClick(categories[0].id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ 
            backgroundColor: '#1a1a1a', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', 
            height: '100%', 
            overflow: 'hidden',
            color: '#e0e0e0'
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                padding: '16px' 
            }}>
                <h2 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    margin: 0,
                    color: '#ffffff'
                }}>
                    Categories
                </h2>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px' 
                }}>
                    {categories.map((category) => {
                        const isActive = activeCategory === category.id;
                        const color = colorMap[category.color];
                        
                        return (
                            <button
                                key={category.id}
                                style={{
                                    backgroundColor: isActive ? color.bg : '#2a2a2a',
                                    color: isActive ? 'white' : '#e0e0e0',
                                    border: isActive ? 'none' : `1px solid #444444`,
                                    borderRadius: '6px',
                                    padding: '12px 16px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    display: 'block',
                                    width: '100%'
                                }}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '12px',
                                    width: '100%'
                                }}>
                                    <span style={{ fontSize: '20px' }}>{category.icon}</span>
                                    <span style={{ 
                                        flex: 1, 
                                        fontSize: '14px'
                                    }}>
                                        {category.name}
                                    </span>
                                    <ChevronRightIcon style={{
                                        opacity: isActive ? 1 : 0.5,
                                        transform: isActive ? 'translateX(2px)' : 'none',
                                        transition: 'all 0.2s ease',
                                        color: isActive ? 'white' : '#a0a0a0'
                                    }} />
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div style={{ 
                    marginTop: 'auto',
                    padding: '6px',
                    border: '1px solid #444444',
                    borderRadius: '999px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#a0a0a0'
                }}>
                    {categories.length} categories
                </div>
            </div>
        </div>
    );
};

export default Category;