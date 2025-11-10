import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/auth';

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      await registerApi(values.email, values.firstName, values.lastName, values.password);
      message.success('Регистрация прошла успешно! Теперь вы можете войти.');
      navigate('/login');
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        Object.keys(errorData).forEach(key => {
          if (Array.isArray(errorData[key])) {
            errorData[key].forEach(msg => message.error(msg));
          } else {
            message.error(errorData[key]);
          }
        });
      } else {
        message.error('Ошибка при регистрации. Попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Пожалуйста, введите пароль'));
    }
    if (value.length < 8) {
      return Promise.reject(new Error('Пароль должен содержать минимум 8 символов'));
    }
    if (!/[a-zA-Z]/.test(value)) {
      return Promise.reject(new Error('Пароль должен содержать хотя бы одну букву'));
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject(new Error('Пароль должен содержать хотя бы одну цифру'));
    }
    return Promise.resolve();
  };

  return (
    <div data-easytag="id1-react/src/pages/Register.js" className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md" data-easytag="id2-react/src/pages/Register.js">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} className="text-center" data-easytag="id3-react/src/pages/Register.js">
            Регистрация
          </Title>
          
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            data-easytag="id4-react/src/pages/Register.js"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
              data-easytag="id5-react/src/pages/Register.js"
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="example@mail.com"
                data-easytag="id6-react/src/pages/Register.js"
              />
            </Form.Item>

            <Form.Item
              name="firstName"
              label="Имя"
              rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
              data-easytag="id7-react/src/pages/Register.js"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Иван"
                data-easytag="id8-react/src/pages/Register.js"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Фамилия"
              rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
              data-easytag="id9-react/src/pages/Register.js"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Иванов"
                data-easytag="id10-react/src/pages/Register.js"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[{ validator: validatePassword }]}
              data-easytag="id11-react/src/pages/Register.js"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Минимум 8 символов, буквы и цифры"
                data-easytag="id12-react/src/pages/Register.js"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Подтверждение пароля"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Пожалуйста, подтвердите пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
              data-easytag="id13-react/src/pages/Register.js"
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Повторите пароль"
                data-easytag="id14-react/src/pages/Register.js"
              />
            </Form.Item>

            <Form.Item data-easytag="id15-react/src/pages/Register.js">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
                data-easytag="id16-react/src/pages/Register.js"
              >
                Зарегистрироваться
              </Button>
            </Form.Item>

            <div className="text-center" data-easytag="id17-react/src/pages/Register.js">
              Уже есть аккаунт? <Link to="/login" data-easytag="id18-react/src/pages/Register.js">Войти</Link>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Register;
