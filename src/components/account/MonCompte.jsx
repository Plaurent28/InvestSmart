import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; // Assurez-vous que ce contexte est bien défini pour l'authentification

const MonCompte = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth(); // Utilisation du contexte pour l'utilisateur connecté

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    }
  }, [isAuthenticated, navigate]);

  // Redirection pendant la vérification de l'authentification
  if (!isAuthenticated) {
    return null; // Ou un composant de chargement si nécessaire
  }

  const menuItems = [
    {
      id: 'profile',
      label: 'Informations personnelles',
      icon: User,
      path: '/account/profile',
      description: 'Gérez vos informations personnelles et vos préférences de compte',
    },
    {
      id: 'security',
      label: 'Sécurité',
      icon: Shield,
      path: '/account/security',
      description: 'Modifiez votre mot de passe et gérez la double authentification',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      path: '/account/preferences',
      description: 'Personnalisez vos préférences de notifications',
    },
    {
      id: 'subscription',
      label: 'Abonnement',
      icon: CreditCard,
      path: '/account/subscription',
      description: 'Gérez votre abonnement et consultez vos factures',
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      path: '/account/documents',
      description: 'Accédez à vos documents et rapports',
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      path: '/account/settings',
      description: 'Configurez les paramètres de votre compte',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* En-tête du compte */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <User size={32} className="text-green-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              {user.forfait === 'Premium' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  Premium
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Grille des options du compte */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <item.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {item.label}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Déconnexion */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonCompte;