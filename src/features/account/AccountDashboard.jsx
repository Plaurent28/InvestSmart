import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Bell, CreditCard, LogOut, Lock, FileText } from 'lucide-react';

const AccountDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
              <p className="text-gray-500">john.doe@example.com</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                Premium
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button 
                onClick={() => handleNavigation('/compte/informations')}
                className="flex items-center w-full p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <Settings className="h-6 w-6 text-gray-600" />
                <div className="ml-3">
                  <span className="text-gray-700 font-medium">Informations personnelles</span>
                  <p className="text-sm text-gray-500">Gérez vos informations personnelles et vos préférences de compte</p>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/compte/securite')}
                className="flex items-center w-full p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <Lock className="h-6 w-6 text-gray-600" />
                <div className="ml-3">
                  <span className="text-gray-700 font-medium">Sécurité</span>
                  <p className="text-sm text-gray-500">Modifiez votre mot de passe et gérez la double authentification</p>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/compte/notifications')}
                className="flex items-center w-full p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <Bell className="h-6 w-6 text-gray-600" />
                <div className="ml-3">
                  <span className="text-gray-700 font-medium">Notifications</span>
                  <p className="text-sm text-gray-500">Personnalisez vos préférences de notifications</p>
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => handleNavigation('/compte/documents')}
                className="flex items-center w-full p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <FileText className="h-6 w-6 text-gray-600" />
                <div className="ml-3">
                  <span className="text-gray-700 font-medium">Documents</span>
                  <p className="text-sm text-gray-500">Accédez à vos documents et rapports</p>
                </div>
              </button>

              <button 
                onClick={() => handleNavigation('/compte/abonnement')}
                className="flex items-center w-full p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <CreditCard className="h-6 w-6 text-gray-600" />
                <div className="ml-3">
                  <span className="text-gray-700 font-medium">Abonnement</span>
                  <p className="text-sm text-gray-500">Gérez votre abonnement et consultez vos factures</p>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="flex items-center w-full p-4 bg-red-50 rounded-lg text-red-700 hover:bg-red-100"
              >
                <LogOut className="h-6 w-6" />
                <span className="ml-3">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;