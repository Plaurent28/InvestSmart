import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Building, ChevronRight } from 'lucide-react';

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
    { id: 12, name: 'HSBC France' },
    { id: 13, name: 'ING' },
    { id: 14, name: 'LCL' },
    { id: 15, name: 'La Banque Postale' },
    { id: 16, name: 'Crédit Mutuel' },
    { id: 17, name: 'AXA Banque' },
    { id: 18, name: 'Crédit du Nord' },
    { id: 19, name: 'BforBank' },
    { id: 20, name: 'Orange Bank' },
    { id: 21, name: 'Bourse Direct' },
    { id: 22, name: 'Saxo Banque' },
    { id: 23, name: 'Trade Republic' },
    { id: 24, name: 'Linxea' }
  ];

  // Gestion des clics extérieurs pour fermer la liste déroulante
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrer les options de la liste en fonction de la recherche
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
      </div>
    </div>
  );
};

export default ConnexionBanques;