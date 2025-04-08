// Category.jsx
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom, searchTermAtom } from '../store/atoms';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Category.css';

// Hardcoded categories data
const categoriesData = [
    { 
        id: 'fruits', 
        name: 'Fresh Fruits', 
        icon: '🍎', 
        color: 'green',
        subcategories: [
            { id: 'fruits-local', name: 'Local Fruits' },
            { id: 'fruits-imported', name: 'Imported Fruits' },
            { id: 'fruits-berries', name: 'Berries' },
            { id: 'fruits-citrus', name: 'Citrus Fruits' }
        ]
    },
    { 
        id: 'vegetables', 
        name: 'Seasonal Vegetables', 
        icon: '🥦', 
        color: 'lime',
        subcategories: [
            { id: 'vegetables-leafy', name: 'Leafy Greens' },
            { id: 'vegetables-root', name: 'Root Vegetables' },
            { id: 'vegetables-exotic', name: 'Exotic Vegetables' },
            { id: 'vegetables-organic', name: 'Organic Vegetables' }
        ]
    },
    { 
        id: 'dairy', 
        name: 'Dairy Products', 
        icon: '🧀', 
        color: 'amber',
        subcategories: [
            { id: 'dairy-milk', name: 'Milk & Cream' },
            { id: 'dairy-cheese', name: 'Cheese' },
            { id: 'dairy-yogurt', name: 'Yogurt' },
            { id: 'dairy-butter', name: 'Butter & Spreads' }
        ]
    },
    { 
        id: 'bakery', 
        name: 'Bakery Items', 
        icon: '🍞', 
        color: 'orange',
        subcategories: [
            { id: 'bakery-bread', name: 'Bread' },
            { id: 'bakery-pastry', name: 'Pastries' },
            { id: 'bakery-cakes', name: 'Cakes' },
            { id: 'bakery-desserts', name: 'Desserts' }
        ]
    },
    { 
        id: 'meat', 
        name: 'Meat & Seafood', 
        icon: '🥩', 
        color: 'red',
        subcategories: [
            { id: 'meat-beef', name: 'Beef' },
            { id: 'meat-poultry', name: 'Poultry' },
            { id: 'meat-pork', name: 'Pork' },
            { id: 'meat-seafood', name: 'Seafood' }
        ]
    },
    { 
        id: 'drinks', 
        name: 'Beverages', 
        icon: '🧃', 
        color: 'blue',
        subcategories: [
            { id: 'drinks-water', name: 'Water' },
            { id: 'drinks-juice', name: 'Juices' },
            { id: 'drinks-soda', name: 'Soft Drinks' },
            { id: 'drinks-tea', name: 'Tea & Coffee' }
        ]
    }
];

// Hardcoded products data
const productsData = {
    // Main categories
    'fruits': [
        { id: 1, name: 'New Zealand Apple', price: 12.9, unit: '500g', image: '🍎', stock: 35 },
        { id: 2, name: 'Thai Banana', price: 6.5, unit: 'bunch', image: '🍌', stock: 42 },
        { id: 3, name: 'Dragon Fruit', price: 15.8, unit: 'piece', image: '🐉', stock: 18 },
        { id: 4, name: 'Blueberries', price: 28.9, unit: 'box', image: '🫐', stock: 15 },
        { id: 201, name: 'Watermelon', price: 8.5, unit: 'kg', image: '🍉', stock: 20 },
        { id: 202, name: 'Peach', price: 4.9, unit: 'piece', image: '🍑', stock: 25 },
        { id: 203, name: 'Strawberries', price: 7.9, unit: 'box', image: '🍓', stock: 18 },
        { id: 204, name: 'Oranges', price: 3.5, unit: '4 pack', image: '🍊', stock: 30 }
    ],
    'vegetables': [
        { id: 5, name: 'Organic Broccoli', price: 8.8, unit: '250g', image: '🥦', stock: 28 },
        { id: 6, name: 'Carrots', price: 3.5, unit: '500g', image: '🥕', stock: 56 },
        { id: 7, name: 'Cherry Tomatoes', price: 9.9, unit: 'box', image: '🍅', stock: 32 },
        { id: 8, name: 'Cucumber', price: 4.8, unit: 'piece', image: '🥒', stock: 47 },
        { id: 205, name: 'Bell Pepper', price: 2.5, unit: 'piece', image: '🫑', stock: 35 },
        { id: 206, name: 'Potato', price: 5.9, unit: 'kg', image: '🥔', stock: 40 },
        { id: 207, name: 'Spinach', price: 3.9, unit: 'bunch', image: '🥬', stock: 25 },
        { id: 208, name: 'Mushrooms', price: 6.5, unit: '250g', image: '🍄', stock: 22 }
    ],
    'dairy': [
        { id: 9, name: 'Plain Yogurt', price: 13.8, unit: '500ml', image: '🥛', stock: 22 },
        { id: 10, name: 'Cheddar Cheese', price: 25.9, unit: '200g', image: '🧀', stock: 15 },
        { id: 209, name: 'Greek Yogurt', price: 15.8, unit: '500ml', image: '🥛', stock: 18 },
        { id: 210, name: 'Organic Milk', price: 19.8, unit: '1L', image: '🥛', stock: 24 },
        { id: 211, name: 'Butter', price: 18.5, unit: '100g', image: '🧈', stock: 30 },
        { id: 212, name: 'Cream Cheese', price: 13.5, unit: '200g', image: '🧀', stock: 20 }
    ],
    'bakery': [
        { id: 13, name: 'Whole Wheat Bread', price: 12.8, unit: 'loaf', image: '🍞', stock: 18 },
        { id: 14, name: 'Croissant', price: 8.9, unit: 'piece', image: '🥐', stock: 25 },
        { id: 213, name: 'Chocolate Muffin', price: 4.5, unit: 'piece', image: '🧁', stock: 15 },
        { id: 214, name: 'Bagel', price: 3.5, unit: 'piece', image: '🥯', stock: 22 },
        { id: 215, name: 'Sourdough Bread', price: 14.9, unit: 'loaf', image: '🍞', stock: 12 },
        { id: 216, name: 'Cinnamon Roll', price: 5.5, unit: 'piece', image: '🧁', stock: 18 }
    ],
    'meat': [
        { id: 217, name: 'Chicken Breast', price: 24.9, unit: '500g', image: '🍗', stock: 15 },
        { id: 218, name: 'Ground Beef', price: 18.5, unit: '250g', image: '🥩', stock: 20 },
        { id: 219, name: 'Bacon', price: 11.9, unit: 'pack', image: '🥓', stock: 25 },
        { id: 220, name: 'Salmon Fillet', price: 32.9, unit: '200g', image: '🐟', stock: 12 },
        { id: 221, name: 'Lamb Chops', price: 28.9, unit: '400g', image: '🍖', stock: 8 },
        { id: 222, name: 'Pork Ribs', price: 21.9, unit: '500g', image: '🍖', stock: 10 }
    ],
    'drinks': [
        { id: 223, name: 'Mineral Water', price: 2.5, unit: '1L', image: '💧', stock: 48 },
        { id: 224, name: 'Orange Juice', price: 6.9, unit: '1L', image: '🧃', stock: 24 },
        { id: 225, name: 'Cola', price: 3.5, unit: '1.5L', image: '🥤', stock: 36 },
        { id: 226, name: 'Green Tea', price: 8.9, unit: 'box', image: '🍵', stock: 18 },
        { id: 227, name: 'Coffee Beans', price: 15.9, unit: '250g', image: '☕', stock: 15 },
        { id: 228, name: 'Apple Juice', price: 5.9, unit: '1L', image: '🧃', stock: 20 }
    ],
    
    // Subcategories - Fruits
    'fruits-local': [
        { id: 101, name: 'NSW Apple', price: 9.9, unit: '500g', image: '🍎', stock: 45 },
        { id: 102, name: 'QLD Banana', price: 5.5, unit: 'bunch', image: '🍌', stock: 38 },
        { id: 229, name: 'Local Pear', price: 7.9, unit: '4 pack', image: '🍐', stock: 22 },
        { id: 230, name: 'Tasmanian Cherry', price: 18.9, unit: 'box', image: '🍒', stock: 15 }
    ],
    'fruits-imported': [
        { id: 103, name: 'New Zealand Kiwi', price: 12.8, unit: '4 pack', image: '🥝', stock: 25 },
        { id: 104, name: 'US Grapes', price: 18.5, unit: '500g', image: '🍇', stock: 18 },
        { id: 231, name: 'Mexican Avocado', price: 3.9, unit: 'piece', image: '🥑', stock: 28 },
        { id: 232, name: 'Italian Lemon', price: 2.5, unit: 'piece', image: '🍋', stock: 35 }
    ],
    'fruits-berries': [
        { id: 233, name: 'Raspberries', price: 9.9, unit: 'box', image: '🍓', stock: 15 },
        { id: 234, name: 'Blackberries', price: 10.9, unit: 'box', image: '🍓', stock: 12 },
        { id: 235, name: 'Organic Blueberries', price: 12.9, unit: 'box', image: '🫐', stock: 10 },
        { id: 236, name: 'Mixed Berries', price: 14.9, unit: 'bag', image: '🍓', stock: 8 }
    ],
    'fruits-citrus': [
        { id: 237, name: 'Grapefruit', price: 4.5, unit: 'piece', image: '🍊', stock: 20 },
        { id: 238, name: 'Mandarin', price: 8.9, unit: 'bag', image: '🍊', stock: 25 },
        { id: 239, name: 'Blood Orange', price: 7.5, unit: '3 pack', image: '🍊', stock: 15 },
        { id: 240, name: 'Lime', price: 1.9, unit: 'piece', image: '🍋', stock: 30 }
    ],
    
    // Subcategories - Vegetables
    'vegetables-leafy': [
        { id: 105, name: 'Baby Spinach', price: 4.5, unit: 'bag', image: '🥬', stock: 30 },
        { id: 106, name: 'Lettuce', price: 3.9, unit: 'head', image: '🥬', stock: 25 },
        { id: 241, name: 'Kale', price: 5.9, unit: 'bunch', image: '🥬', stock: 18 },
        { id: 242, name: 'Rocket', price: 4.2, unit: 'bag', image: '🥬', stock: 22 }
    ],
    'vegetables-root': [
        { id: 107, name: 'Sweet Potato', price: 5.9, unit: 'kg', image: '🍠', stock: 40 },
        { id: 108, name: 'Ginger', price: 12.9, unit: '250g', image: '🧅', stock: 22 },
        { id: 243, name: 'Beetroot', price: 4.5, unit: 'bunch', image: '🥕', stock: 18 },
        { id: 244, name: 'Turnip', price: 2.9, unit: 'piece', image: '🥔', stock: 15 }
    ],
    'vegetables-exotic': [
        { id: 245, name: 'Artichoke', price: 6.9, unit: 'piece', image: '🥬', stock: 10 },
        { id: 246, name: 'Okra', price: 8.9, unit: '250g', image: '🥬', stock: 12 },
        { id: 247, name: 'Asparagus', price: 7.9, unit: 'bunch', image: '🥦', stock: 15 },
        { id: 248, name: 'Bok Choy', price: 4.5, unit: 'bunch', image: '🥬', stock: 20 }
    ],
    'vegetables-organic': [
        { id: 249, name: 'Organic Carrots', price: 6.9, unit: 'bunch', image: '🥕', stock: 25 },
        { id: 250, name: 'Organic Tomatoes', price: 8.9, unit: 'box', image: '🍅', stock: 18 },
        { id: 251, name: 'Organic Potato', price: 7.9, unit: 'kg', image: '🥔', stock: 22 },
        { id: 252, name: 'Organic Zucchini', price: 5.9, unit: 'piece', image: '🥒', stock: 15 }
    ],
    
    // Subcategories - Dairy
    'dairy-milk': [
        { id: 109, name: 'Full Cream Milk', price: 5.5, unit: '2L', image: '🥛', stock: 48 },
        { id: 110, name: 'Almond Milk', price: 4.9, unit: '1L', image: '🥛', stock: 32 },
        { id: 253, name: 'Soy Milk', price: 4.5, unit: '1L', image: '🥛', stock: 25 },
        { id: 254, name: 'Lactose-Free Milk', price: 6.9, unit: '1L', image: '🥛', stock: 18 }
    ],
    'dairy-cheese': [
        { id: 111, name: 'Blue Cheese', price: 14.9, unit: '200g', image: '🧀', stock: 15 },
        { id: 112, name: 'Mozzarella', price: 8.9, unit: '250g', image: '🧀', stock: 20 },
        { id: 255, name: 'Feta', price: 6.9, unit: '200g', image: '🧀', stock: 18 },
        { id: 256, name: 'Brie', price: 12.9, unit: '150g', image: '🧀', stock: 12 }
    ],
    'dairy-yogurt': [
        { id: 257, name: 'Strawberry Yogurt', price: 5.9, unit: '500g', image: '🥛', stock: 22 },
        { id: 258, name: 'Natural Yogurt', price: 4.5, unit: '500g', image: '🥛', stock: 25 },
        { id: 259, name: 'Vanilla Yogurt', price: 5.5, unit: '500g', image: '🥛', stock: 20 },
        { id: 260, name: 'Probiotic Yogurt', price: 7.9, unit: '6 pack', image: '🥛', stock: 15 }
    ],
    'dairy-butter': [
        { id: 261, name: 'Salted Butter', price: 6.9, unit: '250g', image: '🧈', stock: 28 },
        { id: 262, name: 'Unsalted Butter', price: 6.5, unit: '250g', image: '🧈', stock: 25 },
        { id: 263, name: 'Margarine', price: 4.9, unit: '500g', image: '🧈', stock: 30 },
        { id: 264, name: 'Olive Oil Spread', price: 5.9, unit: '250g', image: '🧈', stock: 18 }
    ],
    
    // Subcategories - Bakery
    'bakery-bread': [
        { id: 113, name: 'Sourdough Bread', price: 6.5, unit: 'loaf', image: '🍞', stock: 15 },
        { id: 114, name: 'Rye Bread', price: 7.8, unit: 'loaf', image: '🍞', stock: 12 },
        { id: 265, name: 'Multigrain Bread', price: 5.9, unit: 'loaf', image: '🍞', stock: 20 },
        { id: 266, name: 'Garlic Bread', price: 4.5, unit: 'loaf', image: '🍞', stock: 18 }
    ],
    'bakery-pastry': [
        { id: 115, name: 'Pain au Chocolat', price: 4.5, unit: 'piece', image: '🥐', stock: 18 },
        { id: 116, name: 'Cinnamon Roll', price: 5.2, unit: 'piece', image: '🧁', stock: 14 },
        { id: 267, name: 'Almond Croissant', price: 5.9, unit: 'piece', image: '🥐', stock: 12 },
        { id: 268, name: 'Danish Pastry', price: 4.9, unit: 'piece', image: '🥐', stock: 15 }
    ],
    'bakery-cakes': [
        { id: 269, name: 'Chocolate Cake', price: 25.9, unit: 'cake', image: '🎂', stock: 8 },
        { id: 270, name: 'Cheesecake', price: 22.9, unit: 'cake', image: '🍰', stock: 6 },
        { id: 271, name: 'Carrot Cake', price: 19.9, unit: 'cake', image: '🍰', stock: 5 },
        { id: 272, name: 'Red Velvet', price: 24.9, unit: 'cake', image: '🍰', stock: 4 }
    ],
    'bakery-desserts': [
        { id: 273, name: 'Chocolate Chip Cookie', price: 3.9, unit: 'piece', image: '🍪', stock: 25 },
        { id: 274, name: 'Brownie', price: 4.5, unit: 'piece', image: '🧁', stock: 18 },
        { id: 275, name: 'Macaron', price: 3.5, unit: 'piece', image: '🍪', stock: 20 },
        { id: 276, name: 'Tiramisu', price: 6.9, unit: 'piece', image: '🍮', stock: 12 }
    ],
    
    // Subcategories - Meat
    'meat-beef': [
        { id: 277, name: 'Beef Steak', price: 28.9, unit: '300g', image: '🥩', stock: 10 },
        { id: 278, name: 'Minced Beef', price: 15.9, unit: '500g', image: '🥩', stock: 18 },
        { id: 279, name: 'Beef Ribs', price: 22.9, unit: 'rack', image: '🍖', stock: 8 },
        { id: 280, name: 'Beef Burger Patty', price: 12.9, unit: '4 pack', image: '🥩', stock: 15 }
    ],
    'meat-poultry': [
        { id: 281, name: 'Chicken Thighs', price: 15.9, unit: '500g', image: '🍗', stock: 20 },
        { id: 282, name: 'Whole Chicken', price: 18.9, unit: 'each', image: '🐓', stock: 12 },
        { id: 283, name: 'Turkey Breast', price: 22.9, unit: '400g', image: '🍗', stock: 8 },
        { id: 284, name: 'Chicken Wings', price: 12.9, unit: '500g', image: '🍗', stock: 15 }
    ],
    'meat-pork': [
        { id: 285, name: 'Pork Chops', price: 16.9, unit: '400g', image: '🍖', stock: 15 },
        { id: 286, name: 'Pork Belly', price: 19.9, unit: '500g', image: '🍖', stock: 10 },
        { id: 287, name: 'Ham', price: 12.9, unit: '250g', image: '🍖', stock: 20 },
        { id: 288, name: 'Pork Sausage', price: 9.9, unit: 'pack', image: '🌭', stock: 18 }
    ],
    'meat-seafood': [
        { id: 289, name: 'Prawns', price: 24.9, unit: '300g', image: '🦐', stock: 12 },
        { id: 290, name: 'Cod Fillet', price: 19.9, unit: '200g', image: '🐟', stock: 10 },
        { id: 291, name: 'Tuna Steak', price: 25.9, unit: '250g', image: '🐟', stock: 8 },
        { id: 292, name: 'Mussels', price: 14.9, unit: '500g', image: '🦪', stock: 15 }
    ],
    
    // Subcategories - Drinks
    'drinks-water': [
        { id: 293, name: 'Still Water', price: 1.9, unit: '1.5L', image: '💧', stock: 50 },
        { id: 294, name: 'Sparkling Water', price: 2.5, unit: '1L', image: '💧', stock: 35 },
        { id: 295, name: 'Flavored Water', price: 3.5, unit: '1L', image: '💧', stock: 25 },
        { id: 296, name: 'Coconut Water', price: 4.9, unit: '500ml', image: '🥥', stock: 18 }
    ],
    'drinks-juice': [
        { id: 297, name: 'Fresh Orange Juice', price: 8.9, unit: '1L', image: '🧃', stock: 20 },
        { id: 298, name: 'Apple Juice', price: 6.5, unit: '1L', image: '🧃', stock: 25 },
        { id: 299, name: 'Mixed Berry Juice', price: 7.9, unit: '750ml', image: '🧃', stock: 15 },
        { id: 300, name: 'Pineapple Juice', price: 6.9, unit: '1L', image: '🧃', stock: 18 }
    ],
    'drinks-soda': [
        { id: 301, name: 'Cola', price: 3.9, unit: '1.5L', image: '🥤', stock: 30 },
        { id: 302, name: 'Lemonade', price: 3.5, unit: '1.5L', image: '🥤', stock: 28 },
        { id: 303, name: 'Ginger Ale', price: 4.2, unit: '1.25L', image: '🥤', stock: 20 },
        { id: 304, name: 'Orange Soda', price: 3.8, unit: '1.5L', image: '🥤', stock: 25 }
    ],
    'drinks-tea': [
        { id: 305, name: 'English Breakfast Tea', price: 6.9, unit: '50 bags', image: '🍵', stock: 22 },
        { id: 306, name: 'Green Tea', price: 7.9, unit: '40 bags', image: '🍵', stock: 18 },
        { id: 307, name: 'Herbal Tea', price: 8.5, unit: '30 bags', image: '🍵', stock: 15 },
        { id: 308, name: 'Ground Coffee', price: 12.9, unit: '250g', image: '☕', stock: 20 }
    ]
};

// Color mapping
const colorMap = {
    'green': '#10b981',
    'lime': '#84cc16',
    'amber': '#f59e0b',
    'orange': '#f97316',
    'red': '#ef4444',
    'blue': '#3b82f6'
};

const Category = () => {
    const [, setProducts] = useAtom(productsAtom);
    const [activeCategory, setActiveCategory] = useAtom(categoryAtom);
    const [searchTerm] = useAtom(searchTermAtom);
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    // Initialize with the first category's products
    useEffect(() => {
        if (categoriesData.length > 0) {
            // Always initialize products on component mount
            handleCategoryClick(categoriesData[0].id);
        }
    }, []);  // Only run once on component mount

    // Auto-expand the parent category when a subcategory is active
    useEffect(() => {
        if (activeCategory && activeCategory.includes('-')) {
            const mainCategory = activeCategory.split('-')[0];
            setExpandedCategories(prev => ({
                ...prev,
                [mainCategory]: true
            }));
        }
    }, [activeCategory]);

    const handleCategoryClick = (categoryId) => {
        // Toggle expanded state
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
        
        setActiveCategory(categoryId);
        setActiveSubcategory(null); // Reset active subcategory
        
        // Load products for this category
        setProducts(productsData[categoryId] || []);
    };

    const handleSubcategoryClick = (categoryId, subcategoryId) => {
        setActiveCategory(subcategoryId);
        setActiveSubcategory(subcategoryId);
        
        // Load products for this subcategory
        setProducts(productsData[subcategoryId] || []);
    };

    // Find the parent category of a subcategory
    const findParentCategory = (subcategoryId) => {
        for (const category of categoriesData) {
            if (category.subcategories) {
                for (const subcategory of category.subcategories) {
                    if (subcategory.id === subcategoryId) {
                        return category.id;
                    }
                }
            }
        }
        return null;
    };

    // Determine if a subcategory is active
    const isSubcategoryActive = (subcategoryId) => {
        return activeCategory === subcategoryId;
    };

    // Determine if a main category is active (either directly or via a subcategory)
    const isMainCategoryActive = (categoryId) => {
        // If directly active
        if (activeCategory === categoryId && !activeSubcategory) {
            return true;
        }
        
        // If one of its subcategories is active
        if (activeCategory && activeCategory.includes('-')) {
            const parentCategory = findParentCategory(activeCategory);
            return parentCategory === categoryId;
        }
        
        return false;
    };

    return (
        <div className="category-container">
            <div className="category-content">
                <h2 className="category-title">Categories</h2>

                <div className="category-list">
                    {categoriesData.map((category) => {
                        const isActive = isMainCategoryActive(category.id);
                        const isExpanded = expandedCategories[category.id];
                        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                        
                        return (
                            <div key={category.id} className="category-item">
                                <button
                                    className={`category-button ${isActive ? 'active' : ''}`}
                                    style={{
                                        backgroundColor: isActive ? colorMap[category.color] : '',
                                    }}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    <div className="category-button-content">
                                        <span className="category-icon">{category.icon}</span>
                                        <span className="category-name">{category.name}</span>
                                        {hasSubcategories && (
                                            isExpanded ? 
                                                <KeyboardArrowDownIcon className="category-arrow" /> : 
                                                <KeyboardArrowRightIcon className="category-arrow" />
                                        )}
                                    </div>
                                </button>
                                
                                {hasSubcategories && (
                                    <div className={`subcategory-container ${isExpanded ? 'visible' : ''}`}>
                                        {category.subcategories.map(subcategory => {
                                            const isSubActive = isSubcategoryActive(subcategory.id);
                                            
                                            return (
                                                <button
                                                    key={subcategory.id}
                                                    className={`subcategory-button ${isSubActive ? 'active' : ''}`}
                                                    onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                                                >
                                                    <div className="category-button-content">
                                                        <span className="category-name">{subcategory.name}</span>
                                                        <KeyboardArrowRightIcon fontSize="small" className="category-arrow" />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="category-counter">
                    {categoriesData.length} categories
                </div>
            </div>
        </div>
    );
};

export default Category;