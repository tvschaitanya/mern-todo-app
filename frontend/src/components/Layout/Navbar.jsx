import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul>
      {user && (
        <li className="welcome-text">Hello, {user.name}</li>
      )}
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <a href="#!" onClick={onLogout}>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <div className="navbar">
      <h1>
        <span className="logo-icon">✓</span> MERN Todo
      </h1>
      <nav>{isAuthenticated ? authLinks : guestLinks}</nav>
    </div>
  );
};

export default Navbar;