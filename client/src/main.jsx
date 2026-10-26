import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';

const root = document.documentElement;
root.dataset.theme = localStorage.getItem('theme') || 'indigo';
root.dataset.mode =
  localStorage.getItem('mode') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
