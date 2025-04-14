import { fetchProducts } from './utils';

export const getFormattedProductData = async () => {
  try {
    const products = await fetchProducts();

    if (!products || !Array.isArray(products)) {
      console.error('Failed to fetch products or invalid data format');
      return { categoriesData: [], productsData: {} };
    }

    const categories = new Map();
    const subCategories = new Map();

    const productsData = {};

    products.forEach(product => {
      const { category, subcategory } = product;

      if (!productsData[category]) {
        productsData[category] = [];
      }
      productsData[category].push(product);

      if (subcategory) {
        if (!productsData[subcategory]) {
          productsData[subcategory] = [];
        }
        productsData[subcategory].push(product);

        const mainCategory = subcategory.split('-')[0];
        if (!subCategories.has(subcategory)) {
          subCategories.set(subcategory, {
            id: subcategory,
            name: formatCategoryName(subcategory.split('-')[1]),
            mainCategory
          });
        }
      }

      if (!categories.has(category)) {
        categories.set(category, {
          id: category,
          name: formatCategoryName(category),
          subcategories: [],
          icon: getCategoryIcon(category),
          color: getCategoryColor(category)
        });
      }
    });

    subCategories.forEach(subCategory => {
      const mainCategory = categories.get(subCategory.mainCategory);
      if (mainCategory) {
        mainCategory.subcategories.push(subCategory);
      }
    });

    const categoriesData = Array.from(categories.values());

    return { categoriesData, productsData };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return { categoriesData: [], productsData: {} };
  }
};

const formatCategoryName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
};


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


export const colorMap = {
  'green': '#10b981',
  'lime': '#84cc16',
  'amber': '#f59e0b',
  'orange': '#f97316',
  'red': '#ef4444',
  'blue': '#3b82f6'
}; 