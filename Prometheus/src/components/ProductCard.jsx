import {
    Flex,
    Box,
    Card,
    Badge,
    Button,
    Text
} from '@radix-ui/themes';

import { StarFilledIcon } from '@radix-ui/react-icons';

const ProductCard = ({ product }) => (
    <Card size="2" style={{ overflow: 'hidden' }}>
        <Box css={{ position: 'relative' }}>
            {product.discount && (
                <Badge size="1" color="crimson" variant="solid" style={{ position: 'absolute', top: '8px', right: '8px' }}>
                    {product.discount} OFF
                </Badge>
            )}
            <Box style={{ height: '200px', backgroundColor: 'var(--gray-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text size="6">{product.image.split('.')[0][0].toUpperCase()}</Text>
            </Box>
        </Box>
        <Box p="3">
            <Flex direction="column" gap="1">
                <Text size="2" weight="bold">{product.name}</Text>
                <Flex justify="between" align="center">
                    <Text size="4" weight="bold">{product.price}</Text>
                    <Flex align="center" gap="1">
                        <StarFilledIcon width="14" height="14" color="var(--amber-9)" />
                        <Text size="1">{product.rating}</Text>
                    </Flex>
                </Flex>
                <Button size="2" mt="2" color="indigo">
                    加入购物车
                </Button>
            </Flex>
        </Box>
    </Card>
);

export default ProductCard;