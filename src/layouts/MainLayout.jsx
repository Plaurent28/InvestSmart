import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, Bell } from 'lucide-react';

const MainLayout = ({ isMobile }) => { // Ajout de la prop isMobile ici
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Suppression de loading car non utilisé
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', public: true },
    { name: 'Premium', path: '/premium', public: true },
    { name: 'Banques', path: '/connections/banks', public: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-white shadow">
        <div className={`mx-auto ${isMobile ? 'px-4' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className={`font-bold text-gray-900 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                InvestSmart
              </Link>
            </div>

            {/* Navigation principale - Desktop */}
            {!isMobile && (
              <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  (item.public || isAuthenticated) && (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>
            )}

            {/* Menu utilisateur - Desktop */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated && (
                  <>
                    <button 
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => navigate('/notifications')}
                    >
                      <Bell className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => navigate('/account')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mon Compte
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Connexion
                  </button>
                )}
              </div>
            )}

            {/* Menu burger - Mobile */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>

          {/* Menu mobile */}
          {isMobile && isMenuOpen && (
            <div className="py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  (item.public || isAuthenticated) && (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-gray-600 hover:text-gray-900 px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/notifications"
                      className="text-gray-600 hover:text-gray-900 px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Notifications
                    </Link>
                    <Link
                      to="/account"
                      className="text-gray-600 hover:text-gray-900 px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mon Compte
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 text-left px-2 py-1"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-green-600 hover:text-green-700 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main>
        <div className={`mx-auto ${isMobile ? 'px-4 py-4' : 'max-w-7xl py-6 sm:px-6 lg:px-8'}`}>
          <Outlet />
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-white border-t">
        <div className={`mx-auto py-4 px-4 text-center text-gray-600 ${isMobile ? 'text-sm' : ''}`}>
          © 2024 InvestSmart. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;