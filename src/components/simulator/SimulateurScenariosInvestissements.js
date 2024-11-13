import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {
  Calculator,
  PlusCircle,
  Trash2,
  Save,
  RefreshCw,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Dices
} from 'lucide-react';

const SimulateurScenariosInvestissements = () => {
  const [scenarios] = useState([
    {
      id: 1,
      name: 'Scénario Optimiste',
      description: 'Marchés haussiers et contexte économique favorable',
      hypotheses: {
        growth: {
          PEA: 12,
          'Compte-Titres': 10,
          Crypto: 25,
          Immobilier: 5,
          SCPI: 7,
          'Épargne': 3
        },
        volatility: 'Moyenne',
        duration: 5 // années
      },
      monthlyInvestment: 500,
      initialRebalancing: {
        PEA: 35,
        'Compte-Titres': 20,
        Crypto: 10,
        Immobilier: 20,
        SCPI: 10,
        'Épargne': 5
      }
    },
    {
      id: 2,
      name: 'Scénario Conservateur',
      description: 'Approche défensive avec focus sur la préservation du capital',
      hypotheses: {
        growth: {
          PEA: 6,
          'Compte-Titres': 5,
          Crypto: 8,
          Immobilier: 3,
          SCPI: 5,
          'Épargne': 2
        },
        volatility: 'Faible',
        duration: 5 // années
      },
      monthlyInvestment: 500,
      initialRebalancing: {
        PEA: 25,
        'Compte-Titres': 15,
        Crypto: 5,
        Immobilier: 30,
        SCPI: 15,
        'Épargne': 10
      }
    }
  ]);

  const [currentPortfolio] = useState({
    totalValue: 170000,
    distribution: {
      PEA: 29,
      'Compte-Titres': 18,
      Crypto: 12,
      Immobilier: 23,
      SCPI: 6,
      'Épargne': 12
    }
  });

  const generateProjections = (scenario) => {
    const months = scenario.hypotheses.duration * 12;
    const projections = [];
    let baseValue = currentPortfolio.totalValue;

    for (let i = 0; i <= months; i++) {
      const monthlyGrowth = Object.entries(scenario.hypotheses.growth).reduce((acc, [type, rate]) => {
        return acc + (rate / 12) * (scenario.initialRebalancing[type] / 100);
      }, 0);

      baseValue = baseValue * (1 + monthlyGrowth / 100) + scenario.monthlyInvestment;

      projections.push({
        month: i,
        value: Math.round(baseValue),
        baseline: Math.round(currentPortfolio.totalValue * (1 + 0.03 / 12) ** i)
      });
    }

    return projections;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calculator size={24} />
            Simulateur de Scénarios
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
              <Save size={20} />
              <span>Sauvegarder</span>
            </button>
            <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
              <PlusCircle size={20} />
              <span>Nouveau scénario</span>
            </button>
          </div>
        </div>

        {/* Scénarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="bg-white/90 backdrop-blur-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {scenario.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {scenario.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <RefreshCw size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hypothèses */}
                <div>
                  <h3 className="font-medium mb-3">Hypothèses</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Durée</p>
                      <p className="font-medium">{scenario.hypotheses.duration} ans</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Volatilité</p>
                      <p className="font-medium">{scenario.hypotheses.volatility}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Invest. mensuel</p>
                      <p className="font-medium">{scenario.monthlyInvestment} €</p>
                    </div>
                  </div>
                </div>

                {/* Taux de croissance par actif */}
                <div>
                  <h3 className="font-medium mb-3">Taux de croissance annuels</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(scenario.hypotheses.growth).map(([asset, rate]) => (
                      <div key={asset} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{asset}</p>
                        <p className={`font-medium ${rate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {rate > 0 ? '+' : ''}{rate}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Réallocation prévue */}
                <div>
                  <h3 className="font-medium mb-3">Réallocation proposée</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(scenario.initialRebalancing).map(([asset, percentage]) => {
                      const diff = percentage - currentPortfolio.distribution[asset];
                      return (
                        <div key={asset} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm text-gray-600">{asset}</p>
                            <p className="text-sm font-medium">{percentage}%</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            {diff > 0 ? (
                              <ArrowUpRight className="text-green-500" size={14} />
                            ) : diff < 0 ? (
                              <ArrowDownRight className="text-red-500" size={14} />
                            ) : null}
                            <span className={
                              diff > 0 ? 'text-green-600' : 
                              diff < 0 ? 'text-red-600' : 
                              'text-gray-600'
                            }>
                              {diff > 0 ? '+' : ''}{diff}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Graphique de projection */}
                <div>
                  <h3 className="font-medium mb-3">Projection sur {scenario.hypotheses.duration} ans</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={generateProjections(scenario)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month"
                          tickFormatter={(value) => `${Math.floor(value/12)}A${value%12}M`}
                        />
                        <YAxis 
                          tickFormatter={(value) => `${(value/1000).toFixed(0)}k€`}
                        />
                        <Tooltip
                          formatter={(value) => `${value.toLocaleString('fr-FR')} €`}
                          labelFormatter={(value) => `${Math.floor(value/12)}A ${value%12}M`}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#869D78"
                          fill="#869D78"
                          fillOpacity={0.2}
                        />
                        <Area
                          type="monotone"
                          dataKey="baseline"
                          stroke="#94a3b8"
                          fill="#94a3b8"
                          fillOpacity={0.1}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Résultats clés */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Valeur finale</p>
                    <p className="font-medium text-green-600">
                      {generateProjections(scenario).slice(-1)[0].value.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Plus-value projetée</p>
                    <p className="font-medium text-green-600">
                      +{((generateProjections(scenario).slice(-1)[0].value / currentPortfolio.totalValue - 1) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total investi</p>
                    <p className="font-medium">
                      {(currentPortfolio.totalValue + scenario.monthlyInvestment * scenario.hypotheses.duration * 12).toLocaleString('fr-FR')} €
                    </p>
                  </div>
                </div>
                
                {/* Boutons d'action */}
                <div className="flex justify-end gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Download size={18} />
                    Exporter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#869D78] text-white rounded-lg hover:opacity-90">
                    <Dices size={18} />
                    Simuler variantes
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulateurScenariosInvestissements;