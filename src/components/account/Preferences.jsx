import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
    Bell, 
    Mail, 
    Globe, 
    Moon, 
    Sun,
    Euro,
    Check,
    ChevronDown
} from 'lucide-react';

const Preferences = () => {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState({
        theme: 'light',
        language: 'fr',
        currency: 'EUR',
        notifications: {
            email: true,
            push: true,
            marketAlerts: true,
            newsUpdates: false,
            performanceReports: true
        },
        emailPreferences: {
            dailyDigest: true,
            weeklyNewsletter: true,
            marketingSurveys: false,
            productUpdates: true
        }
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleNotificationChange = (key) => {
        setPreferences(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handleEmailPreferenceChange = (key) => {
        setPreferences(prev => ({
            ...prev,
            emailPreferences: {
                ...prev.emailPreferences,
                [key]: !prev.emailPreferences[key]
            }
        }));
    };

    const handleThemeChange = (theme) => {
        setPreferences(prev => ({
            ...prev,
            theme
        }));
    };

    const handleLanguageChange = (e) => {
        setPreferences(prev => ({
            ...prev,
            language: e.target.value
        }));
    };

    const handleCurrencyChange = (e) => {
        setPreferences(prev => ({
            ...prev,
            currency: e.target.value
        }));
    };

    const handleSave = async () => {
        try {
            // Ici, ajoutez la logique pour sauvegarder les préférences
            console.log('Saving preferences:', preferences);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="space-y-6">
                {/* Apparence et Localisation */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-6">Apparence et Localisation</h2>
                    
                    {/* Thème */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={`flex items-center px-4 py-2 rounded-md ${
                                    preferences.theme === 'light'
                                        ? 'bg-green-100 text-green-800 border-green-500'
                                        : 'bg-gray-100 text-gray-700 border-gray-300'
                                } border`}
                            >
                                <Sun className="w-4 h-4 mr-2" />
                                Clair
                            </button>
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={`flex items-center px-4 py-2 rounded-md ${
                                    preferences.theme === 'dark'
                                        ? 'bg-green-100 text-green-800 border-green-500'
                                        : 'bg-gray-100 text-gray-700 border-gray-300'
                                } border`}
                            >
                                <Moon className="w-4 h-4 mr-2" />
                                Sombre
                            </button>
                        </div>
                    </div>

                    {/* Langue */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Globe className="w-4 h-4 inline mr-2" />
                            Langue
                        </label>
                        <select
                            value={preferences.language}
                            onChange={handleLanguageChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                        >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>

                    {/* Devise */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Euro className="w-4 h-4 inline mr-2" />
                            Devise
                        </label>
                        <select
                            value={preferences.currency}
                            onChange={handleCurrencyChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
                        >
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="CHF">CHF (Fr)</option>
                        </select>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        <Bell className="w-6 h-6 inline-block mr-2" />
                        Notifications
                    </h2>
                    
                    <div className="space-y-4">
                        {Object.entries(preferences.notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between py-2">
                                <span className="text-gray-700 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                                <button
                                    onClick={() => handleNotificationChange(key)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        value ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            value ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Préférences Email */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        <Mail className="w-6 h-6 inline-block mr-2" />
                        Préférences Email
                    </h2>
                    
                    <div className="space-y-4">
                        {Object.entries(preferences.emailPreferences).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between py-2">
                                <span className="text-gray-700 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                                <button
                                    onClick={() => handleEmailPreferenceChange(key)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        value ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            value ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bouton de sauvegarde */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                    >
                        <Check className="w-4 h-4 mr-2" />
                        Sauvegarder les préférences
                    </button>
                </div>

                {/* Message de succès */}
                {showSuccess && (
                    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-lg">
                        Préférences sauvegardées avec succès !
                    </div>
                )}
            </div>
        </div>
    );
};

export default Preferences;