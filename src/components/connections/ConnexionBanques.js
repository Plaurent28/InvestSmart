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
  Shield, // Import ajouté pour éviter l'erreur
  Info,
  Link2,
  AlertCircle
} from 'lucide-react';

const ConnexionBanques = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const bankOptions = [
    { id: 1, name: 'Crédit Agricole' },
    { id: 2, name: 'BNP Paribas' },
    { id: 3, name: 'Banque Populaire' },
    { id: 4, name: 'Caisse d\'Épargne' },
    { id: 5, name: 'Société Générale' },
    { id: 6, name: 'BoursoBank' },
    { id: 7, name: 'Fortuneo' },
    { id: 8, name: 'Hello bank!' },
    { id: 9, name: 'Monabanq' },
    { id: 10, name: 'N26' },
    { id: 11, name: 'Revolut' },
    { id: 21, name: 'Bourse Direct' },
    { id: 22, name: 'Saxo Banque' },
    { id: 23, name: 'Trade Republic' },
    { id: 24, name: 'Linxea' }
  ];

  const [connectedBanks] = useState([
    {
      id: 1,
      name: 'BNP Paribas',
      lastSync: '2024-03-15T10:30:00',
      status: 'active',
      accounts: [
        { type: 'Compte Courant', balance: 2500.42 },
        { type: 'Livret A', balance: 15000.00 },
        { type: 'PEA', balance: 25000.00 }
      ]
    },
    {
      id: 2,
      name: 'BoursoBank',
      lastSync: '2024-03-15T09:15:00',
      status: 'need_refresh',
      accounts: [
        { type: 'Compte Courant', balance: 1800.30 },
        { type: 'Trading', balance: 42000.00 }
      ]
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredBanks = bankOptions.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Ajouter une banque */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-center">Connecter une nouvelle banque</CardTitle>
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

              {/* Liste déroulante de banques */}
              {showDropdown && searchTerm && filteredBanks.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-auto">
                  {filteredBanks.map((bank) => (
                    <button
                      key={bank.id}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
                      onClick={() => {
                        setSearchTerm(bank.name);
                        setShowDropdown(false);
                      }}
                    >
                      <span className="font-medium">{bank.name}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message de sécurité */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center text-gray-600">
              <Shield size={24} className="mb-2" />
              <p className="font-medium">Vos données sont sécurisées</p>
              <p className="text-sm mt-1">
                Nous utilisons le protocole d'agrégation bancaire sécurisé (DSP2) et ne stockons pas vos identifiants bancaires.
                Toutes les connexions sont chiffrées selon les normes bancaires.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Banques connectées */}
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
                          {account.balance.toLocaleString('fr-FR')} €
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

        {/* Informations complémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/90 backdrop-blur-sm border-0 z-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <Link2 className="text-blue-600" size={20} />
                <div>
                  <h3 className="font-medium">Import automatique</h3>
                  <p className="text-sm text-gray-600">Synchronisation quotidienne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 z-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <Shield className="text-green-600" size={20} />
                <div>
                  <h3 className="font-medium">Connexion sécurisée</h3>
                  <p className="text-sm text-gray-600">Protocole DSP2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 z-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <AlertCircle className="text-purple-600" size={20} />
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