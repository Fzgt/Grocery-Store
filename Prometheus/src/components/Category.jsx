import {
    Flex,
    Box,
    Text,
    Heading,
    Card,
    Container,
} from '@radix-ui/themes';

const categories = [
    { id: 1, name: '电子产品', icon: '📱' },
    { id: 2, name: '服装', icon: '👕' },
    { id: 3, name: '家居', icon: '🏠' },
    { id: 4, name: '运动', icon: '⚽' },
    { id: 5, name: '美妆', icon: '💄' }
];

const Category = () => (
    <Box py="8" px="4">
        <Container size="3">
            <Heading size="6" as="h3" mb="5">
                热门分类
            </Heading>
            <Flex gap="4" wrap="wrap" justify="center">
                {categories.map(category => (
                    <Card key={category.id} size="2" style={{ width: '150px', textAlign: 'center' }}>
                        <Flex direction="column" align="center" gap="2" py="2">
                            <Text size="8">{category.icon}</Text>
                            <Text size="2" weight="medium">{category.name}</Text>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Container>
    </Box>
);

export default Category;