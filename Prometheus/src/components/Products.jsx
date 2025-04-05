// Products.jsx
import { useState } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom } from '../store/atoms';
import {
    Card,
    Flex,
    Heading,
    Badge,
    Grid,
} from '@radix-ui/themes';
import ProductCard from './ProductCard';



const Products = () => {
    const [products] = useAtom(productsAtom);
    const [searchTerm, setSearchTerm] = useState('');

    // 搜索过滤
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card size="2" style={{ height: '100%', overflow: 'auto' }}>
            <Flex direction="column" gap="4" p="4">
                <Flex justify="between" align="center">
                    <Heading size="4" as="h2">Products List</Heading>
                    <Badge variant="soft" color="gray">{filteredProducts.length} 件商品</Badge>
                </Flex>

                {filteredProducts.length > 0 && (
                    <Grid columns={{ initial: '1', xs: '2', sm: '3' }} gap="4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Grid>
                )}

            </Flex>
        </Card>
    );
};

export default Products;