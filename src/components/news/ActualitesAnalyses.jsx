import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  Newspaper,
  Filter,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  Search,
  BarChart2,
  PieChart,
  RefreshCcw,
  Crown,
  Eye
} from 'lucide-react';

const ActualitesAnalyses = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout voir' },
    { id: 'market', label: 'Marchés' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'real-estate', label: 'Immobilier' },
    { id: 'economy', label: 'Économie' }
  ];

  const news = [
    {
      id: 1,
      category: 'market',
      title: "Impact des taux directeurs sur les marchés européens",
      summary: "Analyse des conséquences des dernières décisions de la BCE...",
      date: "Il y a 2 heures",
      author: "Sarah Martin",
      readTime: "5 min",
      isPremium: true,
      views: 1240
    },
    {
      id: 2,
      category: 'crypto',
      title: "Bitcoin : Analyse technique et perspectives",
      summary: "Les niveaux clés à surveiller cette semaine...",
      date: "Il y a 4 heures",
      author: "Alex Chen",
      readTime: "8 min",
      views: 2150
    },
    // Autres articles...
  ];

  const marketAnalysis = [
    {
      title: "CAC 40",
      value: "7 346,79",
      change: "+1.24%",
      isPositive: true
    },
    {
      title: "S&P 500",
      value: "4,385.78",
      change: "-0.32%",
      isPositive: false
    },
    {
      title: "Bitcoin",
      value: "35,242 €",
      change: "+2.15%",
      isPositive: true
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Newspaper size={32} />
              Actualités et Analyses
            </h1>
            <p className="mt-2 text-white/80">
              Restez informé des dernières tendances et analyses du marché
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
              <Filter size={20} />
              Filtres
            </button>
            <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
              <Bookmark size={20} />
              Favoris
            </button>
          </div>
        </div>

        {/* Indicateurs de marché */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketAnalysis.map((market, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">{market.title}</p>
                    <p className="text-2xl font-bold">{market.value}</p>
                  </div>
                  <div className={`text-lg font-medium ${
                    market.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {market.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtres et recherche */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Catégories */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-[#869D78] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Recherche */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher des articles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Articles principaux */}
          <div className="lg:col-span-2 space-y-4">
            {news.map(article => (
              <Card key={article.id} className="bg-white/90 backdrop-blur-sm border-0 hover:bg-white transition-colors">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* En-tête de l'article */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-[#869D78]/10 text-[#869D78] rounded text-sm">
                            {categories.find(c => c.id === article.category)?.label}
                          </span>
                          {article.isPremium && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                              <Crown size={14} />
                              Premium
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold">{article.title}</h2>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Bookmark size={20} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Share2 size={20} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Contenu */}
                    <p className="text-gray-600">
                      {article.summary}
                    </p>

                    {/* Métadonnées */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{article.author}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          {article.views}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {article.readTime} de lecture
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analyses populaires */}
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 size={20} />
                  Analyses populaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Les 5 valeurs à suivre cette semaine",
                    "Analyse des tendances immobilières 2024",
                    "Impact de l'IA sur les marchés financiers"
                  ].map((title, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#869D78]/10 rounded-lg flex items-center justify-center text-[#869D78] font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium">{title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Secteurs tendance */}
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart size={20} />
                  Secteurs tendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Technologies", change: "+2.4%" },
                    { name: "Énergie verte", change: "+1.8%" },
                    { name: "Santé", change: "+1.2%" }
                  ].map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <span>{sector.name}</span>
                      <span className="text-green-600">{sector.change}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mise à jour */}
            <div className="text-sm text-center text-white/80 flex items-center justify-center gap-2">
              <RefreshCcw size={16} />
              Dernière mise à jour il y a 5 minutes
            </div>
          </div>
        </div>

        {/* Premium Banner */}
        <Card className="bg-[#9b59b6] text-white border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Crown size={24} />
                <div>
                  <h3 className="text-xl font-bold">Accédez à toutes nos analyses</h3>
                  <p className="text-white/80">Analyses approfondies, recommandations exclusives et plus encore</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-white text-[#9b59b6] rounded-lg hover:bg-white/90 flex items-center gap-2">
                Passer à Premium
                <ChevronRight size={20} />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActualitesAnalyses;