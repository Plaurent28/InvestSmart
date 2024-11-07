import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import AccountDashboard from './AccountDashboard';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleLogin = (loginEmail, password) => {
    if (loginEmail && password) {
      setIsLoggedIn(true);
      setEmail(loginEmail);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setShowForgotPassword(false);
    setResetEmailSent(false);
  };

  const handleForgotPassword = (resetEmail) => {
    setResetEmailSent(true);
    setEmail(resetEmail);
  };

  if (isLoggedIn) {
    return <AccountDashboard email={email} onLogout={handleLogout} />;
  }

  if (showForgotPassword) {
    return (
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
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