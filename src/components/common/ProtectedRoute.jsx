import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ requireAdmin = false, children }) => {
  const token = localStorage.getItem('medequip_token');
  const userStr = localStorage.getItem('medequip_user');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      console.error('Error parsing user data', e);
    }
  }

  if (requireAdmin) {
    if (!user || user.role !== 'ADMIN') {
      return <Navigate to="/" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
