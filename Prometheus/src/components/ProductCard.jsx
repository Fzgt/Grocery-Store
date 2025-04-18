import { useAtom } from 'jotai';
import { cartAtom } from '../store/atoms';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { saveCartToStorage, clearCartFromStorage } from '../utils/cartUtils';
import './ProductCard.css';


const ProductCard = ({ product }) => {
    const [cart, setCart] = useAtom(cartAtom);

    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const isInStock = product.stock > 0;

    const handleAddToCart = (e) => {
        e.stopPropagation();

        if (!isInStock) {
            return; // out of stock case return directly
        }

        // Check if item already in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        let newCart;

        if (existingItemIndex >= 0) {
            newCart = [...cart];
            newCart[existingItemIndex] = {
                ...newCart[existingItemIndex],
                quantity: newCart[existingItemIndex].quantity + 1
            };
        } else { // If not in cart, add it
            newCart = [...cart, {
                ...product,
                quantity: 1
            }];
        }

        setCart(newCart);

        saveCartToStorage(newCart);
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();

        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            const newCart = cart.filter(item => item.id !== product.id);
            setCart(newCart);

            if (newCart.length > 0) {
                saveCartToStorage(newCart);
            } else {
                clearCartFromStorage();
            }
        }
    };

    return (
        <div className={`product-card ${!isInStock ? 'out-of-stock-product' : ''}`}>
            {/* Badges */}
            <div className="product-badges">
                {product.hot && (
                    <span className="product-badge badge-hot">Hot</span>
                )}
                {product.organic && (
                    <span className="product-badge badge-organic">Organic</span>
                )}
                {product.discount && (
                    <span className="product-badge badge-discount">{product.discount}</span>
                )}
                {product.imported && (
                    <span className="product-badge badge-imported">Imported</span>
                )}
                {product.fresh && (
                    <span className="product-badge badge-fresh">Fresh</span>
                )}
                {!isInStock && (
                    <span className="product-badge badge-out-of-stock">Out of Stock</span>
                )}
            </div>

            <div className="product-image">
                <span>{product.image}</span>
            </div>

            {/* Product info */}
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-price-container">
                    <div className="product-price">
                        <span className="price-amount">${Number(product.price).toFixed(2)}</span>
                        <span className="price-unit">/{product.unit}</span>
                    </div>
                    <span className={isInStock ? "stock-indicator in-stock" : "stock-indicator out-of-stock"}>
                        {isInStock ? "In stock" : "Out of stock"}
                    </span>
                </div>

                {/* Cart controls */}
                <div className="product-actions">
                    <button
                        className={`cart-button add-to-cart ${!isInStock ? 'disabled' : ''}`}
                        disabled={!isInStock}
                        onClick={handleAddToCart}
                    >
                        <AddShoppingCartIcon style={{ fontSize: 16, marginRight: 4 }} />
                        <span>
                            {isInStock
                                ? quantity > 0
                                    ? `Add to Cart (${quantity})`
                                    : 'Add to Cart'
                                : 'Out of Stock'
                            }
                        </span>
                    </button>

                    {quantity > 0 && (
                        <button
                            className="cart-button remove-from-cart"
                            onClick={handleRemoveFromCart}
                        >
                            <RemoveShoppingCartIcon style={{ fontSize: 16, marginRight: 4 }} />
                            <span>Remove</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;