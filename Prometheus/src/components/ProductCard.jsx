import { useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../store/atoms';
import {
    Box,
    Card,
    Flex,
    Text,
    Badge,
    Button,
    IconButton
} from '@radix-ui/themes';
import { HeartIcon, PlusIcon, MinusIcon } from '@radix-ui/react-icons';

const ProductCard = ({ product, onViewDetails }) => {
    const [cart, setCart] = useAtom(cartAtom);
    
    // 查找商品在购物车中的数量
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = (e) => {
        e.stopPropagation();
        
        // 检查商品是否已在购物车中
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
            // 更新已有商品数量
            const newCart = [...cart];
            newCart[existingItemIndex] = {
                ...newCart[existingItemIndex],
                quantity: newCart[existingItemIndex].quantity + 1
            };
            setCart(newCart);
        } else {
            // 添加新商品到购物车
            setCart([...cart, {
                ...product,
                quantity: 1
            }]);
        }
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        
        // 找到商品在购物车中的索引
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0 && cart[existingItemIndex].quantity > 1) {
            // 减少商品数量
            const newCart = [...cart];
            newCart[existingItemIndex] = {
                ...newCart[existingItemIndex],
                quantity: newCart[existingItemIndex].quantity - 1
            };
            setCart(newCart);
        } else if (existingItemIndex >= 0) {
            // 移除商品
            setCart(cart.filter(item => item.id !== product.id));
        }
    };

    return (
        <Card
            size="2"
            style={{
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                position: 'relative'
            }}
            className="product-card"
            onClick={() => onViewDetails(product)}
        >
            {/* 标签 */}
            <Flex gap="2" style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1 }}>
                {product.hot && (
                    <Badge size="1" color="red" variant="solid">热卖</Badge>
                )}
                {product.organic && (
                    <Badge size="1" color="green" variant="solid">有机</Badge>
                )}
                {product.discount && (
                    <Badge size="1" color="crimson" variant="solid">{product.discount}</Badge>
                )}
                {product.imported && (
                    <Badge size="1" color="blue" variant="solid">进口</Badge>
                )}
                {product.fresh && (
                    <Badge size="1" color="amber" variant="solid">新鲜</Badge>
                )}
            </Flex>

            {/* 商品图片 */}
            <Flex
                align="center"
                justify="center"
                style={{
                    height: '160px',
                    backgroundColor: 'var(--gray-3)',
                    borderRadius: 'var(--radius-2) var(--radius-2) 0 0',
                    overflow: 'hidden'
                }}
            >
                <Text size="9">{product.image}</Text>
            </Flex>

            {/* 商品信息 */}
            <Box p="4">
                <Flex direction="column" gap="2">
                    <Text size="2" weight="bold">{product.name}</Text>

                    <Flex justify="between" align="baseline">
                        <Flex align="baseline" gap="1">
                            <Text size="4" weight="bold">¥{product.price}</Text>
                            <Text size="1" color="gray">/{product.unit}</Text>
                        </Flex>
                        <Badge size="1" variant="outline" color={product.stock > 0 ? "gray" : "red"}>
                            {product.stock > 0 ? `库存 ${product.stock}` : "缺货"}
                        </Badge>
                    </Flex>

                    {/* 购物车控制 */}
                    <Flex mt="2" gap="2" align="center">
                        <Button
                            size="1"
                            variant="outline"
                            color="gray"
                            style={{ flexGrow: 1 }}
                            onClick={(e) => { e.stopPropagation(); }}
                        >
                            <HeartIcon />
                            收藏
                        </Button>

                        <Flex align="center" style={{ backgroundColor: 'var(--gray-3)', borderRadius: 'var(--radius-2)' }}>
                            <IconButton
                                size="1"
                                variant="ghost"
                                color={quantity > 0 ? "crimson" : "gray"}
                                disabled={quantity === 0}
                                onClick={handleRemoveFromCart}
                            >
                                <MinusIcon />
                            </IconButton>

                            <Text size="2" style={{ width: '24px', textAlign: 'center' }}>{quantity}</Text>

                            <IconButton
                                size="1"
                                variant="ghost"
                                color="green"
                                disabled={product.stock <= 0}
                                onClick={handleAddToCart}
                            >
                                <PlusIcon />
                            </IconButton>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Card>
    );
};

export default ProductCard;