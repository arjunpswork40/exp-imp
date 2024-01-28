// Import necessary dependencies and components
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from './services/Admin/Auth/AuthServices';
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the access token is still valid
        await AuthService.refreshAccessToken(localStorage.getItem('refreshToken'));
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Route
      {...rest}
      element={(props) => (
        isAuthenticated ? <Element {...props} /> : <Navigate to="/login" />
      )}
    />
  );
};

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
