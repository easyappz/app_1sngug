import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Space, Spin } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { getProfile, updateProfile } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      form.setFieldsValue({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      });
      updateUser(data);
    } catch (error) {
      message.error('Ошибка при загрузке профиля');
    } finally {
      setInitialLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await updateProfile(values);
      updateUser(data);
      message.success('Профиль успешно обновлен');
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
        message.error('Ошибка при обновлении профиля');
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div data-easytag="id1-react/src/pages/Profile.js" className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" data-easytag="id2-react/src/pages/Profile.js" />
      </div>
    );
  }

  return (
    <div data-easytag="id3-react/src/pages/Profile.js" className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md" data-easytag="id4-react/src/pages/Profile.js">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} className="text-center" data-easytag="id5-react/src/pages/Profile.js">
            Профиль
          </Title>
          
          <Form
            form={form}
            name="profile"
            onFinish={onFinish}
            layout="vertical"
            data-easytag="id6-react/src/pages/Profile.js"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
              data-easytag="id7-react/src/pages/Profile.js"
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="example@mail.com"
                data-easytag="id8-react/src/pages/Profile.js"
              />
            </Form.Item>

            <Form.Item
              name="first_name"
              label="Имя"
              rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
              data-easytag="id9-react/src/pages/Profile.js"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Иван"
                data-easytag="id10-react/src/pages/Profile.js"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Фамилия"
              rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
              data-easytag="id11-react/src/pages/Profile.js"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Иванов"
                data-easytag="id12-react/src/pages/Profile.js"
              />
            </Form.Item>

            <Form.Item data-easytag="id13-react/src/pages/Profile.js">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
                data-easytag="id14-react/src/pages/Profile.js"
              >
                Сохранить изменения
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
