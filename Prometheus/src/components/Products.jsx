import { useAtom } from 'jotai';
import { productsAtom, searchTermAtom, categoryAtom } from '../store/atoms';
import ProductCard from './ProductCard';
import './Products.css';

const Products = () => {
    const [products] = useAtom(productsAtom);
    const [searchTerm] = useAtom(searchTermAtom);
    const [category] = useAtom(categoryAtom);

    // Display category name with proper formatting
    const getCategoryDisplayName = () => {
        if (!category) return '';

        // Handle subcategories
        if (category.includes('-')) {
            const parts = category.split('-');
            // Capitalize first letter of each part
            return parts.map(part =>
                part.charAt(0).toUpperCase() + part.slice(1)
            ).join(' - ');
        }

        // Regular category
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    return (
        <div className="products-container">
            <div className="products-content">
                <div className="products-header">
                    <h2 className="products-title">
                        {searchTerm
                            ? `Search Results for "${searchTerm}"`
                            : `${getCategoryDisplayName()}`
                        }
                    </h2>

                    <div className="products-count">
                        {products.length} items
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="products-empty">
                        <div className="products-empty-title">No products found</div>
                        <div className="products-empty-subtitle">
                            {searchTerm ? 'Try searching with different keywords' : 'No products in this category'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;