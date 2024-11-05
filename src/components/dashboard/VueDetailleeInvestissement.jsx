import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ArrowLeft, 
  TrendingUp,
  BarChart,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Filter
} from 'lucide-react';

const VueDetailleeInvestissement = ({ type = 'PEA', onBack }) => {
  // Exemple de données pour le PEA
  const [investmentData] = useState({
    totalValue: 50000,
    performances: {
      day: 1.2,
      week: -0.5,
      month: 3.4,
      year: 12.5,
    },
    history: [
      { date: '2024-01', value: 45000 },
      { date: '2024-02', value: 46200 },
      { date: '2024-03', value: 48000 },
      { date: '2024-04', value: 50000 },
    ],
    holdings: [
      { 
        name: 'Actions Apple',
        quantity: 25,
        unitPrice: 150,
        totalValue: 3750,
        performance: 15.2,
        allocation: 7.5
      },
      { 
        name: 'ETF World',
        quantity: 50,
        unitPrice: 320,
        totalValue: 16000,
        performance: 8.4,
        allocation: 32
      },
      { 
        name: 'Actions Total',
        quantity: 100,
        unitPrice: 45,
        totalValue: 4500,
        performance: -2.1,
        allocation: 9
      },
    ]
  });

  const COLORS = {
    PEA: '#3498db',
    'Compte-Titres': '#2ecc71',
    Crypto: '#f1c40f',
    Immobilier: '#e74c3c',
    SCPI: '#9b59b6',
    'Épargne': '#34495e'
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <ArrowLeft size={24} color={COLORS[type]} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart size={24} color={COLORS[type]} />
                {type}
              </h1>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
            <Plus size={20} />
            <span>Ajouter</span>
          </button>
        </div>

        {/* Cartes de performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(investmentData.performances).map(([period, value]) => (
            <Card key={period} className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 capitalize">
                      {period === 'day' ? '24h' : 
                       period === 'week' ? '7 jours' :
                       period === 'month' ? '30 jours' : '1 an'}
                    </p>
                    <p className={`text-2xl font-bold ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {value > 0 ? '+' : ''}{value}%
                    </p>
                  </div>
                  {value >= 0 ? 
                    <ArrowUpRight className="text-green-500" size={24} /> : 
                    <ArrowDownRight className="text-red-500" size={24} />
                  }
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Graphique d'évolution */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Évolution</CardTitle>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">1M</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">3M</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">1A</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">Max</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={investmentData.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={COLORS[type]}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Liste des investissements */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Composition</CardTitle>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Filter size={20} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investmentData.holdings.map((holding, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{holding.name}</h3>
                      <p className="text-sm text-gray-500">
                        {holding.quantity} unités • {holding.allocation}% du portfolio
                      </p>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {holding.totalValue.toLocaleString('fr-FR')} €
                      </p>
                      <span className="text-sm text-gray-500">
                        ({holding.unitPrice} € / unité)
                      </span>
                    </div>
                    <div className={`font-medium ${
                      holding.performance >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {holding.performance > 0 ? '+' : ''}{holding.performance}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VueDetailleeInvestissement;