import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';

const Account = () => {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Le useEffect redirigera vers /login
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    {
      title: 'Informations personnelles',
      description: 'Gérez vos informations personnelles et vos préférences de compte',
      icon: <User className="w-6 h-6 text-gray-600" />,
      link: '/account/personal-info'
    },
    {
      title: 'Sécurité',
      description: 'Modifiez votre mot de passe et gérez la double authentification',
      icon: <Shield className="w-6 h-6 text-gray-600" />,
      link: '/account/security'
    },
    {
      title: 'Notifications',
      description: 'Personnalisez vos préférences de notifications',
      icon: <Bell className="w-6 h-6 text-gray-600" />,
      link: '/account/notifications'
    },
    {
      title: 'Abonnement',
      description: 'Gérez votre abonnement et consultez vos factures',
      icon: <CreditCard className="w-6 h-6 text-gray-600" />,
      link: '/account/subscription'
    },
    {
      title: 'Documents',
      description: 'Accédez à vos documents et rapports',
      icon: <FileText className="w-6 h-6 text-gray-600" />,
      link: '/account/documents'
    },
    {
      title: 'Paramètres',
      description: 'Configurez les paramètres de votre compte',
      icon: <Settings className="w-6 h-6 text-gray-600" />,
      link: '/account/settings'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Profile Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-4 rounded-full">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user?.name || 'Utilisateur'}</h1>
            <p className="text-gray-600">{user?.email}</p>
            {user?.isPremium && (
              <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded mt-2">
                Premium
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.link)}
            className="bg-white rounded-lg shadow p-6 text-left hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{item.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
              <div className="flex-1 flex justify-end">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
      >
        <LogOut className="w-5 h-5" />
        <span>Déconnexion</span>
      </button>
    </div>
  );
};

export default Account;