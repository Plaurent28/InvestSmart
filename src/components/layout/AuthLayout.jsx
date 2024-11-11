// src/components/layout/AuthLayout.jsx
import React from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner, PageTransition } from '@/components/common';

const AuthLayout = ({ isMobile }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

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
            <h1 className={`font-bold text-green-600 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
              InvestSmart
            </h1>
          </Link>

          {/* Liens d'aide - masqués sur mobile */}
          {!isMobile && (
            <div className="flex space-x-4 text-sm">
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
          )}
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className={`mx-auto ${isMobile ? 'px-4 py-4' : 'max-w-7xl py-6 sm:px-6 lg:px-8'}`}>
          <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-xl rounded-lg p-8">
                <PageTransition>
                  <Outlet />
                </PageTransition>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-white border-t border-gray-200 mt-auto">
        <div className={`mx-auto px-4 ${isMobile ? '' : 'max-w-7xl'}`}>
          <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex justify-between items-center'}`}>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} InvestSmart. Tous droits réservés.
            </p>
            <div className={`flex ${isMobile ? 'space-x-4' : 'space-x-6'} text-sm`}>
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