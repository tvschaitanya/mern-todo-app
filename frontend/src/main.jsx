import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

// Debug helper
window.localStorage.debug = '*';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);