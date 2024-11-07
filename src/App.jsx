import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AccountPage from './components/account/AccountPage';

// Composant qui protège les routes nécessitant une authentification
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<div>Page d'accueil</div>} />
            <Route 
              path="/login" 
              element={
                <AccountPage initialView="login" />
              } 
            />

            {/* Routes protégées */}
            <Route
              path="/compte"
              element={
                <PrivateRoute>
                  <AccountPage initialView="dashboard" />
                </PrivateRoute>
              }
            />
            {/* Ajoutez d'autres routes protégées ici */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;