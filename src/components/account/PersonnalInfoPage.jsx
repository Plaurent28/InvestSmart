import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle } from 'lucide-react';

const PersonalInfoPage = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de Paris',
    city: 'Paris',
    postalCode: '75000',
    country: 'France'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* En-tête */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Informations personnelles</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            {saveSuccess && (
              <div className="flex items-center p-4 mb-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-green-800">
                  Vos informations ont été mises à jour avec succès.
                </span>
              </div>
            )}

            <div className="space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Rue</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Code postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de sauvegarde */}
            {isEditing && (
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Enregistrer les modifications
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;