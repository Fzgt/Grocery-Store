import {
    Flex,
    Box,
    Heading,
    TextField,
    Container,
    IconButton,
    Link,
    Badge,
    DropdownMenu,
    Text,
    Avatar,
} from '@radix-ui/themes';
import {
    MagnifyingGlassIcon,
    ChatBubbleIcon,
    PersonIcon,
    BackpackIcon,
} from '@radix-ui/react-icons';
import { useAtom } from 'jotai';
import { searchTermAtom, cartItemCountAtom, unreadNotificationsCountAtom, notificationsAtom, userAtom } from '../store/atoms';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [cartItemCount] = useAtom(cartItemCountAtom);
    const [unreadCount] = useAtom(unreadNotificationsCountAtom);
    const [notifications, setNotifications] = useAtom(notificationsAtom);
    const [user] = useAtom(userAtom);

    // 处理搜索
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // 阅读所有通知
    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({
            ...notification,
            read: true
        })));
    };

    // 阅读单个通知
    const markAsRead = (id) => {
        setNotifications(notifications.map(notification => 
            notification.id === id 
                ? { ...notification, read: true } 
                : notification
        ));
    };

    // 模拟获取通知数据
    useEffect(() => {
        if (notifications.length === 0) {
            // 添加初始测试通知
            setNotifications([
                {
                    id: 1,
                    title: '订单确认',
                    content: '您的订单 #12345 已确认，正在准备发货',
                    time: '10 分钟前',
                    read: false,
                    type: 'order'
                },
                {
                    id: 2,
                    title: '特惠活动',
                    content: '全场水果 8 折优惠，限时抢购！',
                    time: '1 小时前',
                    read: false,
                    type: 'promotion'
                }
            ]);
        }
    }, [notifications.length, setNotifications]);

    return (
        <Box py="3" style={{ borderBottom: '1px solid var(--gray-a4)', backgroundColor: 'var(--gray-2)' }}>
            <Container size="4">
                <Flex justify="between" align="center">
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Flex align="center" gap="2">
                            <img src="/beyz.png" alt="BeyzMarket Logo" style={{ height: '24px', width: 'auto' }} />
                            <Heading size="5" as="h1">BeyzMarket</Heading>
                        </Flex>
                    </Link>

                    <Flex align="center" gap="4">
                        <Flex style={{ position: 'relative', width: '240px' }} display={{ initial: 'none', sm: 'flex' }}>
                            <TextField.Root 
                                placeholder="搜索商品..." 
                                size="2" 
                                style={{ width: '100%' }}
                                value={searchTerm}
                                onChange={handleSearch}
                            >
                                <TextField.Slot>
                                    <MagnifyingGlassIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        </Flex>

                        <Flex gap="2" align="center">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Box style={{ position: 'relative' }}>
                                        <Link href="#" style={{ display: 'block' }}>
                                            <IconButton size="2" variant="ghost">
                                                <ChatBubbleIcon />
                                            </IconButton>
                                        </Link>
                                        {unreadCount > 0 && (
                                            <Badge 
                                                color="red" 
                                                variant="solid" 
                                                radius="full"
                                                style={{
                                                    position: 'absolute',
                                                    top: '-4px',
                                                    right: '-4px',
                                                    fontSize: '10px',
                                                    minWidth: '16px',
                                                    height: '16px',
                                                    padding: '0 4px'
                                                }}
                                            >
                                                {unreadCount}
                                            </Badge>
                                        )}
                                    </Box>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>消息通知</DropdownMenu.Label>
                                    
                                    {notifications.length > 0 ? (
                                        <>
                                            {notifications.map(notification => (
                                                <Link href={`/messages/${notification.id}`} key={notification.id}>
                                                    <DropdownMenu.Item 
                                                        onClick={() => markAsRead(notification.id)}
                                                        style={{ 
                                                            backgroundColor: notification.read ? 'transparent' : 'var(--accent-a3)',
                                                            fontWeight: notification.read ? 'normal' : 'bold' 
                                                        }}
                                                    >
                                                        <Flex gap="3" align="start">
                                                            <Box>
                                                                <Text size="2" weight="bold">{notification.title}</Text>
                                                                <Text size="1" color="gray">{notification.content}</Text>
                                                                <Text size="1" color="gray">{notification.time}</Text>
                                                            </Box>
                                                        </Flex>
                                                    </DropdownMenu.Item>
                                                </Link>
                                            ))}
                                            <DropdownMenu.Separator />
                                            <DropdownMenu.Item onClick={markAllAsRead}>
                                                标记所有为已读
                                            </DropdownMenu.Item>
                                        </>
                                    ) : (
                                        <DropdownMenu.Item disabled>
                                            暂无新消息
                                        </DropdownMenu.Item>
                                    )}
                                    
                                    <DropdownMenu.Separator />
                                    <Link href="/messages">
                                        <DropdownMenu.Item>
                                            查看所有消息
                                        </DropdownMenu.Item>
                                    </Link>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            
                            <Link href="/login">
                                <Box style={{ position: 'relative' }}>
                                    <IconButton size="2" variant="ghost">
                                        <PersonIcon />
                                    </IconButton>
                                    {user && (
                                        <Badge
                                            color="green"
                                            variant="solid"
                                            radius="full"
                                            style={{
                                                position: 'absolute',
                                                top: '-4px',
                                                right: '-4px',
                                                width: '10px',
                                                height: '10px',
                                                padding: 0
                                            }}
                                        />
                                    )}
                                </Box>
                            </Link>
                            
                            <Link href="/cart">
                                <Box style={{ position: 'relative' }}>
                                    <IconButton size="2" variant="ghost">
                                        <BackpackIcon />
                                    </IconButton>
                                    {cartItemCount > 0 && (
                                        <Badge 
                                            color="green" 
                                            variant="solid" 
                                            radius="full"
                                            style={{
                                                position: 'absolute',
                                                top: '-4px',
                                                right: '-4px',
                                                fontSize: '10px',
                                                minWidth: '16px',
                                                height: '16px',
                                                padding: '0 4px'
                                            }}
                                        >
                                            {cartItemCount}
                                        </Badge>
                                    )}
                                </Box>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;