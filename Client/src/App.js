import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import ProtectedRoute from './ProtectedRoute';

import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const LandingPage = React.lazy(() => import('./Landing/components/Home/Home'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Pages
const AdminLogin = React.lazy(() => import('./views/pages/Admin/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

// Frontend
const Filter = React.lazy(() => import('./Landing/components/FilterScreen/Filter'));
const InstitueDetails = React.lazy(() => import('./Landing/components/ProductDetail/ProductDetail'));


const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/" element={<LandingPage />} />
          {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/admin" element={<DefaultLayout />} />
          {/* Redirect paths starting with "/admin/" to "/admin" */}
          <Route path="/admin/*" element={<DefaultLayout />} />
          {/* Catch-all redirect for any other unmatched paths */}
          <Route path="/educational-institutes" element={<Filter />} />
          <Route path="/educational-institutes-details/:continent/:instituteId" element={<InstitueDetails />} />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
