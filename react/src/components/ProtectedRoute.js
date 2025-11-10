import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spin } from 'antd';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div data-easytag="id1-react/src/components/ProtectedRoute.js" className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" data-easytag="id2-react/src/components/ProtectedRoute.js" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
