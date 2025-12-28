import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          // Clear corrupted data
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      // Always set loading to false
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user: userData } = response.data.data;
      
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      let message = 'Login failed';
      
      // Handle network errors
      if (error.message === 'Network Error' || error.code === 'NETWORK_ERROR') {
        message = 'Cannot connect to server. Check your internet connection and make sure the backend is running.';
      } else if (error.response?.data) {
        // Handle validation errors
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          message = error.response.data.errors.join(', ');
        } else if (error.response.data.message) {
          message = error.response.data.message;
        }
      } else if (error.message) {
        message = error.message;
      }
      
      console.error('Login error:', error);
      return { success: false, error: message };
    }
  };

  const register = async (username, email, password, securityQuestion, securityAnswer) => {
    try {
      const response = await authAPI.register({ 
        username, 
        email, 
        password, 
        securityQuestion, 
        securityAnswer 
      });
      const { token, user: userData } = response.data.data;
      
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      let message = 'Registration failed';
      if (error.response?.data) {
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          message = error.response.data.errors.join(', ');
        } else if (error.response.data.message) {
          message = error.response.data.message;
        }
      }
      return { success: false, error: message };
    }
  };

  const forgotPassword = async (email, securityAnswer) => {
    try {
      const response = await authAPI.forgotPassword({ email, securityAnswer });
      return { success: true, data: response.data.data };
    } catch (error) {
      let message = 'Failed to generate reset link';
      
      // Handle network errors
      if (error.message === 'Network Error' || error.code === 'NETWORK_ERROR') {
        message = 'Cannot connect to server. Check your internet connection and make sure the backend is running.';
      } else if (error.response?.data) {
        // Handle validation errors
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          message = error.response.data.errors.join(', ');
        } else if (error.response.data.message) {
          message = error.response.data.message;
        }
      } else if (error.message) {
        message = error.message;
      }
      
      console.error('Forgot password error:', error);
      return { success: false, error: message };
    }
  };

  const resetPassword = async (token, password, confirmPassword) => {
    try {
      await authAPI.resetPassword({ token, password, confirmPassword });
      return { success: true };
    } catch (error) {
      let message = 'Failed to reset password';
      if (error.response?.data) {
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          message = error.response.data.errors.join(', ');
        } else if (error.response.data.message) {
          message = error.response.data.message;
        }
      }
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, forgotPassword, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

