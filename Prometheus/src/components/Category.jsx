// Category.jsx
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, categoryAtom } from '../store/atoms';
import { Box, Flex, Button, Text, Heading, Card, Badge } from '@radix-ui/themes';
import { MagnifyingGlassIcon, ChevronRightIcon } from '@radix-ui/react-icons';

// 模拟分类数据
const categories = [
    { id: 'fruits', name: '新鲜水果', icon: '🍎', color: 'green' },
    { id: 'vegetables', name: '时令蔬菜', icon: '🥦', color: 'lime' },
    { id: 'dairy', name: '奶制品', icon: '🧀', color: 'amber' },
    { id: 'bakery', name: '烘焙面包', icon: '🍞', color: 'orange' },
    { id: 'meat', name: '肉类', icon: '🥩', color: 'red' },
    { id: 'drinks', name: '饮料', icon: '🥤', color: 'blue' },
];

// 模拟API请求函数
const fetchProductsByCategory = async (categoryId) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300));

    // 根据分类返回不同的产品
    const productsByCategory = {
        fruits: [
            { id: 1, name: '新西兰苹果', price: 12.9, unit: '500g', image: '🍎', discount: '8.5折', stock: 35 },
            { id: 2, name: '泰国香蕉', price: 6.5, unit: '称重', image: '🍌', hot: true, stock: 42 },
            { id: 3, name: '红心火龙果', price: 15.8, unit: '个', image: '🐉', discount: '满2减5', stock: 18 },
            { id: 4, name: '蓝莓', price: 28.9, unit: '盒', image: '🫐', organic: true, stock: 15 }
        ],
        vegetables: [
            { id: 5, name: '有机西兰花', price: 8.8, unit: '250g', image: '🥦', organic: true, stock: 28 },
            { id: 6, name: '胡萝卜', price: 3.5, unit: '500g', image: '🥕', discount: '第2件半价', stock: 56 },
            { id: 7, name: '小番茄', price: 9.9, unit: '盒', image: '🍅', hot: true, stock: 32 },
            { id: 8, name: '黄瓜', price: 4.8, unit: '根', image: '🥒', stock: 47 }
        ],
        dairy: [
            { id: 9, name: '原味酸奶', price: 13.8, unit: '500ml', image: '🥛', hot: true, stock: 22 },
            { id: 10, name: '切达奶酪', price: 25.9, unit: '200g', image: '🧀', imported: true, stock: 15 },
            { id: 11, name: '有机纯牛奶', price: 19.8, unit: '1L', image: '🥛', organic: true, stock: 38 },
            { id: 12, name: '黄油', price: 18.5, unit: '100g', image: '🧈', imported: true, stock: 12 }
        ],
        bakery: [
            { id: 13, name: '全麦面包', price: 12.8, unit: '个', image: '🍞', fresh: true, stock: 18 },
            { id: 14, name: '法式羊角面包', price: 8.9, unit: '个', image: '🥐', fresh: true, stock: 25 },
            { id: 15, name: '巧克力甜甜圈', price: 6.5, unit: '个', image: '🍩', discount: '买3送1', stock: 30 },
            { id: 16, name: '芝士蛋糕', price: 32.8, unit: '6寸', image: '🍰', hot: true, stock: 8 }
        ],
        meat: [
            { id: 17, name: '精选牛排', price: 58.8, unit: '300g', image: '🥩', premium: true, stock: 10 },
            { id: 18, name: '新鲜鸡胸肉', price: 13.9, unit: '500g', image: '🍗', stock: 45 },
            { id: 19, name: '有机猪肉', price: 29.9, unit: '500g', image: '🐖', organic: true, stock: 16 },
            { id: 20, name: '三文鱼片', price: 48.8, unit: '300g', image: '🐟', imported: true, stock: 12 }
        ],
        drinks: [
            { id: 21, name: '矿泉水', price: 2.5, unit: '550ml', image: '💧', stock: 120 },
            { id: 22, name: '橙汁', price: 9.9, unit: '1L', image: '🍊', stock: 35 },
            { id: 23, name: '冰咖啡', price: 13.8, unit: '500ml', image: '☕', hot: true, stock: 28 },
            { id: 24, name: '气泡水', price: 6.5, unit: '330ml', image: '🫧', imported: true, stock: 42 }
        ]
    };

    return productsByCategory[categoryId] || [];
};

const Category = () => {
    const [, setProducts] = useAtom(productsAtom);
    const [activeCategory, setActiveCategory] = useAtom(categoryAtom);

    const handleCategoryClick = async (categoryId) => {
        setActiveCategory(categoryId);
        const products = await fetchProductsByCategory(categoryId);
        setProducts(products);
    };

    useEffect(() => {
        // 初始化时加载第一个分类的产品
        handleCategoryClick(categories[0].id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card size="2" style={{ height: '100%', overflow: 'hidden' }}>
            <Flex direction="column" gap="4" p="4">
                <Heading size="4" as="h2">商品分类</Heading>

                <Flex direction="column" gap="2">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={activeCategory === category.id ? "solid" : "outline"}
                            color={category.color}
                            style={{
                                justifyContent: 'flex-start',
                                padding: '12px 16px',
                                transition: 'all 0.2s ease'
                            }}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <Flex align="center" gap="3" style={{ width: '100%' }}>
                                <Text size="4">{category.icon}</Text>
                                <Text size="2" style={{ flex: 1 }}>{category.name}</Text>
                                <ChevronRightIcon style={{
                                    opacity: activeCategory === category.id ? 1 : 0.5,
                                    transform: activeCategory === category.id ? 'translateX(2px)' : 'none',
                                    transition: 'all 0.2s ease'
                                }} />
                            </Flex>
                        </Button>
                    ))}
                </Flex>

                <Box mt="auto">
                    <Badge size="1" variant="outline" color="gray" radius="full" style={{ width: '100%' }}>
                        <Text align='center' as='div' style={{ width: '100%' }}>
                            {categories.length} categories
                        </Text>
                    </Badge>
                </Box>
            </Flex>
        </Card>
    );
};

export default Category;