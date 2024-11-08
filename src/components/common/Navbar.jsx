import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">InvestSmart</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/dashboard'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
            
            <Link
              to="/premium"
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/premium'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Premium
            </Link>

            <Link
              to="/guide"
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/guide'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Guide
            </Link>

            {/* Autres liens de navigation */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;