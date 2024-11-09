import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthClick = () => {
    if (!isAuthenticated) {
      // Ici vous pourriez rediriger vers la page de connexion
      console.log('Redirection vers la page de connexion');
    }
    // Pour la démonstration, on bascule simplement l'état
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo et navigation principale */}
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold">InvestSmart</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Banques</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Actualité</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Premium</a>
            </nav>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </button>
            <button
              onClick={handleAuthClick}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {isAuthenticated ? 'Mon Compte' : 'Connexion'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;