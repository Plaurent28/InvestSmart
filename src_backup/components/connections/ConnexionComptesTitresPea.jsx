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
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const ConnexionComptesTitresPea = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const brokerCategories = {
    fullService: {
      title: "PEA et Compte-Titres",
      brokers: [
        { 
          id: 1, 
          name: 'Boursobank',
          pea: "0€/ordre",
          cto: "0€/ordre",
          note: "Anciennement Boursorama Banque"
        },
        { 
          id: 2, 
          name: 'Fortuneo',
          pea: "0,99€/ordre",
          cto: "0,99€/ordre"
        },
        { 
          id: 3, 
          name: 'Bourse Direct',
          pea: "0,99€/ordre",
          cto: "0,99€/ordre",
          note: "Spécialiste bourse"
        },
        { 
          id: 4, 
          name: 'Crédit Agricole',
          pea: "à partir de 0,99€/ordre",
          cto: "disponible"
        },
        { 
          id: 5, 
          name: 'BNP Paribas',
          pea: "disponible",
          cto: "disponible"
        },
        { 
          id: 6, 
          name: 'Société Générale',
          pea: "disponible",
          cto: "disponible"
        },
        { 
          id: 7, 
          name: 'Crédit Mutuel',
          pea: "disponible",
          cto: "disponible"
        },
        { 
          id: 8, 
          name: 'La Banque Postale',
          pea: "disponible",
          cto: "disponible"
        },
        { 
          id: 9, 
          name: 'Hello bank!',
          pea: "0€/ordre",
          cto: "0€/ordre"
        },
        { 
          id: 10, 
          name: 'CIC',
          pea: "disponible",
          cto: "disponible"
        }
      ]
    },
    ctoOnly: {
      title: "Compte-Titres uniquement",
      brokers: [
        { 
          id: 11, 
          name: 'Trade Republic',
          cto: "0€/ordre",
          note: "Application mobile uniquement"
        },
        { 
          id: 12, 
          name: 'Saxo Banque',
          cto: "disponible",
          note: "Fonctionnalités avancées"
        }
      ]
    }
  };

  const [connectedAccounts] = useState([
    {
      id: 1,
      name: 'Boursobank',
      type: 'PEA',
      lastSync: '2024-03-15T10:30:00',
      status: 'active',
      balance: 25000.00,
      performance: {
        day: 1.2,
        total: 15.5
      }
    },
    {
      id: 2,
      name: 'Trade Republic',
      type: 'CTO',
      lastSync: '2024-03-15T09:15:00',
      status: 'need_refresh',
      balance: 42000.00,
      performance: {
        day: -0.8,
        total: 22.3
      }
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={32} />
              Comptes-Titres et PEA
            </h1>
            <p className="mt-2 text-white/80">
              Connectez vos comptes d'investissement pour un suivi centralisé
            </p>
          </div>
        </div>

        {/* Message de sécurité */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-4 text-gray-600">
              <Shield className="flex-shrink-0" size={24} />
              <div>
                <p className="font-medium">Données sécurisées et chiffrées</p>
                <p className="text-sm mt-1">
                  Connexion en lecture seule. Aucun ordre ne peut être passé depuis l'application.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comptes connectés */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {connectedAccounts.map(account => (
            <Card key={account.id} className="bg-white/90 backdrop-blur-sm border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Building size={24} />
                    {account.name} - {account.type}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {account.status === 'active' ? (
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
                  {/* Solde et performance */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Valeur totale</p>
                      <p className="text-xl font-bold">{account.balance.toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Performance totale</p>
                      <p className={`text-xl font-bold ${
                        account.performance.total >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {account.performance.total > 0 ? '+' : ''}{account.performance.total}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      Dernière synchro : {new Date(account.lastSync).toLocaleString('fr-FR')}
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

        {/* Ajouter un compte */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Connecter un nouveau compte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative" ref={dropdownRef}>
              {/* Champ de recherche */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher votre courtier..."
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

              {/* Menu déroulant */}
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 max-h-96 overflow-auto">
                  {Object.entries(brokerCategories).map(([categoryKey, category]) => {
                    const filteredBrokers = category.brokers.filter(broker =>
                      broker.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (filteredBrokers.length === 0) return null;

                    return (
                      <div key={categoryKey}>
                        <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                          {category.title}
                        </div>
                        {filteredBrokers.map((broker) => (
                          <button
                            key={broker.id}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
                            onClick={() => {
                              setSearchTerm(broker.name);
                              setShowDropdown(false);
                            }}
                          >
                            <div>
                              <span className="font-medium">{broker.name}</span>
                              <div className="text-sm text-gray-500 space-y-0.5">
                                {broker.pea && (
                                  <p>PEA : {broker.pea}</p>
                                )}
                                {broker.cto && (
                                  <p>CTO : {broker.cto}</p>
                                )}
                                {broker.note && (
                                  <p className="text-gray-400">{broker.note}</p>
                                )}
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info size={20} />
              Questions fréquentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  q: "Quelle est la différence entre PEA et CTO ?",
                  a: "Le PEA offre une fiscalité avantageuse après 5 ans mais est limité aux actions européennes. Le CTO est plus flexible mais sans avantage fiscal spécifique."
                },
                {
                  q: "Mes ordres sont-ils sécurisés ?",
                  a: "L'application n'a qu'un accès en lecture seule à vos comptes. Aucun ordre ne peut être passé depuis la plateforme."
                },
                {
                  q: "Comment sont calculées les performances ?",
                  a: "Les performances sont calculées en tenant compte des dividendes réinvestis et des frais de courtage."
                }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{item.q}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConnexionComptesTitresPea;