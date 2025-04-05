import {
    Flex,
    Box,
    Heading,
    TextField,
    Container,
    IconButton,
    Link
} from '@radix-ui/themes';
import {
    MagnifyingGlassIcon,
    RocketIcon,
    PersonIcon,
    HeartIcon,
    HamburgerMenuIcon,
} from '@radix-ui/react-icons';

const Navbar = () => (
    <Box py="3" style={{ borderBottom: '1px solid var(--gray-a4)' }}>
        <Container size="4">
            <Flex justify="between" align="center">
                <Flex align="center" gap="4">
                    <Heading size="5" as="h1">BeyzMarket</Heading>
                    <Flex display={{ initial: 'none', md: 'flex' }} gap="6">
                        <Link size="2">首页</Link>
                        <Link size="2">商品分类</Link>
                        <Link size="2">热卖榜单</Link>
                        <Link size="2">新品上市</Link>
                    </Flex>
                </Flex>

                <Flex align="center" gap="4">
                    <Flex style={{ position: 'relative', width: '240px' }} display={{ initial: 'none', sm: 'flex' }}>
                        <TextField.Root placeholder="搜索商品..." size="2" style={{ width: '100%' }}>
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Flex>

                    <Flex gap="2" align="center">
                        <IconButton size="2" variant="ghost">
                            <HeartIcon />
                        </IconButton>
                        <IconButton size="2" variant="ghost">
                            <RocketIcon />
                        </IconButton>
                        <IconButton size="2" variant="ghost">
                            <PersonIcon />
                        </IconButton>
                        <IconButton size="2" variant="ghost" display={{ md: 'none' }}>
                            <HamburgerMenuIcon />
                        </IconButton>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    </Box>
);

export default Navbar;