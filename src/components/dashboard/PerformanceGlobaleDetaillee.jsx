import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Percent, Euro, PieChart as PieChartIcon } from 'lucide-react';

const PerformanceGlobaleDetaillee = ({ isMobile }) => {
  const [periode, setPeriode] = useState('1an');

  // Données exemple pour les graphiques
  const performanceData = [
    { mois: 'Jan', valeur: 100000, rendement: 2.5 },
    { mois: 'Fév', valeur: 102500, rendement: 3.1 },
    { mois: 'Mar', valeur: 105677, rendement: -1.2 },
    { mois: 'Avr', valeur: 104409, rendement: 4.5 },
    { mois: 'Mai', valeur: 109107, rendement: 2.8 },
    { mois: 'Juin', valeur: 112182, rendement: -0.7 },
  ];

  const repartitionData = [
    { type: 'Actions', pourcentage: 45, montant: 50625 },
    { type: 'Obligations', pourcentage: 30, montant: 33750 },
    { type: 'Immobilier', pourcentage: 15, montant: 16875 },
    { type: 'Crypto', pourcentage: 10, montant: 11250 },
  ];

  // Calcul des performances
  const performanceGlobale = 12.18; // en pourcentage
  const isPositive = performanceGlobale > 0;
  const montantTotal = 112500; // en euros

  const StatCard = ({ title, value, icon: Icon, isPercent, isEuro }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold">
              {isPercent && (value > 0) && '+'}
              {value.toLocaleString('fr-FR')}
              {isPercent && '%'}
              {isEuro && '€'}
            </p>
          </div>
          <Icon className={`h-8 w-8 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Performance globale détaillée</h1>
        
        <div className="mt-4 md:mt-0">
          <Select value={periode} onValueChange={setPeriode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1mois">1 mois</SelectItem>
              <SelectItem value="3mois">3 mois</SelectItem>
              <SelectItem value="6mois">6 mois</SelectItem>
              <SelectItem value="1an">1 an</SelectItem>
              <SelectItem value="max">Max</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Performance Globale" 
          value={performanceGlobale} 
          icon={isPositive ? TrendingUp : TrendingDown}
          isPercent={true}
        />
        <StatCard 
          title="Montant Total" 
          value={montantTotal} 
          icon={Euro}
          isEuro={true}
        />
        <StatCard 
          title="Performance Mensuelle" 
          value={2.8} 
          icon={Percent}
          isPercent={true}
        />
        <StatCard 
          title="Plus-values Latentes" 
          value={12500} 
          icon={TrendingUp}
          isEuro={true}
        />
      </div>

      {/* Onglets graphiques */}
      <Tabs defaultValue="evolution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="evolution">Évolution</TabsTrigger>
          <TabsTrigger value="repartition">Répartition</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la valeur du portefeuille</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="valeur" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      name="Valeur (€)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendement mensuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="rendement" 
                      stroke="#10b981" 
                      name="Rendement (%)" 
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repartition">
          <Card>
            <CardHeader>
              <CardTitle>Répartition du portefeuille</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repartitionData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.type}</span>
                      <span className="font-medium">{item.pourcentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${item.pourcentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {item.montant.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceGlobaleDetaillee;