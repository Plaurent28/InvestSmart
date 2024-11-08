import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import AccountDashboard from './AccountDashboard';
import Alert from '../ui/alert';

const AccountPage = ({ initialView = 'login' }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    // Ici, vous feriez normalement un appel API pour vérifier les identifiants
    login({ email, name: 'John Doe' });
    navigate('/compte');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleForgotPassword = (email) => {
    setResetEmailSent(true);
    // Ici, vous feriez normalement un appel API pour envoyer l'email de réinitialisation
  };

  // Si l'utilisateur est authentifié et qu'on est sur la page de login, rediriger vers le dashboard
  if (isAuthenticated && initialView === 'login') {
    return <Navigate to="/compte" replace />;
  }

  // Si l'utilisateur n'est pas authentifié et qu'on essaie d'accéder au dashboard, rediriger vers login
  if (!isAuthenticated && initialView === 'dashboard') {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated) {
    return <AccountDashboard onLogout={handleLogout} />;
  }

  if (showForgotPassword) {
    return (
      <ForgotPasswordForm
        onBack={() => {
          setShowForgotPassword(false);
          setResetEmailSent(false);
        }}
        onSubmit={handleForgotPassword}
        resetEmailSent={resetEmailSent}
      />
    );
  }

  return (
    <LoginForm
      onLogin={handleLogin}
      onForgotPassword={() => setShowForgotPassword(true)}
    />
  );
};

export default AccountPage;