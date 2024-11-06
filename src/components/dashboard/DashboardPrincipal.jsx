import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  Wallet, 
  Building2, 
  LineChart, 
  Bitcoin,
  TrendingUp,
  Plus,
  Landmark
} from 'lucide-react';

const DashboardPrincipal = () => {
  const navigate = useNavigate();
  
  const handleAddInvestment = () => {
    navigate('/connections/banks');
  };

  // Initialisation des valeurs à zéro
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    performance: 0,
    distribution: [
      { type: 'PEA', value: 0, color: '#3498db' },
      { type: 'Compte-Titres', value: 0, color: '#2ecc71' },
      { type: 'Crypto', value: 0, color: '#f1c40f' },
      { type: 'Immobilier', value: 0, color: '#e74c3c' },
      { type: 'SCPI', value: 0, color: '#9b59b6' },
      { type: 'Épargne', value: 0, color: '#34495e' }
    ]
  });

  // Données par défaut si le total est de 0
  const defaultData = [
    { type: 'Aucun Actif', value: 1, color: '#2ecc71' }  // 100% vert par défaut
  ];

  // Simule la récupération des données utilisateur après la connexion de la banque
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/user/portfolio');
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du portfolio:", error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec logo et bouton d'ajout */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-white">InvestSmart</h1>
            <h2 className="text-xl text-white">Mon Portfolio</h2>
          </div>
          <button 
            onClick={handleAddInvestment}
            className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            <Plus size={20} />
            <span>Ajouter un investissement</span>
          </button>
        </div>

        {/* Cards de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Wallet className="text-[#869D78]" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Valeur Totale</p>
                  <p className="text-2xl font-bold">
                    {portfolioData.totalValue.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-500" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Performance Globale</p>
                  <p className="text-2xl font-bold text-green-500">
                    {portfolioData.performance.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Répartition des actifs et détail par catégorie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Graphique camembert */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Répartition des Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData.totalValue > 0 ? portfolioData.distribution : defaultData}
                      dataKey="value"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 100}%`}
                    >
                      {(portfolioData.totalValue > 0 ? portfolioData.distribution : defaultData).map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => value.toLocaleString('fr-FR') + ' €'}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Détail par catégorie */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Détail par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioData.distribution.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {item.type === 'PEA' && <LineChart className="text-blue-500" />}
                      {item.type === 'Compte-Titres' && <LineChart className="text-green-500" />}
                      {item.type === 'Crypto' && <Bitcoin className="text-yellow-500" />}
                      {item.type === 'Immobilier' && <Building2 className="text-red-500" />}
                      {item.type === 'SCPI' && <Building2 className="text-purple-500" />}
                      {item.type === 'Épargne' && <Landmark className="text-gray-700" />}
                      <div>
                        <p className="font-medium text-gray-800">{item.type}</p>
                        <p className="text-sm text-gray-600">
                          {portfolioData.totalValue > 0 ? ((item.value / portfolioData.totalValue) * 100).toFixed(1) : 0}% du portfolio
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">
                      {item.value.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPrincipal;