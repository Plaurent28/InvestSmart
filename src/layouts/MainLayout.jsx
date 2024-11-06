import React from 'react';
import { Outlet } from 'react-router-dom';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MainLayout = () => {
  const navigate = useNavigate();
  const { loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-gray-900">
                InvestSmart
              </Link>
            </div>

            {/* Navigation principale */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link 
                to="/premium"
                className="text-gray-600 hover:text-gray-900"
              >
                Premium
              </Link>
              <Link 
                to="/connections/banks"
                className="text-gray-600 hover:text-gray-900"
              >
                Banques
              </Link>
              <Link 
                to="/reports"
                className="text-gray-600 hover:text-gray-900"
              >
                Rapports
              </Link>
            </nav>

            {/* Menu utilisateur */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>

              {/* Mon Compte */}
              <button
                onClick={() => navigate('/account')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Mon Compte
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-gray-600">
          © 2024 InvestSmart. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;