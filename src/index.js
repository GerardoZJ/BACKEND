import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/now-ui-dashboard.scss?v1.5.0';
import 'assets/css/demo.css';

import Admin from './layouts/Admin';
import LoginRegister from './components/Login';
import UserPage from './views/UserPage';
import PublicRoute from './components/PublicRoute';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginRegister />
          </PublicRoute>
        } />
        <Route path="/admin/*" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
