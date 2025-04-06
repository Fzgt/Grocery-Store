import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { notificationsAtom, ordersAtom } from '../store/atoms';
import {
    Box,
    Card,
    Flex,
    Text,
    Heading,
    Button,
    Tabs,
    Badge,
    Avatar,
    Table,
    ScrollArea,
    Separator,
} from '@radix-ui/themes';
import {
    EnvelopeClosedIcon,
    CheckCircledIcon,
    ClockIcon,
    InfoCircledIcon,
    BellIcon,
} from '@radix-ui/react-icons';
import { ErrorBoundary } from 'react-error-boundary';

// ErrorFallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <Box p="4">
            <Card size="2">
                <Flex direction="column" gap="4" p="4" align="center">
                    <Heading size="5" color="red">出错了</Heading>
                    <Text>{error.message}</Text>
                    <Button onClick={resetErrorBoundary}>重试</Button>
                </Flex>
            </Card>
        </Box>
    );
};

const MessagesContent = () => {
    const [notifications, setNotifications] = useAtom(notificationsAtom);
    const [orders] = useAtom(ordersAtom);
    const [activeTab, setActiveTab] = useState('all');
    const params = useParams();
    const navigate = useNavigate();
    const [selectedNotification, setSelectedNotification] = useState(null);

    // 根据类型过滤通知
    const filteredNotifications = activeTab === 'all' 
        ? notifications 
        : notifications.filter(notification => notification.type === activeTab);

    // 将通知标记为已读
    const markAsRead = (id) => {
        setNotifications(prev => prev.map(notification => 
            notification.id === parseInt(id) || notification.id === id
                ? { ...notification, read: true } 
                : notification
        ));
    };

    // 点击查看通知详情
    const handleNotificationClick = (notification) => {
        markAsRead(notification.id);
        setSelectedNotification(notification);
        
        // 更新URL参数
        navigate(`/messages/${notification.id}`);
    };

    // 初始化通知数据 - 只在组件挂载时执行一次
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 仅在组件挂载时执行

    // 如果URL中有通知ID，加载该通知
    useEffect(() => {
        if (params.id && notifications.length > 0) {
            const notificationId = params.id;
            const notification = notifications.find(n => 
                n.id.toString() === notificationId || n.id === parseInt(notificationId)
            );
            
            if (notification) {
                setSelectedNotification(notification);
                // 避免在useEffect中调用可能导致状态更新的函数
                if (!notification.read) {
                    setNotifications(prev => prev.map(item => 
                        item.id === notification.id ? { ...item, read: true } : item
                    ));
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]); // 仅当params.id变化时执行

    return (
        <Box p="4">
            <Card size="2">
                <Flex direction="column" gap="4" p="4">
                    <Heading size="5">消息中心</Heading>
                    
                    <Tabs.Root defaultValue="all" onValueChange={setActiveTab}>
                        <Tabs.List>
                            <Tabs.Trigger value="all">
                                <Flex gap="2" align="center">
                                    <BellIcon />
                                    所有消息
                                    <Badge size="1" variant="soft" color="gray">
                                        {notifications.length}
                                    </Badge>
                                </Flex>
                            </Tabs.Trigger>
                            <Tabs.Trigger value="order">
                                <Flex gap="2" align="center">
                                    <CheckCircledIcon />
                                    订单消息
                                    <Badge size="1" variant="soft" color="gray">
                                        {notifications.filter(n => n.type === 'order').length}
                                    </Badge>
                                </Flex>
                            </Tabs.Trigger>
                            <Tabs.Trigger value="promotion">
                                <Flex gap="2" align="center">
                                    <InfoCircledIcon />
                                    促销消息
                                    <Badge size="1" variant="soft" color="gray">
                                        {notifications.filter(n => n.type === 'promotion').length}
                                    </Badge>
                                </Flex>
                            </Tabs.Trigger>
                        </Tabs.List>
                        
                        <Box pt="3">
                            <Flex direction={{ initial: 'column', sm: 'row' }} gap="4">
                                {/* 消息列表 */}
                                <Card size="1" style={{ flex: '1' }}>
                                    <ScrollArea style={{ height: 'calc(100vh - 280px)', minHeight: '300px' }}>
                                        {filteredNotifications.length > 0 ? (
                                            <Flex direction="column">
                                                {filteredNotifications.map((notification) => (
                                                    <Box 
                                                        key={notification.id}
                                                        style={{ 
                                                            padding: '12px 16px',
                                                            borderBottom: '1px solid var(--gray-a4)',
                                                            backgroundColor: notification.read ? 'transparent' : 'var(--gray-a2)',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => handleNotificationClick(notification)}
                                                    >
                                                        <Flex gap="3" align="start">
                                                            <Box style={{ 
                                                                backgroundColor: notification.type === 'order' ? 'var(--green-5)' : 'var(--blue-5)', 
                                                                borderRadius: '50%',
                                                                width: '32px',
                                                                height: '32px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>
                                                                {notification.type === 'order' 
                                                                    ? <CheckCircledIcon color="white" /> 
                                                                    : <InfoCircledIcon color="white" />
                                                                }
                                                            </Box>
                                                            <Box style={{ flex: '1' }}>
                                                                <Flex justify="between" align="center">
                                                                    <Text weight={notification.read ? 'normal' : 'bold'}>
                                                                        {notification.title}
                                                                    </Text>
                                                                    <Text size="1" color="gray">
                                                                        {notification.time}
                                                                    </Text>
                                                                </Flex>
                                                                <Text size="1" color="gray" as="div" style={{ marginTop: '4px' }}>
                                                                    {notification.content}
                                                                </Text>
                                                            </Box>
                                                        </Flex>
                                                    </Box>
                                                ))}
                                            </Flex>
                                        ) : (
                                            <Flex
                                                direction="column"
                                                align="center"
                                                justify="center"
                                                style={{ height: '100%', padding: '40px 0' }}
                                            >
                                                <EnvelopeClosedIcon width="32" height="32" color="var(--gray-8)" />
                                                <Text size="3" mt="3">暂无消息</Text>
                                            </Flex>
                                        )}
                                    </ScrollArea>
                                </Card>
                                
                                {/* 消息详情 */}
                                <Card size="1" style={{ flex: '1' }}>
                                    {selectedNotification ? (
                                        <Flex direction="column" gap="4" p="4">
                                            <Flex gap="3" align="center">
                                                <Box style={{ 
                                                    backgroundColor: selectedNotification.type === 'order' ? 'var(--green-5)' : 'var(--blue-5)', 
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {selectedNotification.type === 'order' 
                                                        ? <CheckCircledIcon color="white" width="24" height="24" /> 
                                                        : <InfoCircledIcon color="white" width="24" height="24" />
                                                    }
                                                </Box>
                                                <Box>
                                                    <Heading size="3">{selectedNotification.title}</Heading>
                                                    <Flex align="center" gap="2">
                                                        <ClockIcon size="2" color="var(--gray-9)" />
                                                        <Text size="1" color="gray">{selectedNotification.time}</Text>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                            
                                            <Separator size="4" />
                                            
                                            <Text as="p">
                                                {selectedNotification.content}
                                            </Text>
                                            
                                            {/* 如果是订单消息，显示订单详情 */}
                                            {selectedNotification.type === 'order' && (
                                                <>
                                                    <Separator size="4" />
                                                    
                                                    {/* 提取订单号 */}
                                                    {(() => {
                                                        const match = selectedNotification.content.match(/#([A-Za-z0-9-]+)/);
                                                        const orderId = match ? match[1] : null;
                                                        
                                                        if (orderId) {
                                                            const order = orders.find(o => o.id === orderId);
                                                            
                                                            if (order) {
                                                                return (
                                                                    <Box>
                                                                        <Heading size="3" mb="2">订单详情</Heading>
                                                                        
                                                                        <Flex direction="column" gap="2">
                                                                            <Text size="2">
                                                                                <strong>订单号:</strong> {order.id}
                                                                            </Text>
                                                                            <Text size="2">
                                                                                <strong>日期:</strong> {new Date(order.date).toLocaleString()}
                                                                            </Text>
                                                                            <Text size="2">
                                                                                <strong>收货人:</strong> {order.name}
                                                                            </Text>
                                                                            <Text size="2">
                                                                                <strong>地址:</strong> {order.address}
                                                                            </Text>
                                                                            <Text size="2">
                                                                                <strong>电话:</strong> {order.phone}
                                                                            </Text>
                                                                            <Text size="2">
                                                                                <strong>状态:</strong> {order.status}
                                                                            </Text>
                                                                            
                                                                            <Table.Root variant="surface" size="1" style={{ marginTop: '16px' }}>
                                                                                <Table.Header>
                                                                                    <Table.Row>
                                                                                        <Table.ColumnHeaderCell>商品</Table.ColumnHeaderCell>
                                                                                        <Table.ColumnHeaderCell>数量</Table.ColumnHeaderCell>
                                                                                        <Table.ColumnHeaderCell>单价</Table.ColumnHeaderCell>
                                                                                        <Table.ColumnHeaderCell>小计</Table.ColumnHeaderCell>
                                                                                    </Table.Row>
                                                                                </Table.Header>
                                                                                
                                                                                <Table.Body>
                                                                                    {order.items.map(item => (
                                                                                        <Table.Row key={item.id}>
                                                                                            <Table.Cell>
                                                                                                <Flex align="center" gap="2">
                                                                                                    <Text>{item.image}</Text>
                                                                                                    <Text size="1">{item.name}</Text>
                                                                                                </Flex>
                                                                                            </Table.Cell>
                                                                                            <Table.Cell>{item.quantity}</Table.Cell>
                                                                                            <Table.Cell>¥{item.price.toFixed(2)}</Table.Cell>
                                                                                            <Table.Cell>¥{(item.price * item.quantity).toFixed(2)}</Table.Cell>
                                                                                        </Table.Row>
                                                                                    ))}
                                                                                </Table.Body>
                                                                            </Table.Root>
                                                                            
                                                                            <Flex justify="between" mt="3">
                                                                                <Text weight="bold">总计:</Text>
                                                                                <Text weight="bold" size="4" color="crimson">
                                                                                    ¥{order.total.toFixed(2)}
                                                                                </Text>
                                                                            </Flex>
                                                                        </Flex>
                                                                    </Box>
                                                                );
                                                            }
                                                        }
                                                        
                                                        return (
                                                            <Text color="gray">无法显示订单详情</Text>
                                                        );
                                                    })()}
                                                </>
                                            )}
                                        </Flex>
                                    ) : (
                                        <Flex
                                            direction="column"
                                            align="center"
                                            justify="center"
                                            style={{ height: '100%', padding: '40px 0' }}
                                        >
                                            <InfoCircledIcon width="32" height="32" color="var(--gray-8)" />
                                            <Text size="3" mt="3">选择消息以查看详情</Text>
                                        </Flex>
                                    )}
                                </Card>
                            </Flex>
                        </Box>
                    </Tabs.Root>
                </Flex>
            </Card>
        </Box>
    );
};

// Wrap component with ErrorBoundary
const Messages = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MessagesContent />
        </ErrorBoundary>
    );
};

export default Messages; 