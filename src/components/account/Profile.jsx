import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; // Assurez-vous que le chemin est correct
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth(); // Récupération des infos de l'utilisateur connecté
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  // Charger les données de l'utilisateur au chargement du composant
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      // Remplacez l'URL par votre endpoint API
      const response = await axios.get(`/api/users/${user.id}/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}` // Si vous utilisez un token JWT
        }
      });
      
      setFormData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) tempErrors.lastName = 'Le nom est requis';
    if (!formData.email) {
      tempErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email invalide';
    }
    if (!formData.phone) tempErrors.phone = 'Le téléphone est requis';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Remplacez l'URL par votre endpoint API
        await axios.put(`/api/users/${user.id}/profile`, formData, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        
        setIsEditing(false);
        // Optionnel : Afficher un message de succès
        alert('Profil mis à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        // Gérer les erreurs (afficher un message d'erreur)
        alert('Erreur lors de la mise à jour du profil');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erreur lors du chargement des données</p>
      </div>
    );
  }

  // Le reste du code JSX reste le même, mais utilise maintenant les données de formData
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Le reste du code JSX comme avant... */}
      
      {/* Exemple de modification pour un champ : */}
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
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 ${
              !isEditing ? 'bg-gray-50' : 'bg-white'
            }`}
          />
        </div>
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
        )}
      </div>
      
      {/* ... Continuer avec le reste des champs ... */}
    </div>
  );
};

export default Profile;