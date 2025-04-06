import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom, notificationsAtom } from '../store/atoms';

// Radix UI components
import * as Tabs from '@radix-ui/react-tabs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, setUser] = useAtom(userAtom);
  const [, setNotifications] = useAtom(notificationsAtom);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('login');
  const navigate = useNavigate();

  // 处理登录
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      // 简单验证
      if (!email || !password) {
        setError('请填写完整信息');
        setLoading(false);
        return;
      }

      // 模拟登录成功
      const userData = {
        id: 1,
        name: email.split('@')[0],
        email,
        avatar: '👤'
      };

      // 更新用户状态
      setUser(userData);

      // 添加登录成功通知
      setNotifications(prev => [{
        id: Date.now(),
        title: '登录成功',
        content: `欢迎回来，${userData.name}！`,
        time: '刚刚',
        read: false,
        type: 'system'
      }, ...prev]);

      // 跳转到首页
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  // 处理注册
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟注册请求
    setTimeout(() => {
      // 简单验证
      if (!name || !email || !password || !confirmPassword) {
        setError('请填写完整信息');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('两次密码不一致');
        setLoading(false);
        return;
      }

      // 模拟注册成功
      const userData = {
        id: Date.now(),
        name,
        email,
        avatar: '👤'
      };

      // 更新用户状态
      setUser(userData);

      // 添加注册成功通知
      setNotifications(prev => [{
        id: Date.now(),
        title: '注册成功',
        content: `欢迎加入，${name}！`,
        time: '刚刚',
        read: false,
        type: 'system'
      }, ...prev]);

      // 跳转到首页
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#121212',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%',
        backgroundColor: '#1a1a1a',
        color: 'white',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <Tabs.Root 
          defaultValue="login" 
          value={tabValue}
          onValueChange={value => {
            setTabValue(value);
            setError('');
          }}
        >
          <Tabs.List style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Tabs.Trigger 
              value="login"
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                color: tabValue === 'login' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '12px',
                border: 'none',
                cursor: 'pointer',
                borderBottom: tabValue === 'login' ? '2px solid #e91e63' : 'none',
                transition: 'color 0.2s'
              }}
            >
              <span style={{ marginRight: '8px' }}>🔒</span> 登录
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="register"
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                color: tabValue === 'register' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '12px',
                border: 'none',
                cursor: 'pointer',
                borderBottom: tabValue === 'register' ? '2px solid #e91e63' : 'none',
                transition: 'color 0.2s'
              }}
            >
              <span style={{ marginRight: '8px' }}>👤</span> 注册
            </Tabs.Trigger>
          </Tabs.List>

          {/* 登录面板 */}
          <Tabs.Content value="login" style={{ padding: '24px' }}>
            <h2 style={{ 
              fontSize: '20px', 
              textAlign: 'center', 
              marginBottom: '20px',
              fontWeight: 'normal'
            }}>
              用户登录
            </h2>

            {error && (
              <div style={{ 
                backgroundColor: 'rgba(211, 47, 47, 0.1)', 
                color: '#f44336',
                padding: '10px 16px',
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  邮箱
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    ✉️
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label 
                  htmlFor="password" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  密码
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    🔐
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#e91e63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  marginTop: '16px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {loading ? '登录中...' : '登录'}
              </button>

              <div style={{ 
                marginTop: '16px', 
                textAlign: 'center', 
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)' 
              }}>
                没有账号? {' '}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setTabValue('register');
                    setError('');
                  }}
                  style={{
                    color: '#e91e63',
                    textDecoration: 'none'
                  }}
                >
                  注册新账号
                </a>
              </div>
            </form>
          </Tabs.Content>

          {/* 注册面板 */}
          <Tabs.Content value="register" style={{ padding: '24px' }}>
            <h2 style={{ 
              fontSize: '20px', 
              textAlign: 'center', 
              marginBottom: '20px',
              fontWeight: 'normal'
            }}>
              用户注册
            </h2>

            {error && (
              <div style={{ 
                backgroundColor: 'rgba(211, 47, 47, 0.1)', 
                color: '#f44336',
                padding: '10px 16px',
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '16px' }}>
                <label 
                  htmlFor="name" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  用户名
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    👤
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label 
                  htmlFor="reg-email" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  邮箱
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    ✉️
                  </div>
                  <input
                    type="email"
                    id="reg-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label 
                  htmlFor="reg-password" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  密码
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    🔐
                  </div>
                  <input
                    type="password"
                    id="reg-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label 
                  htmlFor="confirmPassword" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px'
                  }}
                >
                  确认密码
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                    🔐
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#e91e63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  marginTop: '16px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {loading ? '注册中...' : '注册账号'}
              </button>

              <div style={{ 
                marginTop: '16px', 
                textAlign: 'center', 
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)' 
              }}>
                已有账号? {' '}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setTabValue('login');
                    setError('');
                  }}
                  style={{
                    color: '#e91e63',
                    textDecoration: 'none'
                  }}
                >
                  返回登录
                </a>
              </div>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Login; 