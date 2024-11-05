import { useState } from 'react';
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
  Menu,
  X,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  Eye
} from 'lucide-react';

const DashboardMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioData] = useState({
    totalValue: 170000,
    distribution: [
      { type: 'PEA', value: 50000, color: '#3498db' },
      { type: 'Compte-Titres', value: 30000, color: '#2ecc71' },
      { type: 'Crypto', value: 20000, color: '#f1c40f' },
      { type: 'Immobilier', value: 40000, color: '#e74c3c' },
      { type: 'SCPI', value: 10000, color: '#9b59b6' },
      { type: 'Épargne', value: 20000, color: '#34495e' }
    ]
  });

  // Menu latéral
  const SideMenu = () => (
    <div 
      className={`fixed inset-y-0 left-0 w-64 bg-white transform ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out z-50`}
    >
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Menu</h2>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Menu items */}
        <nav className="space-y-2">
          {[
            { icon: Wallet, label: 'Portfolio' },
            { icon: TrendingUp, label: 'Performances' },
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Paramètres' },
            { icon: LogOut, label: 'Déconnexion' }
          ].map((item, index) => (
            <button 
              key={index}
              className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg"
            >
              <item.icon size={20} className="text-gray-600" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-lg mx-auto">
        {/* En-tête avec logo, menu et bouton d'ajout */}
        <div className="flex flex-col p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMenuOpen(true)}
                className="p-2 bg-white/90 rounded-full hover:bg-white"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">InvestSmart</h1>
            </div>
            <button className="p-2 bg-white/90 rounded-full hover:bg-white">
              <Plus size={24} />
            </button>
          </div>
          <h2 className="text-xl text-white">Mon Portfolio</h2>
        </div>

        {/* Valeur totale */}
        <Card className="mx-4 bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-gray-600">Valeur Totale</p>
              <p className="text-3xl font-bold">
                {portfolioData.totalValue.toLocaleString('fr-FR')} €
              </p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp size={16} />
                <span className="font-medium">+12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribution en camembert */}
        <Card className="mx-4 mt-4 bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Répartition des Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData.distribution}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {portfolioData.distribution.map((entry, index) => (
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

        {/* Liste des investissements */}
        <Card className="mx-4 mt-4 mb-20 bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Détail par Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portfolioData.distribution.map((item, index) => (
                <button 
                  key={index}
                  className="w-full flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.type === 'PEA' && <LineChart className="text-blue-500" />}
                    {item.type === 'Compte-Titres' && <LineChart className="text-green-500" />}
                    {item.type === 'Crypto' && <Bitcoin className="text-yellow-500" />}
                    {item.type === 'Immobilier' && <Building2 className="text-red-500" />}
                    {item.type === 'SCPI' && <Building2 className="text-purple-500" />}
                    {item.type === 'Épargne' && <Landmark className="text-gray-700" />}
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">{item.type}</p>
                      <p className="text-sm text-gray-600">
                        {item.value.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      {((item.value / portfolioData.totalValue) * 100).toFixed(1)}%
                    </span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu raccourcis */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-lg mx-auto px-4 py-2">
          <div className="flex justify-around">
            {[
              { icon: Wallet, label: 'Portfolio' },
              { icon: TrendingUp, label: 'Performance' },
              { icon: Eye, label: 'Surveillance' },
              { icon: Settings, label: 'Réglages' }
            ].map((item, index) => (
              <button 
                key={index}
                className="flex flex-col items-center p-2"
              >
                <item.icon size={24} className="text-gray-600" />
                <span className="text-xs text-gray-600 mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu latéral et overlay */}
      <SideMenu />
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardMobile;