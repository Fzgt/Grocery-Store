import { useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../store/atoms';
import {
    Flex,
    Box,
    Text,
    Heading,
    Badge,
    Dialog,
    Button,
    IconButton,
    Separator
} from '@radix-ui/themes';
import { Cross2Icon, PlusIcon, MinusIcon, RocketIcon } from '@radix-ui/react-icons';

const ProductDetail = ({ product, onClose }) => {
    const [cart, setCart] = useAtom(cartAtom);
    const [quantity, setQuantity] = useState(1);
    
    // 查找商品在购物车中的数量
    const cartItem = cart.find(item => item.id === product.id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        // 检查商品是否已在购物车中
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
            // 更新已有商品数量
            const newCart = [...cart];
            newCart[existingItemIndex] = {
                ...newCart[existingItemIndex],
                quantity: newCart[existingItemIndex].quantity + quantity
            };
            setCart(newCart);
        } else {
            // 添加新商品到购物车
            setCart([...cart, {
                ...product,
                quantity
            }]);
        }
        
        // 添加后关闭对话框
        onClose();
    };

    return (
        <Box>
            <Dialog.Title>商品详情</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                查看商品详细信息
            </Dialog.Description>
            
            <Flex gap="4" direction={{ initial: 'column', sm: 'row' }}>
                {/* 商品图片 */}
                <Flex
                    align="center"
                    justify="center"
                    style={{
                        height: '200px',
                        width: '200px',
                        backgroundColor: 'var(--gray-3)',
                        borderRadius: 'var(--radius-2)',
                        alignSelf: 'center'
                    }}
                >
                    <Text size="9">{product.image}</Text>
                </Flex>
                
                {/* 商品信息 */}
                <Box style={{ flex: 1 }}>
                    <Flex direction="column" gap="3">
                        <Heading size="5">{product.name}</Heading>
                        
                        <Flex gap="2" wrap="wrap">
                            {product.hot && <Badge color="red">热卖</Badge>}
                            {product.organic && <Badge color="green">有机</Badge>}
                            {product.discount && <Badge color="crimson">{product.discount}</Badge>}
                            {product.imported && <Badge color="blue">进口</Badge>}
                            {product.fresh && <Badge color="amber">新鲜</Badge>}
                            <Badge color="gray" variant="outline">库存 {product.stock}</Badge>
                        </Flex>
                        
                        <Flex align="baseline" gap="1">
                            <Text size="6" weight="bold">¥{product.price}</Text>
                            <Text size="2" color="gray">/{product.unit}</Text>
                        </Flex>
                        
                        <Separator size="4" />
                        
                        <Text as="p" size="2" color="gray">
                            这是一款高品质的{product.name}，选用优质原料，保证新鲜美味。
                            {product.organic && '采用有机种植方式，不含农药和化学肥料。'}
                            {product.imported && '从国外优质产区直接进口，品质有保障。'}
                        </Text>
                        
                        <Flex gap="3" mt="2" align="center">
                            <Text size="2">数量:</Text>
                            <Flex align="center" style={{ backgroundColor: 'var(--gray-3)', borderRadius: 'var(--radius-2)' }}>
                                <IconButton
                                    size="1"
                                    variant="ghost"
                                    disabled={quantity <= 1}
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                >
                                    <MinusIcon />
                                </IconButton>
                                
                                <Text size="2" style={{ width: '30px', textAlign: 'center' }}>{quantity}</Text>
                                
                                <IconButton
                                    size="1"
                                    variant="ghost"
                                    disabled={quantity >= product.stock}
                                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                                >
                                    <PlusIcon />
                                </IconButton>
                            </Flex>
                        </Flex>
                        
                        <Flex gap="3" mt="2">
                            <Button 
                                size="2" 
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0 || quantity <= 0}
                            >
                                <RocketIcon />
                                加入购物车
                            </Button>
                            
                            {cartQuantity > 0 && (
                                <Text size="2" color="gray" style={{ alignSelf: 'center' }}>
                                    购物车中已有 {cartQuantity} 件
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                        关闭
                    </Button>
                </Dialog.Close>
            </Flex>
        </Box>
    );
};

export default ProductDetail; 