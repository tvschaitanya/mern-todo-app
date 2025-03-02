// src/context/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios to include credentials with every request
  axios.defaults.withCredentials = true;

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to login with:', formData.email);
      const res = await axios.post('/api/user/login', formData);
      console.log('Login response:', res.data);
      
      // Set authenticated without trying to load profile
      setIsAuthenticated(true);
      // Set a default user object if profile loading fails
      setUser({ name: formData.email.split('@')[0] }); 
      
      // Store authentication state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ name: formData.email.split('@')[0] }));
      
      toast.success('Login successful!');
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setUser(null);
      setIsAuthenticated(false);
      setError(err.response?.data?.error || 'Login failed');
      
      // Clear localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      
      toast.error(err.response?.data?.error || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/api/user/register', formData);
      console.log('Register response:', res.data);
      
      // Login after registration
      return await login({
        email: formData.email,
        password: formData.password
      });
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Registration failed');
      setUser(null);
      setIsAuthenticated(false);
      
      toast.error(err.response?.data?.error || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post('/api/user/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    // Clear user data from state and localStorage
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    toast.info('You have been logged out');
  };

  // Clear errors
  const clearErrors = () => {
    setError(null);
  };

  // Check if the user is authenticated on page load/refresh
  useEffect(() => {
    const checkAuth = async () => {
      // First check localStorage for authentication state
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedUser = localStorage.getItem('user');
      
      if (storedAuth === 'true' && storedUser) {
        try {
          // Try to verify if the cookie is still valid using a simple endpoint
          await axios.get('/api/test');
          
          // If request succeeds, set authenticated state
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
        } catch (err) {
          // If request fails, clear localStorage and state
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        error,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;