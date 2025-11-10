import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout as logoutApi } from '../api/auth';
import { message } from 'antd';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, refreshToken } = useAuth();

  useEffect(() => {
    const routes = ['/', '/register', '/login', '/profile'];
    if (window.handleRoutes) {
      window.handleRoutes(routes);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi(refreshToken);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      message.success('Вы успешно вышли из системы');
      navigate('/login');
    }
  };

  const menuItems = isAuthenticated
    ? [
        {
          key: '/',
          icon: <HomeOutlined data-easytag="id1-react/src/components/AppLayout.js" />,
          label: 'Главная',
          onClick: () => navigate('/'),
        },
        {
          key: '/profile',
          icon: <UserOutlined data-easytag="id2-react/src/components/AppLayout.js" />,
          label: 'Профиль',
          onClick: () => navigate('/profile'),
        },
        {
          key: 'logout',
          icon: <LogoutOutlined data-easytag="id3-react/src/components/AppLayout.js" />,
          label: 'Выход',
          onClick: handleLogout,
        },
      ]
    : [
        {
          key: '/',
          icon: <HomeOutlined data-easytag="id4-react/src/components/AppLayout.js" />,
          label: 'Главная',
          onClick: () => navigate('/'),
        },
        {
          key: '/login',
          icon: <LoginOutlined data-easytag="id5-react/src/components/AppLayout.js" />,
          label: 'Вход',
          onClick: () => navigate('/login'),
        },
        {
          key: '/register',
          icon: <UserAddOutlined data-easytag="id6-react/src/components/AppLayout.js" />,
          label: 'Регистрация',
          onClick: () => navigate('/register'),
        },
      ];

  const selectedKey = location.pathname;

  return (
    <Layout data-easytag="id7-react/src/components/AppLayout.js" className="min-h-screen">
      <Header data-easytag="id8-react/src/components/AppLayout.js" className="bg-white shadow-md">
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          data-easytag="id9-react/src/components/AppLayout.js"
          className="border-0"
        />
      </Header>
      <Content data-easytag="id10-react/src/components/AppLayout.js">
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
