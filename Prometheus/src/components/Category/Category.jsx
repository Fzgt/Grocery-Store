import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom, allProductsAtom } from '../../store/atoms';
import { getFormattedProductData, colorMap } from '../../utils/productDataUtils';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Category.css';


const Category = () => {
    const [, setProducts] = useAtom(productsAtom);
    const [, setAllProducts] = useAtom(allProductsAtom);
    const [activeCategory, setActiveCategory] = useAtom(categoryAtom);
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [categoriesData, setCategoriesData] = useState([]);
    const [productsData, setProductsData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProductData = async () => {
            setLoading(true);
            try {
                const { categoriesData, productsData } = await getFormattedProductData();
                setCategoriesData(categoriesData);
                setProductsData(productsData);

                // Merge all products into a single array for global search
                const allProducts = Object.values(productsData)
                    .flat()
                    .filter((product, index, self) =>
                        index === self.findIndex(p => p.id === product.id)
                    );
                setAllProducts(allProducts);

                // Initialize products from the first category
                if (categoriesData.length > 0) {
                    const firstCategory = categoriesData[0].id;
                    setActiveCategory(firstCategory);
                    setProducts(productsData[firstCategory] || []);
                }
            } catch (error) {
                console.error('Error loading product data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProductData();
    }, [setProducts, setActiveCategory, setAllProducts]);

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

    const isSubcategoryActive = (subcategoryId) => {
        return activeCategory === subcategoryId;
    };

    const isMainCategoryActive = (categoryId) => {
        if (activeCategory === categoryId && !activeSubcategory) {
            return true;
        }

        if (activeCategory && activeCategory.includes('-')) {
            const parentCategory = findParentCategory(activeCategory);
            return parentCategory === categoryId;
        }

        return false;
    };

    if (loading) {
        return (
            <div className="category-container">
                <div className="category-content">
                    <h2 className="category-title">Categories</h2>
                    <div className="category-loading">Loading categories...</div>
                </div>
            </div>
        );
    }

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