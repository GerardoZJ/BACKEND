import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error('Error parsing stored user data:', e);
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = async (correo, contrasena) => {
    try {
      const response = await axios.post('https://backend-4uac.onrender.com/login', { correo, contrasena });
      if (response.data.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        navigate('/admin/dashboard');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (user) => {
    try {
      const response = await axios.post('https://backend-4uac.onrender.com/register', user);
      if (response.data.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        navigate('/admin/dashboard');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
