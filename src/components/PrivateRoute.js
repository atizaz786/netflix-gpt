import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
