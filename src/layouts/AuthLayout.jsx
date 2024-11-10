import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Shield } from 'lucide-react'; // Ajoutez une icône pour le design

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

  // Redirection si déjà authentifié
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/2fa')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo avec lien */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">InvestSmart</h1>
          </Link>
          
          {/* Liens d'aide */}
          <div className="hidden sm:flex space-x-4 text-sm">
            <Link 
              to="/help" 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Aide
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal avec fond décoratif */}
      <main className="flex-grow flex items-center justify-center p-4 relative">
        {/* Éléments décoratifs en arrière-plan */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-20"></div>
        </div>

        {/* Contenu */}
        <div className="w-full max-w-md z-10">
          <div className="bg-white shadow-xl rounded-lg p-8">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer avec liens */}
      <footer className="py-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} InvestSmart. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;