// Products.jsx
import { useState } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom, searchTermAtom } from '../store/atoms';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';

const Products = () => {
    const [products] = useAtom(productsAtom);
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Handle product details
    const handleViewDetails = (product) => {
        setSelectedProduct(product);
    };

    // Close product details
    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    // Filter products based on search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ 
            backgroundColor: '#1a1a1a', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', 
            height: '100%', 
            overflow: 'auto' 
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                padding: '16px' 
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    gap: '16px' 
                }}>
                    <h2 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        margin: 0,
                        color: '#ffffff'
                    }}>
                        Products List
                    </h2>

                    <div style={{ 
                        backgroundColor: '#333333', 
                        color: '#e0e0e0', 
                        padding: '4px 8px', 
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: '500'
                    }}>
                        {filteredProducts.length} items
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '24px',
                        height: '200px',
                        color: '#e0e0e0'
                    }}>
                        <div style={{ fontSize: '18px' }}>No products found</div>
                        <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Try searching with different keywords</div>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                style={{
                                    backgroundColor: '#333333',
                                    color: '#e0e0e0',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Product details dialog */}
            {selectedProduct && (
                <Dialog.Root open={!!selectedProduct} onOpenChange={handleCloseDetails}>
                    <Dialog.Portal>
                        <Dialog.Overlay style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            position: 'fixed',
                            inset: 0,
                            animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
                        }} />
                        <Dialog.Content style={{
                            backgroundColor: '#1a1a1a',
                            color: '#e0e0e0',
                            borderRadius: '6px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '500px',
                            maxHeight: '85vh',
                            padding: '25px',
                            animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                            overflow: 'auto'
                        }}>
                            <ProductDetail
                                product={selectedProduct}
                                onClose={handleCloseDetails}
                            />
                            <Dialog.Close asChild>
                                <button 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '10px', 
                                        right: '10px', 
                                        border: 'none', 
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        color: '#e0e0e0'
                                    }}
                                    aria-label="Close"
                                >
                                    <Cross2Icon />
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </div>
    );
};

export default Products;