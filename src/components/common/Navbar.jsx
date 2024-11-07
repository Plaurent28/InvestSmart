import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">InvestSmart</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/premium" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Premium
              </Link>
              <Link to="/banques" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Banques
              </Link>
              <Link to="/rapports" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Rapports
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated && (
              <button className="p-2 rounded-full text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
              </button>
            )}
            <Link
              to={isAuthenticated ? "/compte" : "/login"}
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              {isAuthenticated ? "Mon Compte" : "Se connecter"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;