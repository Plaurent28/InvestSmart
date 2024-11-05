import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, LabelList } from 'recharts';
import { 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react';

const COLORS = {
  PEA: '#3498db',
  'Compte-Titres': '#2ecc71',
  Crypto: '#f1c40f',
  Immobilier: '#e74c3c',
  SCPI: '#9b59b6',
  'Épargne': '#34495e'
};

const PerformanceGlobaleDetaillee = () => {
  // Données d'exemple
  const [performanceData] = useState({
    totalValue: 170000,
    totalReturn: 21500,
    totalReturnPercent: 12.5,
    periodReturns: {
      '1M': 2.3,
      '3M': 5.7,
      '6M': 8.4,
      'YTD': 10.2,
      '1Y': 12.5,
    },
    monthlyReturns: [
      { month: 'Jan', return: 2.1, value: 155000 },
      { month: 'Fév', return: 1.8, value: 158000 },
      { month: 'Mar', return: -0.5, value: 157000 },
      { month: 'Avr', return: 3.2, value: 162000 },
      { month: 'Mai', return: 1.2, value: 164000 },
      { month: 'Juin', return: 3.7, value: 170000 },
    ],
    assetPerformance: [
      { type: 'PEA', return: 15.2, value: 50000, contribution: 4.2 },
      { type: 'Compte-Titres', return: 12.8, value: 30000, contribution: 2.8 },
      { type: 'Crypto', return: 45.5, value: 20000, contribution: 3.5 },
      { type: 'Immobilier', return: 5.2, value: 40000, contribution: 1.2 },
      { type: 'SCPI', return: 8.4, value: 10000, contribution: 0.5 },
      { type: 'Épargne', return: 2.1, value: 20000, contribution: 0.3 }
    ]
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp size={24} />
            Performance Globale
          </h1>
          <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
            <Download size={20} />
            <span>Exporter</span>
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Valeur Totale */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valeur Totale</p>
                  <p className="text-2xl font-bold">
                    {performanceData.totalValue.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plus-value Totale */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Plus-value Totale</p>
                  <p className="text-2xl font-bold text-green-500">
                    +{performanceData.totalReturn.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <ArrowUpRight className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>

          {/* Performance Totale */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Performance Totale</p>
                  <p className="text-2xl font-bold text-green-500">
                    +{performanceData.totalReturnPercent}%
                  </p>
                </div>
                <ArrowUpRight className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>

          {/* Meilleure Performance */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Meilleure Performance</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Crypto</span>
                    <span className="text-2xl font-bold text-green-500">+45.5%</span>
                  </div>
                </div>
                <ArrowUpRight className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphique d'évolution */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Évolution de la valeur</CardTitle>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">1M</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">3M</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">6M</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">1A</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">Max</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData.monthlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => value.toLocaleString('fr-FR') + ' €'}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#869D78"
                    fill="#869D78"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance par type d'actif */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rendements par classe d'actifs */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Performance par classe d'actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={performanceData.assetPerformance}
                    layout="vertical"
                    margin={{ right: 50 }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="type" type="category" width={100} />
                    <Bar 
                      dataKey="return" 
                      fill="#869D78"
                      radius={[0, 4, 4, 0]}
                    >
                      {/* Label à droite des barres */}
                      <LabelList 
                        dataKey="return" 
                        position="right" 
                        formatter={(value) => `${value}%`}
                        style={{ fill: '#4B5563' }} // text-gray-600
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Contribution à la performance */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Contribution à la performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={performanceData.assetPerformance}
                    layout="vertical"
                    margin={{ right: 50 }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="type" type="category" width={100} />
                    <Tooltip 
                      formatter={(value) => `${value}% de la perf. totale`}
                      cursor={{ fill: 'rgba(229, 231, 235, 0.4)' }} // hover plus subtil
                    />
                    <Bar 
                      dataKey="contribution" 
                      radius={[0, 4, 4, 0]}
                    >
                      {/* Labels à droite des barres */}
                      <LabelList 
                        dataKey="contribution" 
                        position="right" 
                        formatter={(value) => `${value}%`}
                        style={{ fill: '#4B5563' }} // text-gray-600
                      />
                      {performanceData.assetPerformance.map((entry, index) => (
                        <Cell key={index} fill={COLORS[entry.type]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des performances par période */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Performance par période</CardTitle>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Filter size={20} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(performanceData.periodReturns).map(([period, value]) => (
                <div 
                  key={period}
                  className="p-4 bg-white/50 rounded-lg"
                >
                  <p className="text-sm text-gray-600 mb-1">{period}</p>
                  <p className={`text-xl font-bold ${
                    value >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {value > 0 ? '+' : ''}{value}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceGlobaleDetaillee;