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
  Landmark,
  RefreshCcw,
  AlertCircle
} from 'lucide-react';

const DashboardPrincipal = ({ isMobile }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  const handleAddInvestment = () => {
    navigate('/connections/banks');
  };

  // État initial
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    performance: 0,
    distribution: [
      { type: 'PEA', value: 0, color: '#3498db', icon: LineChart },
      { type: 'Compte-Titres', value: 0, color: '#2ecc71', icon: LineChart },
      { type: 'Crypto', value: 0, color: '#f1c40f', icon: Bitcoin },
      { type: 'Immobilier', value: 0, color: '#e74c3c', icon: Building2 },
      { type: 'SCPI', value: 0, color: '#9b59b6', icon: Building2 },
      { type: 'Épargne', value: 0, color: '#34495e', icon: Landmark }
    ]
  });

  const defaultData = [
    { type: 'Aucun Actif', value: 1, color: '#2ecc71' }
  ];

  const fetchPortfolioData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/user/portfolio');
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      const data = await response.json();
      setPortfolioData(data);
      setLastUpdate(new Date());
    } catch (error) {
      setError("Impossible de charger les données du portfolio");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
    // Rafraîchir les données toutes les 5 minutes
    const interval = setInterval(fetchPortfolioData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${isMobile ? 'pb-16' : ''}`} style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className={`
          flex justify-between items-center
          ${isMobile ? 'p-4 flex-col space-y-4' : 'p-6 flex-row'}
        `}>
          <div className={`
            flex items-center
            ${isMobile ? 'w-full justify-between' : 'gap-6'}
          `}>
            <div>
              <h1 className="text-2xl font-bold text-white">InvestSmart</h1>
              <h2 className="text-xl text-white">Mon Portfolio</h2>
            </div>
            {isMobile && (
              <button 
                onClick={() => fetchPortfolioData()}
                className="p-2 bg-white/20 rounded-full"
                disabled={isLoading}
              >
                <RefreshCcw 
                  size={20} 
                  className={`text-white ${isLoading ? 'animate-spin' : ''}`}
                />
              </button>
            )}
          </div>
          <button 
            onClick={handleAddInvestment}
            className={`
              flex items-center gap-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors
              ${isMobile ? 'w-full justify-center py-3 px-4' : 'px-4 py-2'}
            `}
          >
            <Plus size={20} />
            <span>Ajouter un investissement</span>
          </button>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="mx-6 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="mr-2" size={20} />
            {error}
          </div>
        )}

        {/* Cards de statistiques */}
        <div className={`
          grid gap-4 px-6
          ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'}
        `}>
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Wallet className="text-[#869D78]" size={isMobile ? 20 : 24} />
                <div>
                  <p className="text-sm text-gray-600">Valeur Totale</p>
                  <p className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    {isLoading ? '...' : portfolioData.totalValue.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp 
                  className={portfolioData.performance >= 0 ? 'text-green-500' : 'text-red-500'} 
                  size={isMobile ? 20 : 24} 
                />
                <div>
                  <p className="text-sm text-gray-600">Performance Globale</p>
                  <p className={`font-bold ${portfolioData.performance >= 0 ? 'text-green-500' : 'text-red-500'} ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                    {isLoading ? '...' : `${portfolioData.performance.toFixed(1)}%`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className={`
          grid gap-6 p-6
          ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'}
        `}>
          {/* Graphique camembert */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
              <CardTitle>Répartition des Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${isMobile ? 'h-48' : 'h-64'}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData.totalValue > 0 ? portfolioData.distribution : defaultData}
                      dataKey="value"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={isMobile ? 60 : 80}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 100}%`}
                    >
                      {(portfolioData.totalValue > 0 ? portfolioData.distribution : defaultData)
                        .map((entry, index) => (
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
            <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
              <CardTitle>Détail par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`space-y-3 ${isMobile ? 'text-sm' : ''}`}>
                {portfolioData.distribution.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => navigate(`/category/${item.type.toLowerCase()}`)}
                    className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon 
                        className={`text-${item.color}`} 
                        size={isMobile ? 16 : 20} 
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.type}</p>
                        <p className="text-gray-600">
                          {portfolioData.totalValue > 0 ? 
                            ((item.value / portfolioData.totalValue) * 100).toFixed(1) : 0}% du portfolio
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

        {/* Dernière mise à jour */}
        {lastUpdate && (
          <div className={`text-white/60 text-sm text-center ${isMobile ? 'pb-4' : 'pb-6'}`}>
            Dernière mise à jour : {lastUpdate.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPrincipal;