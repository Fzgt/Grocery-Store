import { fetchProducts } from './utils';

/**
 * Convert API returned product data to category data structure
 * @returns {Promise<{categoriesData: Array, productsData: Object}>}
 */
export const getFormattedProductData = async () => {
  try {
    const products = await fetchProducts();
    
    if (!products || !Array.isArray(products)) {
      console.error('Failed to fetch products or invalid data format');
      return { categoriesData: [], productsData: {} };
    }
    
    // Store all categories and subcategories collections
    const categories = new Map();
    const subCategories = new Map();
    
    // For storing formatted product data
    const productsData = {};
    
    // Process product data
    products.forEach(product => {
      const { category, subcategory } = product;
      
      // Add product to main category
      if (!productsData[category]) {
        productsData[category] = [];
      }
      productsData[category].push(product);
      
      // Add product to subcategory
      if (subcategory) {
        if (!productsData[subcategory]) {
          productsData[subcategory] = [];
        }
        productsData[subcategory].push(product);
        
        // Record which main category this subcategory belongs to
        const mainCategory = subcategory.split('-')[0];
        if (!subCategories.has(subcategory)) {
          subCategories.set(subcategory, {
            id: subcategory,
            name: formatCategoryName(subcategory.split('-')[1]),
            mainCategory
          });
        }
      }
      
      // Record main category
      if (!categories.has(category)) {
        categories.set(category, {
          id: category,
          name: formatCategoryName(category),
          subcategories: [],
          // Assign an icon and color for each category
          icon: getCategoryIcon(category),
          color: getCategoryColor(category)
        });
      }
    });
    
    // Add subcategories to corresponding main categories
    subCategories.forEach(subCategory => {
      const mainCategory = categories.get(subCategory.mainCategory);
      if (mainCategory) {
        mainCategory.subcategories.push(subCategory);
      }
    });
    
    // Convert to array format
    const categoriesData = Array.from(categories.values());
    
    return { categoriesData, productsData };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return { categoriesData: [], productsData: {} };
  }
};

/**
 * Format category name to a more user-friendly display format
 */
const formatCategoryName = (name) => {
  if (!name) return '';
  // Convert fruit to Fruit, fruits to Fruits, fruits-local to Local Fruits
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
};

/**
 * Get corresponding icon based on category name
 */
const getCategoryIcon = (category) => {
  const iconMap = {
    'fruits': '🍎',
    'vegetables': '🥦',
    'dairy': '🧀',
    'bakery': '🍞',
    'meat': '🥩',
    'drinks': '🧃'
  };
  
  return iconMap[category] || '📦';
};

/**
 * Get corresponding color based on category name
 */
const getCategoryColor = (category) => {
  const colorMap = {
    'fruits': 'green',
    'vegetables': 'lime',
    'dairy': 'amber',
    'bakery': 'orange',
    'meat': 'red',
    'drinks': 'blue'
  };
  
  return colorMap[category] || 'blue';
};

/**
 * Export color mapping for component use
 */
export const colorMap = {
  'green': '#10b981',
  'lime': '#84cc16',
  'amber': '#f59e0b',
  'orange': '#f97316',
  'red': '#ef4444',
  'blue': '#3b82f6'
}; 