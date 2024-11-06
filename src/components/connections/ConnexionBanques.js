import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  Building,
  Plus,
  RefreshCcw,
  Lock,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronRight,
  Clock,
  Settings,
  Shield,
  Info,
  Link2,
  AlertCircle
} from 'lucide-react';

const ConnexionBanques = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const [connectedBanks, setConnectedBanks] = useState([]);

  // Simule la récupération des données bancaires de l'utilisateur
  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        // Remplacez cette ligne par votre API
        const response = await fetch('/api/user/banks');
        const data = await response.json();

        if (data && data.length > 0) {
          setConnectedBanks(data);
        } else {
          setConnectedBanks([]); // Aucun compte bancaire connecté
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des comptes bancaires:", error);
      }
    };

    fetchBankAccounts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Ajouter une banque */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Connecter une nouvelle banque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative" ref={dropdownRef}>
              {/* Champ de recherche */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher votre banque..."
                  className="w-full p-4 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                  onClick={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  value={searchTerm}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Building className="text-gray-400" size={20} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message de sécurité */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-4 text-gray-600">
              <Shield className="flex-shrink-0" size={24} />
              <div>
                <p className="font-medium">Vos données sont sécurisées</p>
                <p className="text-sm mt-1">
                  Nous utilisons le protocole d'agrégation bancaire sécurisé (DSP2) et ne stockons pas vos identifiants bancaires.
                  Toutes les connexions sont chiffrées selon les normes bancaires.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banques connectées */}
        {connectedBanks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedBanks.map(bank => (
              <Card key={bank.id} className="bg-white/90 backdrop-blur-sm border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Building size={24} />
                      {bank.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {bank.status === 'active' ? (
                        <span className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle2 size={16} />
                          Connecté
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-yellow-600">
                          <AlertTriangle size={16} />
                          Actualisation requise
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Liste des comptes */}
                    <div className="space-y-2">
                      {bank.accounts.map((account, index) => (
                        <div 
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                        >
                          <span className="font-medium">{account.type}</span>
                          <span className="text-gray-700">
                            {account.balance ? account.balance.toLocaleString('fr-FR') : '0,00'} €
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        Dernière synchro : {new Date(bank.lastSync).toLocaleString('fr-FR')}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <RefreshCcw size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Settings size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Message d'absence de banques connectées
          <p className="text-center text-gray-600">
            Aucun établissement bancaire connecté. Connectez une banque pour afficher vos comptes.
          </p>
        )}

        {/* Informations complémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/90 backdrop-blur-sm border-0 z-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Link2 className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Import automatique</h3>
                  <p className="text-sm text-gray-600">Synchronisation quotidienne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 z-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Shield className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Connexion sécurisée</h3>
                  <p className="text-sm text-gray-600">Protocole DSP2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 z-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <AlertCircle className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Support dédié</h3>
                  <p className="text-sm text-gray-600">Assistance 7j/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConnexionBanques;