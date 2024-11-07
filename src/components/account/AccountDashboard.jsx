import React from 'react';
import { User, Settings, Bell, CreditCard, LogOut, Lock, FileText } from 'lucide-react';

const AccountDashboard = ({ email, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
              <p className="text-gray-500">{email}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                Premium
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <Settings className="h-6 w-6 text-gray-600" />
                <span className="ml-3 text-gray-700">Informations personnelles</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <Lock className="h-6 w-6 text-gray-600" />
                <span className="ml-3 text-gray-700">Sécurité</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="ml-3 text-gray-700">Notifications</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <FileText className="h-6 w-6 text-gray-600" />
                <span className="ml-3 text-gray-700">Documents</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <CreditCard className="h-6 w-6 text-gray-600" />
                <span className="ml-3 text-gray-700">Abonnement</span>
              </div>
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