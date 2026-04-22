// Entry point for React application
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../styles/variables.css';
import '../styles/globals.css';
import '../styles/theme.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found. Make sure index.html has an element with id="root"');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);