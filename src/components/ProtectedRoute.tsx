import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactElement | null;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  const location = useLocation();

  if (isLoggedIn) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
