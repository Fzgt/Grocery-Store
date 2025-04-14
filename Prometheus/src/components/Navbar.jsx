import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import {
    searchTermAtom,
    cartItemCountAtom,
    unreadNotificationsCountAtom,
    userAtom,
    productsAtom,
    categoryAtom
} from '../store/atoms';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    InputBase,
    IconButton,
    Badge,
    Paper,
    List,
    ListItem,
    ListItemText,
    Typography,
    Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';

// Hardcoded product data for search
const allProducts = [
    // Fruits
    { id: 1, name: 'New Zealand Apple', price: 12.9, unit: '500g', image: '🍎', category: 'fruits' },
    { id: 2, name: 'Thai Banana', price: 6.5, unit: 'bunch', image: '🍌', category: 'fruits' },
    { id: 3, name: 'Dragon Fruit', price: 15.8, unit: 'piece', image: '🐉', category: 'fruits' },
    { id: 4, name: 'Blueberries', price: 28.9, unit: 'box', image: '🫐', category: 'fruits' },
    { id: 21, name: 'Watermelon', price: 8.5, unit: 'kg', image: '🍉', category: 'fruits' },
    { id: 22, name: 'Peach', price: 4.9, unit: 'piece', image: '🍑', category: 'fruits' },
    { id: 23, name: 'Strawberries', price: 7.9, unit: 'box', image: '🍓', category: 'fruits' },
    { id: 24, name: 'Oranges', price: 3.5, unit: '4 pack', image: '🍊', category: 'fruits' },
    { id: 25, name: 'Lemon', price: 1.5, unit: 'piece', image: '🍋', category: 'fruits' },
    { id: 26, name: 'Green Apple', price: 11.9, unit: '500g', image: '🍏', category: 'fruits' },

    // Vegetables
    { id: 5, name: 'Organic Broccoli', price: 8.8, unit: '250g', image: '🥦', category: 'vegetables' },
    { id: 6, name: 'Carrots', price: 3.5, unit: '500g', image: '🥕', category: 'vegetables' },
    { id: 7, name: 'Cherry Tomatoes', price: 9.9, unit: 'box', image: '🍅', category: 'vegetables' },
    { id: 8, name: 'Cucumber', price: 4.8, unit: 'piece', image: '🥒', category: 'vegetables' },
    { id: 27, name: 'Bell Pepper', price: 2.5, unit: 'piece', image: '🫑', category: 'vegetables' },
    { id: 28, name: 'Potato', price: 5.9, unit: 'kg', image: '🥔', category: 'vegetables' },
    { id: 29, name: 'Spinach', price: 3.9, unit: 'bunch', image: '🥬', category: 'vegetables' },
    { id: 30, name: 'Mushrooms', price: 6.5, unit: '250g', image: '🍄', category: 'vegetables' },
    { id: 31, name: 'Garlic', price: 2.9, unit: 'bulb', image: '🧄', category: 'vegetables' },
    { id: 32, name: 'Onion', price: 1.9, unit: 'piece', image: '🧅', category: 'vegetables' },

    // Dairy
    { id: 9, name: 'Plain Yogurt', price: 13.8, unit: '500ml', image: '🥛', category: 'dairy' },
    { id: 10, name: 'Cheddar Cheese', price: 25.9, unit: '200g', image: '🧀', category: 'dairy' },
    { id: 11, name: 'Organic Milk', price: 19.8, unit: '1L', image: '🥛', category: 'dairy' },
    { id: 12, name: 'Butter', price: 18.5, unit: '100g', image: '🧈', category: 'dairy' },
    { id: 33, name: 'Greek Yogurt', price: 15.8, unit: '500ml', image: '🥛', category: 'dairy' },
    { id: 34, name: 'Mozzarella', price: 22.9, unit: '200g', image: '🧀', category: 'dairy' },
    { id: 35, name: 'Cream Cheese', price: 13.5, unit: '200g', image: '🧀', category: 'dairy' },
    { id: 36, name: 'Sour Cream', price: 9.9, unit: '250ml', image: '🥛', category: 'dairy' },

    // Bakery
    { id: 13, name: 'Whole Wheat Bread', price: 12.8, unit: 'loaf', image: '🍞', category: 'bakery' },
    { id: 14, name: 'Croissant', price: 8.9, unit: 'piece', image: '🥐', category: 'bakery' },
    { id: 15, name: 'Chocolate Muffin', price: 4.5, unit: 'piece', image: '🧁', category: 'bakery' },
    { id: 16, name: 'Bagel', price: 3.5, unit: 'piece', image: '🥯', category: 'bakery' },
    { id: 37, name: 'Cinnamon Roll', price: 5.5, unit: 'piece', image: '🧁', category: 'bakery' },
    { id: 38, name: 'Sourdough Bread', price: 14.9, unit: 'loaf', image: '🍞', category: 'bakery' },
    { id: 39, name: 'Baguette', price: 7.9, unit: 'piece', image: '🥖', category: 'bakery' },
    { id: 40, name: 'Pretzel', price: 4.2, unit: 'piece', image: '🥨', category: 'bakery' },

    // Meat
    { id: 17, name: 'Chicken Breast', price: 24.9, unit: '500g', image: '🍗', category: 'meat' },
    { id: 18, name: 'Ground Beef', price: 18.5, unit: '250g', image: '🥩', category: 'meat' },
    { id: 19, name: 'Bacon', price: 11.9, unit: 'pack', image: '🥓', category: 'meat' },
    { id: 20, name: 'Salmon Fillet', price: 32.9, unit: '200g', image: '🐟', category: 'meat' },
    { id: 41, name: 'Sausage', price: 15.9, unit: 'pack', image: '🌭', category: 'meat' },
    { id: 42, name: 'Lamb Chops', price: 28.9, unit: '400g', image: '🍖', category: 'meat' },
    { id: 43, name: 'Pork Ribs', price: 21.9, unit: '500g', image: '🍖', category: 'meat' },
    { id: 44, name: 'Shrimp', price: 26.9, unit: '250g', image: '🦐', category: 'meat' }
];



const Navbar = () => {
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [cartItemCount] = useAtom(cartItemCountAtom);
    const [unreadCount] = useAtom(unreadNotificationsCountAtom);
    const [user] = useAtom(userAtom);
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [, setProducts] = useAtom(productsAtom);
    const [, setCategory] = useAtom(categoryAtom);
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    // Check if we're on a page where search should be hidden
    const hideSearch = ['/cart', '/delivery', '/confirmation'].includes(location.pathname);

    // Filter products based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filteredResults = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchTerm]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
        setSelectedIndex(-1);
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setShowDropdown(false);

            // If an item is selected in the dropdown
            if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                selectProduct(searchResults[selectedIndex]);
            } else {
                // Update products with search results
                const filtered = allProducts.filter(product => {
                    const searchLower = searchTerm.toLowerCase();
                    return (
                        product.name.toLowerCase().includes(searchLower) ||
                        product.category.toLowerCase().includes(searchLower)
                    );
                });
                setProducts(filtered);

                // If there's at least one result, update category
                if (filtered.length > 0) {
                    setCategory(filtered[0].category);
                }

                navigate('/');
            }
        }
    };

    // Handle click on search result
    const handleResultClick = (product) => {
        selectProduct(product);
    };

    // Select a product from search results
    const selectProduct = (product) => {
        setSearchTerm(product.name);
        setShowDropdown(false);

        // Update products with matching category
        const categoryProducts = allProducts.filter(p => p.category === product.category);
        setProducts(categoryProducts);

        // Update active category
        setCategory(product.category);

        navigate('/');
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showDropdown || searchResults.length === 0) return;

        // Arrow down
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
        }

        // Arrow up
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
        }

        // Enter to select
        else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            selectProduct(searchResults[selectedIndex]);
        }

        // Escape to close dropdown
        else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Box
            component="header"
            sx={{
                padding: '12px 0',
                borderBottom: '1px solid #333333',
                backgroundColor: '#1a1a1a',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}
        >
            <Box
                sx={{
                    maxWidth: 1400,
                    margin: '0 auto',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 64
                }}
            >
                {/* Logo */}
                <Link
                    to="/"
                    style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'opacity 0.2s ease',
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    <img
                        src="/beyz.png"
                        alt="BeyzMarket Logo"
                        style={{
                            height: 36,
                            marginRight: 10
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: 'white',
                            margin: 0
                        }}
                    >
                        BeyzMarket
                    </Typography>
                </Link>

                {/* Search Box */}
                {!hideSearch && (
                    <Box
                        ref={searchRef}
                        sx={{
                            flex: 1,
                            maxWidth: 600,
                            mx: 2,
                            position: 'relative'
                        }}
                    >
                        <form onSubmit={handleSearchSubmit}>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                    backgroundColor: '#202020',
                                    border: '1px solid #333',
                                    pl: 2,
                                    pr: 1,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#252525',
                                        borderColor: '#444'
                                    },
                                    '&:focus-within': {
                                        borderColor: '#1976d2',
                                        boxShadow: '0 0 0 2px rgba(25,118,210,0.2)'
                                    }
                                }}
                                elevation={0}
                            >
                                <SearchIcon sx={{ color: '#aaa', mr: 1 }} />
                                <InputBase
                                    placeholder="Search for products, categories, or brands..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onFocus={() => searchTerm.trim() && setShowDropdown(true)}
                                    onKeyDown={handleKeyDown}
                                    fullWidth
                                    inputRef={inputRef}
                                    sx={{
                                        color: 'white',
                                        '& .MuiInputBase-input': {
                                            py: 1,
                                        }
                                    }}
                                />
                            </Paper>
                        </form>

                        {showDropdown && searchResults.length > 0 && (
                            <Paper
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    mt: 1,
                                    backgroundColor: '#202020',
                                    border: '1px solid #333',
                                    borderRadius: 2,
                                    zIndex: 20,
                                    maxHeight: 400,
                                    overflow: 'auto',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                                }}
                                elevation={3}
                            >
                                <List disablePadding>
                                    {searchResults.map((product, index) => (
                                        <ListItem
                                            key={product.id}
                                            button
                                            selected={index === selectedIndex}
                                            onClick={() => handleResultClick(product)}
                                            sx={{
                                                borderBottom: '1px solid #333',
                                                '&:last-child': {
                                                    borderBottom: 'none'
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: 'rgba(25,118,210,0.1)'
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25,118,210,0.05)'
                                                },
                                                transition: 'background-color 0.15s ease'
                                            }}
                                        >
                                            <Box sx={{
                                                fontSize: '1.75rem',
                                                mr: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 36,
                                                height: 36
                                            }}>
                                                {product.image}
                                            </Box>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            color: 'white',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#aaa',
                                                            textTransform: 'capitalize'
                                                        }}
                                                    >
                                                        {product.category}
                                                    </Typography>
                                                }
                                            />
                                            <Typography
                                                sx={{
                                                    color: '#4caf50',
                                                    fontWeight: 600,
                                                    ml: 1
                                                }}
                                            >
                                                ${product.price}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Box>
                )}

                {/* Navigation Icons */}
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title="Messages">
                        <IconButton
                            component={Link}
                            to="/messages"
                            color="inherit"
                            sx={{
                                ml: 1,
                                '&:hover': {
                                    color: '#1976d2'
                                }
                            }}
                        >
                            <Badge
                                badgeContent={unreadCount}
                                color="error"
                            >
                                <ChatIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Shopping Cart">
                        <IconButton
                            component={Link}
                            to="/cart"
                            color="inherit"
                            sx={{
                                ml: 1,
                                '&:hover': {
                                    color: '#1976d2'
                                }
                            }}
                        >
                            <Badge
                                badgeContent={cartItemCount}
                                color="success"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export default Navbar;