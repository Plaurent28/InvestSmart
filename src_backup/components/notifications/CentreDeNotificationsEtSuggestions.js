import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  Bell,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  LineChart,
  PieChart,
  Lightbulb,
  XCircle,
  Check
} from 'lucide-react';

const CentreDeNotificationsEtSuggestions = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Baisse importante',
      message: 'Le cours de Bitcoin a baissé de 8% en 24h',
      asset: 'Crypto',
      date: '2024-03-15T10:30:00',
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      type: 'info',
      title: 'Nouveau plus haut',
      message: 'Votre PEA a atteint un nouveau record',
      asset: 'PEA',
      date: '2024-03-14T16:45:00',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Rééquilibrage conseillé',
      message: 'La part des cryptos dépasse 15% du portfolio',
      asset: 'Global',
      date: '2024-03-14T09:15:00',
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ]);

  const [suggestions] = useState([
    {
      id: 1,
      title: 'Diversification sectorielle',
      message: 'Votre portfolio est fortement exposé au secteur technologique. Envisagez d\'investir dans d\'autres secteurs pour réduire le risque.',
      impact: 'Réduction du risque : -15%',
      difficulty: 'Moyenne',
      steps: [
        'Analyser la répartition sectorielle actuelle',
        'Identifier les secteurs sous-représentés',
        'Sélectionner des ETF sectoriels complémentaires'
      ],
      icon: PieChart,
      color: '#3498db'
    },
    {
      id: 2,
      title: 'Rééquilibrage géographique',
      message: 'Une plus grande exposition aux marchés émergents pourrait améliorer le potentiel de croissance.',
      impact: 'Rendement potentiel : +2.5%',
      difficulty: 'Facile',
      steps: [
        'Examiner la répartition géographique',
        'Sélectionner des ETF marchés émergents',
        'Définir un pourcentage cible'
      ],
      icon: LineChart,
      color: '#2ecc71'
    }
  ]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell size={24} />
            Notifications & Suggestions
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
              <Bell size={20} />
              <span>Gérer les alertes</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} />
                  Notifications récentes
                </CardTitle>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Tout marquer comme lu
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg ${notification.bgColor}`}
                >
                  <div className={`${notification.color} mt-1`}>
                    <notification.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <XCircle size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {new Date(notification.date).toLocaleString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className={`${notification.color} font-medium`}>
                        {notification.asset}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full text-center p-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                Voir toutes les notifications
              </button>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb size={20} />
                Suggestions d'optimisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${suggestion.color}20` }}
                    >
                      <suggestion.icon size={20} style={{ color: suggestion.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                      <p className="text-sm text-gray-600">{suggestion.message}</p>
                      
                      <div className="mt-3 flex items-center gap-4">
                        <span className="text-sm font-medium text-green-600">
                          {suggestion.impact}
                        </span>
                        <span className="text-sm text-gray-500">
                          Difficulté : {suggestion.difficulty}
                        </span>
                      </div>

                      {/* Étapes */}
                      <div className="mt-4 space-y-2">
                        {suggestion.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check size={16} className="text-green-500" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      <button 
                        className="mt-4 w-full flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors"
                        style={{ 
                          backgroundColor: `${suggestion.color}15`,
                          color: suggestion.color
                        }}
                      >
                        Appliquer la suggestion
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CentreDeNotificationsEtSuggestions;