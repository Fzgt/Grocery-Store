import {
    Flex, Box, Text, Heading, TextField, Grid, Container, IconButton, Link, Separator
} from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';

const Footer = () => (
    <Box style={{ backgroundColor: 'var(--gray-2)' }} py="8" px="4">
        <Container size="3">
            <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="6">
                <Flex direction="column" gap="3">
                    <Heading size="4" as="h4">ShopRadix</Heading>
                    <Text size="2">提供最优质的商品和服务</Text>
                    <Flex gap="3" mt="2">
                        <IconButton size="1" variant="ghost">
                            <Box style={{ width: '16px', height: '16px', backgroundColor: 'var(--gray-8)', borderRadius: '50%' }}></Box>
                        </IconButton>
                        <IconButton size="1" variant="ghost">
                            <Box style={{ width: '16px', height: '16px', backgroundColor: 'var(--gray-8)', borderRadius: '50%' }}></Box>
                        </IconButton>
                        <IconButton size="1" variant="ghost">
                            <Box style={{ width: '16px', height: '16px', backgroundColor: 'var(--gray-8)', borderRadius: '50%' }}></Box>
                        </IconButton>
                    </Flex>
                </Flex>

                <Flex direction="column" gap="3">
                    <Heading size="3" as="h4">购物</Heading>
                    <Link size="2">全部商品</Link>
                    <Link size="2">新品上市</Link>
                    <Link size="2">热卖商品</Link>
                    <Link size="2">优惠活动</Link>
                </Flex>

                <Flex direction="column" gap="3">
                    <Heading size="3" as="h4">客户服务</Heading>
                    <Link size="2">联系我们</Link>
                    <Link size="2">配送信息</Link>
                    <Link size="2">退换政策</Link>
                    <Link size="2">常见问题</Link>
                </Flex>

                <Flex direction="column" gap="3">
                    <Heading size="3" as="h4">订阅</Heading>
                    <Text size="2">获取最新优惠和产品信息</Text>
                    <TextField.Root size="2" placeholder="输入您的邮箱">
                        <TextField.Slot side="right">
                            <IconButton size="1" variant="ghost">
                                <ChevronRightIcon />
                            </IconButton>
                        </TextField.Slot>
                    </TextField.Root>
                </Flex>
            </Grid>

            <Separator size="4" my="6" />

            <Flex justify="between" align="center" direction={{ initial: 'column', sm: 'row' }} gap="4">
                <Text size="1">© 2025 ShopRadix. 保留所有权利</Text>
                <Flex gap="4">
                    <Link size="1">隐私政策</Link>
                    <Link size="1">条款与条件</Link>
                    <Link size="1">网站地图</Link>
                </Flex>
            </Flex>
        </Container>
    </Box>
);

export default Footer;