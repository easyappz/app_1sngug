import React from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <div data-easytag="id1-react/src/pages/Home.js" className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl" data-easytag="id2-react/src/pages/Home.js">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} data-easytag="id3-react/src/pages/Home.js">Главная страница</Title>
          
          {isAuthenticated ? (
            <div data-easytag="id4-react/src/pages/Home.js">
              <Paragraph data-easytag="id5-react/src/pages/Home.js">
                Добро пожаловать, {user?.first_name} {user?.last_name}!
              </Paragraph>
              <Paragraph data-easytag="id6-react/src/pages/Home.js">
                Email: {user?.email}
              </Paragraph>
              <Button 
                type="primary" 
                onClick={() => navigate('/profile')}
                data-easytag="id7-react/src/pages/Home.js"
              >
                Перейти в профиль
              </Button>
            </div>
          ) : (
            <div data-easytag="id8-react/src/pages/Home.js">
              <Paragraph data-easytag="id9-react/src/pages/Home.js">
                Добро пожаловать! Пожалуйста, войдите или зарегистрируйтесь.
              </Paragraph>
              <Space data-easytag="id10-react/src/pages/Home.js">
                <Button 
                  type="primary" 
                  onClick={() => navigate('/login')}
                  data-easytag="id11-react/src/pages/Home.js"
                >
                  Войти
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  data-easytag="id12-react/src/pages/Home.js"
                >
                  Регистрация
                </Button>
              </Space>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default Home;
