// Category.jsx
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom, colorMap } from '../../store/atoms';
import { categoriesData, productsData } from './cons';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Category.css';


const Category = () => {
    const [, setProducts] = useAtom(productsAtom);
    const [activeCategory, setActiveCategory] = useAtom(categoryAtom);
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