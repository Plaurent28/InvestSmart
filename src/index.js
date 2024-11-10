import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';  // Nouveau
import { LoadingProvider } from './contexts/LoadingContext';  // Nouveau (optionnel)
import './index.css';
import App from './App';

// Optionnel : Configuration des services externes
import { initializeServices } from './services/initialize';
initializeServices();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <LoadingProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LoadingProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);