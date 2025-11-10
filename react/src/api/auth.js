import { instance } from './axios';

export const register = async (email, firstName, lastName, password) => {
  const response = await instance.post('/api/auth/register/', {
    email,
    first_name: firstName,
    last_name: lastName,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await instance.post('/api/auth/login/', {
    email,
    password,
  });
  return response.data;
};

export const logout = async (refreshToken) => {
  const response = await instance.post('/api/auth/logout/', {
    refresh: refreshToken,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await instance.get('/api/auth/profile/');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await instance.put('/api/auth/profile/', {
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
  });
  return response.data;
};
