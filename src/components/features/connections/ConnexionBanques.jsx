import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import {
  Building,
  Plus,
  RefreshCcw,
  Lock,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronRight,
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
    { id: 12, name: 'Bourse Direct' },
    { id: 13, name: 'Saxo Banque' },
    { id: 14, name: 'Trade Republic' },
    { id: 15, name: 'Linxea' }
  ];

  const filteredBanks = bankOptions.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="min-h-screen relative" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Building size={32} />
              Connexions Bancaires
            </h1>
            <p className="mt-2 text-white/80">
              Synchronisez vos comptes bancaires pour un suivi automatisé
            </p>
          </div>
        </div>

        {/* Connecter une nouvelle banque */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 z-10 relative">
          <CardHeader>
            <CardTitle>Connecter une nouvelle banque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative" ref={dropdownRef}>
              {/* Champ de recherche */}
              <input
                type="text"
                placeholder="Rechercher votre banque..."
                className="w-full p-4 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                onClick={() => setShowDropdown(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Building className="text-gray-400" size={20} />
              </div>

              {/* Menu déroulant */}
              {showDropdown && searchTerm && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-auto">
                  {filteredBanks.length > 0 ? (
                    filteredBanks.map((bank) => (
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
                    ))
                  ) : (
                    <p className="px-4 py-3 text-gray-500">Aucun résultat</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message de sécurité */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-4 text-gray-600">
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