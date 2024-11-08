import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  Settings,
  BarChart,
  Bell,
  Menu,
  X,
  LogOut,
  Home
} from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Rediriger si non authentifié ou non admin
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    {
      name: 'Tableau de bord',
      icon: <BarChart className="w-5 h-5" />,
      path: '/admin'
    },
    {
      name: 'Utilisateurs',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/users'
    },
    {
      name: 'Paramètres',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings'
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-900 text-white ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 fixed h-full z-30`}
      >
        <div className="h-full flex flex-col">
          {/* Logo et bouton de toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {isSidebarOpen && (
              <span className="text-xl font-bold">Admin Panel</span>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3">Retour au site</span>}
            </Link>

            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {item.icon}
                {isSidebarOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Profil utilisateur */}
          <div className="p-4 border-t border-gray-700">
            {isSidebarOpen && (
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  {user?.name?.[0] || 'A'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3">Déconnexion</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div 
        className={`flex-1 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        } transition-all duration-300`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Administration
              </h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;