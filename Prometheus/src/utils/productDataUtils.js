import { fetchProducts } from './utils';

/**
 * 将API返回的产品数据转换为分类数据结构
 * @returns {Promise<{categoriesData: Array, productsData: Object}>}
 */
export const getFormattedProductData = async () => {
  try {
    const products = await fetchProducts();
    
    if (!products || !Array.isArray(products)) {
      console.error('Failed to fetch products or invalid data format');
      return { categoriesData: [], productsData: {} };
    }
    
    // 存储所有分类和子分类的集合
    const categories = new Map();
    const subCategories = new Map();
    
    // 用于存储格式化后的产品数据
    const productsData = {};
    
    // 处理产品数据
    products.forEach(product => {
      const { category, subcategory } = product;
      
      // 添加产品到主分类
      if (!productsData[category]) {
        productsData[category] = [];
      }
      productsData[category].push(product);
      
      // 添加产品到子分类
      if (subcategory) {
        if (!productsData[subcategory]) {
          productsData[subcategory] = [];
        }
        productsData[subcategory].push(product);
        
        // 记录该子分类属于哪个主分类
        const mainCategory = subcategory.split('-')[0];
        if (!subCategories.has(subcategory)) {
          subCategories.set(subcategory, {
            id: subcategory,
            name: formatCategoryName(subcategory.split('-')[1]),
            mainCategory
          });
        }
      }
      
      // 记录主分类
      if (!categories.has(category)) {
        categories.set(category, {
          id: category,
          name: formatCategoryName(category),
          subcategories: [],
          // 为每个类别分配一个图标和颜色
          icon: getCategoryIcon(category),
          color: getCategoryColor(category)
        });
      }
    });
    
    // 将子分类添加到对应的主分类中
    subCategories.forEach(subCategory => {
      const mainCategory = categories.get(subCategory.mainCategory);
      if (mainCategory) {
        mainCategory.subcategories.push(subCategory);
      }
    });
    
    // 转换为数组格式
    const categoriesData = Array.from(categories.values());
    
    return { categoriesData, productsData };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return { categoriesData: [], productsData: {} };
  }
};

/**
 * 格式化分类名称为更友好的显示格式
 */
const formatCategoryName = (name) => {
  if (!name) return '';
  // 将 fruit 转换为 Fruit, fruits 转换为 Fruits, fruits-local 转换为 Local Fruits
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
};

/**
 * 根据分类名获取对应的图标
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
 * 根据分类名获取对应的颜色
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
 * 导出颜色映射，供组件使用
 */
export const colorMap = {
  'green': '#10b981',
  'lime': '#84cc16',
  'amber': '#f59e0b',
  'orange': '#f97316',
  'red': '#ef4444',
  'blue': '#3b82f6'
}; 