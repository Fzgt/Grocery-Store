import {
    Flex,
    Box,
    Heading,
    Grid,
    Container,
    Link
} from '@radix-ui/themes';
import {
    ChevronRightIcon,
} from '@radix-ui/react-icons';
import ProductCard from './ProductCard.jsx';

const featuredProducts = [
    { id: 1, name: '高级无线耳机', price: '¥1299', rating: 4.8, discount: '15%', image: 'headphones.jpg' },
    { id: 2, name: '智能手表Ultra', price: '¥2499', rating: 4.9, image: 'watch.jpg' },
    { id: 3, name: '时尚手提包', price: '¥899', rating: 4.7, discount: '10%', image: 'bag.jpg' },
    { id: 4, name: '运动鞋专业版', price: '¥799', rating: 4.6, image: 'shoes.jpg' }
];

const Products = () => (
    <Box py="8" px="4">
        <Container size="3">
            <Flex justify="between" align="baseline" mb="5">
                <Heading size="6" as="h3">
                    精选商品
                </Heading>
                <Link size="2">
                    查看全部 <ChevronRightIcon />
                </Link>
            </Flex>

            <Grid columns={{ initial: '1', xs: '2', md: '4' }} gap="4">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Grid>
        </Container>
    </Box>
);

export default Products;