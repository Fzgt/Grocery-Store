import { useState } from 'react';
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

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        setQuantity(prev => prev + 1);
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
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
                        <Badge size="1" variant="outline">库存 {product.stock}</Badge>
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