import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Key, Smartphone, AlertTriangle } from 'lucide-react';

const Security = () => {
    const { user } = useAuth();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [show2FAForm, setShow2FAForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation du mot de passe
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            // Ici, ajoutez la logique pour changer le mot de passe
            console.log('Changement de mot de passe:', passwordData);
            setSuccess('Mot de passe mis à jour avec succès');
            setShowPasswordForm(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            setError('Erreur lors du changement de mot de passe');
        }
    };

    const toggle2FA = async () => {
        try {
            // Ici, ajoutez la logique pour activer/désactiver 2FA
            console.log('Toggle 2FA');
            setSuccess('Paramètres 2FA mis à jour avec succès');
        } catch (error) {
            setError('Erreur lors de la mise à jour des paramètres 2FA');
        }
    };

    const recentActivities = [
        {
            id: 1,
            type: 'Connexion',
            device: 'Chrome sur Windows',
            location: 'Paris, France',
            date: '2024-01-15 14:30'
        },
        {
            id: 2,
            type: 'Modification du mot de passe',
            device: 'Firefox sur MacOS',
            location: 'Paris, France',
            date: '2024-01-14 10:15'
        },
        // Ajoutez d'autres activités si nécessaire
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid gap-6">
                {/* Mot de passe */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <Key className="w-6 h-6 text-gray-400 mr-3" />
                            <h2 className="text-xl font-semibold">Mot de passe</h2>
                        </div>
                        <button
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Changer le mot de passe
                        </button>
                    </div>

                    {showPasswordForm && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Mot de passe actuel
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nouveau mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirmer le nouveau mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordForm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Double Authentification */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <Smartphone className="w-6 h-6 text-gray-400 mr-3" />
                            <h2 className="text-xl font-semibold">Double Authentification</h2>
                        </div>
                        <button
                            onClick={toggle2FA}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            {user?.has2FA ? 'Désactiver' : 'Activer'}
                        </button>
                    </div>
                    <p className="text-gray-600 mb-4">
                        La double authentification ajoute une couche de sécurité supplémentaire à votre compte.
                    </p>
                </div>

                {/* Activités Récentes */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center mb-6">
                        <Shield className="w-6 h-6 text-gray-400 mr-3" />
                        <h2 className="text-xl font-semibold">Activités Récentes</h2>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="flex items-start border-b border-gray-200 pb-4">
                                <div className="flex-1">
                                    <p className="font-medium">{activity.type}</p>
                                    <p className="text-sm text-gray-600">
                                        {activity.device} • {activity.location}
                                    </p>
                                    <p className="text-sm text-gray-500">{activity.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Messages d'erreur et de succès */}
            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    {error}
                </div>
            )}
            {success && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    {success}
                </div>
            )}
        </div>
    );
};

export default Security;