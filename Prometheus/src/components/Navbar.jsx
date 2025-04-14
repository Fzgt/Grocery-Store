import { useState, useEffect, useRef, useDeferredValue } from 'react';
import { useAtom } from 'jotai';
import {
    searchTermAtom,
    cartItemCountAtom,
    unreadNotificationsCountAtom,
    productsAtom,
    categoryAtom
} from '../store/atoms';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Box, InputBase, IconButton, Badge, Paper, List, ListItem, ListItemText, Typography, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import { fetchProducts } from '../utils/utils';


const Navbar = () => {
    // Atoms
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [cartItemCount] = useAtom(cartItemCountAtom);
    const [unreadCount] = useAtom(unreadNotificationsCountAtom);
    const [, setProducts] = useAtom(productsAtom);
    const [, setCategory] = useAtom(categoryAtom);
    // Local states
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [allProducts, setAllProducts] = useState([]);
    const deferredValue = useDeferredValue(searchTerm);
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    const hideSearch = ['/cart', '/delivery', '/messages'].includes(location.pathname);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setAllProducts(products);
        };

        getProducts();
    }, [deferredValue]);

    const filterFuzzySearch = () => {
        const searchLower = searchTerm.toLowerCase();
        const filtered = allProducts.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchLower);
            const categoryMatch = product.category.toLowerCase().includes(searchLower);

            let descriptionMatch = false;
            if (product.description) {
                const keywords = product.description.toLowerCase().split(' ');
                descriptionMatch = keywords.some(keyword =>
                    keyword.includes(searchLower) || searchLower.includes(keyword)
                );
            }

            return nameMatch || categoryMatch || descriptionMatch;
        });

        return filtered;
    }

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const filteredResults = filterFuzzySearch();
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, allProducts]);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
        setSelectedIndex(-1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setShowDropdown(false);

            if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                selectProduct(searchResults[selectedIndex]);
            } else {
                const filtered = filterFuzzySearch();
                setProducts(filtered);

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

    const handleKeyDown = (e) => {
        if (!showDropdown || searchResults.length === 0) return;
        else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            selectProduct(searchResults[selectedIndex]);
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
                                    placeholder="Search products"
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