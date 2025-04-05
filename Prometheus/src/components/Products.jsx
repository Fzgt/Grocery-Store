// Products.jsx
import { useState } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom } from '../atoms';
import {
    Card,
    Flex,
    Text,
    Heading,
    Badge,
    Grid,
    Button,
    Box,
    TextField
} from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import ProductCard from './ProductCard';



const Products = () => {
    const [products] = useAtom(productsAtom);
    const [activeCategory] = useAtom(categoryAtom);
    const [searchTerm, setSearchTerm] = useState('');

    // 搜索过滤
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 获取当前类别名称
    const getCategoryName = () => {
        const categories = {
            'fruits': '新鲜水果',
            'vegetables': '时令蔬菜',
            'dairy': '奶制品',
            'bakery': '烘焙面包',
            'meat': '肉类',
            'drinks': '饮料'
        };

        return categories[activeCategory] || '所有商品';
    };

    return (
        <Card size="2" style={{ height: '100%', overflow: 'auto' }}>
            <Flex direction="column" gap="4" p="4">
                <Flex justify="between" align="center">
                    <Heading size="4" as="h2">{getCategoryName()}</Heading>
                    <Badge variant="soft" color="gray">{filteredProducts.length} 件商品</Badge>
                </Flex>

                {/* 搜索框 */}
                <Box mb="2">
                    <TextField.Root placeholder="搜索商品..." size="2" style={{ width: '100%' }}>
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                        {/* <TextField.Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        /> */}
                        {searchTerm && (
                            <TextField.Slot>
                                <Button
                                    size="1"
                                    variant="ghost"
                                    color="gray"
                                    onClick={() => setSearchTerm('')}
                                >
                                    清除
                                </Button>
                            </TextField.Slot>
                        )}
                    </TextField.Root>
                </Box>

                {/* 商品网格 */}
                {filteredProducts.length > 0 ? (
                    <Grid columns={{ initial: '1', xs: '2', sm: '3' }} gap="4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Grid>
                ) : (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap="2"
                        style={{ minHeight: '300px', color: 'var(--gray-8)' }}
                    >
                        <MagnifyingGlassIcon width={32} height={32} />
                        <Text size="2">没有找到匹配的商品</Text>
                        {searchTerm && (
                            <Button
                                size="1"
                                variant="soft"
                                mt="2"
                                onClick={() => setSearchTerm('')}
                            >
                                清除搜索
                            </Button>
                        )}
                    </Flex>
                )}
            </Flex>
        </Card>
    );
};

export default Products;