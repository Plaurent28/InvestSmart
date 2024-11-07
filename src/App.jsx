import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AccountPage from './components/account/AccountPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<div>Page d'accueil</div>} />
            <Route 
              path="/login" 
              element={<AccountPage initialView="login" />}
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
            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

// Composant qui protège les routes nécessitant une authentification
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default App;