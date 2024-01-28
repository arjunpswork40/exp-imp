import React, { useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthService from '../services/Admin/Auth/AuthServices';
// import jwt from 'jsonwebtoken';

const DefaultLayout = () => {
  const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname === '/admin/';
  const accessToken = AuthService.getAccessToken();
  const tokenStatus = AuthService.getTokenStatus();
  const navigate = useNavigate();
  console.log('tokenStatus=>',tokenStatus);
  // useEffect(() => {
  //   // Check if the access token is present and not expired
  //   if (!tokenStatus) {

  //     // Token not found, redirect to login
  //     navigate('/admin/login', { replace: true });
  //   }
  // }, [tokenStatus, navigate]);

  return (
    <div>
      {
        isAdminRoute ? (
          <Navigate to="/admin/login" replace />
        ) : (
          <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
              <AppHeader />
              <div className="body flex-grow-1">
                <AppContent />
              </div>
              <AppFooter />
            </div>
          </>
        )
      }
    </div>
  );
}

export default DefaultLayout;
