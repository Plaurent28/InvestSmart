import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Afficher le spinner pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Si l'utilisateur est déjà authentifié et essaie d'accéder aux pages de connexion,
  // le rediriger vers la page d'accueil
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/2fa')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header optionnel pour les pages d'authentification */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Votre logo */}
          <h1 className="text-2xl font-bold text-green-600">InvestSmart</h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer optionnel */}
      <footer className="py-4 text-center text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} InvestSmart. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;