import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Euro, 
  Percent, 
  Clock, 
  AlertCircle,
  FileText,
  BarChart3,
  History
} from 'lucide-react';

const VueDetailleeInvestissement = ({ isMobile }) => {
  const [periode, setPeriode] = useState('1an');
  
  // Données exemple pour un investissement
  const investissement = {
    nom: "Actions Tesla (TSLA)",
    type: "Actions",
    montantInvesti: 10000,
    valeurActuelle: 12500,
    dateAchat: "15/06/2023",
    performance: {
      totale: 25,
      annualisee: 22.5,
      mensuelle: 2.1
    },
    dernierCours: 242.50,
    nombreUnites: 51.546,
    derniereMAJ: "12/11/2024 14:30",
    statut: "actif",
    risque: "élevé"
  };

  // Données exemple pour le graphique d'évolution
  const historiqueData = [
    { date: '2023-06', valeur: 10000, cours: 195.20 },
    { date: '2023-07', valeur: 10500, cours: 205.40 },
    { date: '2023-08', valeur: 11200, cours: 218.50 },
    { date: '2023-09', valeur: 10800, cours: 210.30 },
    { date: '2023-10', valeur: 11500, cours: 223.80 },
    { date: '2023-11', valeur: 12500, cours: 242.50 }
  ];

  // Données exemple pour l'historique des transactions
  const transactions = [
    { 
      date: '15/06/2023', 
      type: 'Achat', 
      quantite: 51.546, 
      prix: 195.20,
      montant: 10000 
    },
    { 
      date: '01/09/2023', 
      type: 'Dividende', 
      montant: 125 
    }
  ];

  const StatCard = ({ title, value, icon: Icon, isPercent, isEuro, color = "text-gray-600" }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className={`text-xl font-bold ${color}`}>
              {isPercent && value > 0 && '+'}
              {value.toLocaleString('fr-FR')}
              {isPercent && '%'}
              {isEuro && '€'}
            </p>
          </div>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{investissement.nom}</h1>
            <Badge variant={investissement.statut === 'actif' ? 'default' : 'secondary'}>
              {investissement.statut}
            </Badge>
            <Badge variant="outline" className="text-red-500">
              Risque {investissement.risque}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">
            Dernière mise à jour : {investissement.derniereMAJ}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" />
            Historique
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Valeur actuelle" 
          value={investissement.valeurActuelle} 
          icon={Euro}
          isEuro={true}
        />
        <StatCard 
          title="Performance totale" 
          value={investissement.performance.totale} 
          icon={investissement.performance.totale > 0 ? TrendingUp : TrendingDown}
          isPercent={true}
          color={investissement.performance.totale > 0 ? 'text-green-600' : 'text-red-600'}
        />
        <StatCard 
          title="Performance annualisée" 
          value={investissement.performance.annualisee} 
          icon={Percent}
          isPercent={true}
          color="text-blue-600"
        />
        <StatCard 
          title="Dernier cours" 
          value={investissement.dernierCours} 
          icon={BarChart3}
          isEuro={true}
        />
      </div>

      {/* Détails et graphiques */}
      <Tabs defaultValue="evolution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="evolution">Évolution</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la valeur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historiqueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="valeur" 
                      stroke="#3b82f6" 
                      name="Valeur (€)"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="cours" 
                      stroke="#10b981" 
                      name="Cours (€)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Informations générales</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Type</dt>
                        <dd>{investissement.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Date d'achat</dt>
                        <dd>{investissement.dateAchat}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Nombre d'unités</dt>
                        <dd>{investissement.nombreUnites}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Données financières</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Montant investi</dt>
                        <dd>{investissement.montantInvesti} €</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Plus/Moins value</dt>
                        <dd className={investissement.valeurActuelle - investissement.montantInvesti > 0 ? 'text-green-600' : 'text-red-600'}>
                          {(investissement.valeurActuelle - investissement.montantInvesti).toLocaleString('fr-FR')} €
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Performance mensuelle</dt>
                        <dd className={investissement.performance.mensuelle > 0 ? 'text-green-600' : 'text-red-600'}>
                          {investissement.performance.mensuelle > 0 ? '+' : ''}
                          {investissement.performance.mensuelle}%
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'Achat' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {transaction.type === 'Achat' ? <TrendingUp className="h-4 w-4" /> : <Euro className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{transaction.montant} €</p>
                      {transaction.quantite && (
                        <p className="text-sm text-gray-500">
                          {transaction.quantite} unités à {transaction.prix} €
                        </p>
                      )}
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

export default VueDetailleeInvestissement;