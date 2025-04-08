import { useAtom } from 'jotai';
import { cartAtom } from '../store/atoms';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [cart, setCart] = useAtom(cartAtom);

    // Find product quantity in cart
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = (e) => {
        e.stopPropagation();

        if (product.stock <= 0) {
            return; // Don't add out of stock items
        }

        // Check if item already in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            // Update existing item quantity
            const newCart = [...cart];
            newCart[existingItemIndex] = {
                ...newCart[existingItemIndex],
                quantity: newCart[existingItemIndex].quantity + 1
            };
            setCart(newCart);
        } else {
            // Add new item to cart
            setCart([...cart, {
                ...product,
                quantity: 1
            }]);
        }
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();

        // Find item index in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            // Remove item completely
            setCart(cart.filter(item => item.id !== product.id));
        }
    };

    return (
        <div className="product-card">
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
            </div>

            {/* Product image */}
            <div className="product-image">
                <span>{product.image}</span>
            </div>

            {/* Product info */}
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-price-container">
                    <div className="product-price">
                        <span className="price-amount">${product.price}</span>
                        <span className="price-unit">/{product.unit}</span>
                    </div>
                    <span className={product.stock > 0 ? "stock-indicator in-stock" : "stock-indicator out-of-stock"}>
                        {product.stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                </div>

                {/* Cart controls */}
                <div className="product-actions">
                    {quantity > 0 ? (
                        <button
                            className="cart-button remove-from-cart"
                            onClick={handleRemoveFromCart}
                        >
                            <RemoveShoppingCartIcon style={{ fontSize: 16, marginRight: 4 }} />
                            <span>Remove from Cart</span>
                        </button>
                    ) : (
                        <button
                            className="cart-button add-to-cart"
                            disabled={product.stock <= 0}
                            onClick={handleAddToCart}
                        >
                            <AddShoppingCartIcon style={{ fontSize: 16, marginRight: 4 }} />
                            <span>Add to Cart</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;