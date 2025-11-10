import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await loginApi(values.email, values.password);
      login(data.user, data.access, data.refresh);
      message.success('Вход выполнен успешно!');
      navigate('/profile');
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.detail) {
        message.error(errorData.detail);
      } else if (errorData) {
        Object.keys(errorData).forEach(key => {
          if (Array.isArray(errorData[key])) {
            errorData[key].forEach(msg => message.error(msg));
          } else {
            message.error(errorData[key]);
          }
        });
      } else {
        message.error('Ошибка при входе. Попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Login.js" className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md" data-easytag="id2-react/src/pages/Login.js">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} className="text-center" data-easytag="id3-react/src/pages/Login.js">
            Вход
          </Title>
          
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            data-easytag="id4-react/src/pages/Login.js"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
              data-easytag="id5-react/src/pages/Login.js"
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="example@mail.com"
                data-easytag="id6-react/src/pages/Login.js"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
              data-easytag="id7-react/src/pages/Login.js"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Введите пароль"
                data-easytag="id8-react/src/pages/Login.js"
              />
            </Form.Item>

            <Form.Item data-easytag="id9-react/src/pages/Login.js">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
                data-easytag="id10-react/src/pages/Login.js"
              >
                Войти
              </Button>
            </Form.Item>

            <div className="text-center" data-easytag="id11-react/src/pages/Login.js">
              Нет аккаунта? <Link to="/register" data-easytag="id12-react/src/pages/Login.js">Зарегистрироваться</Link>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
