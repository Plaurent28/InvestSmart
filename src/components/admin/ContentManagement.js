import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  Edit,
  List,
  Eye,
  Clock,
  Save,
  Upload,
  Settings,
  Filter,
  Plus,
  Check,
  X,
  AlertTriangle,
  FileText,
  Image,
  Link,
  Tag,
  Users
} from 'lucide-react';

const ContentManagement = () => {
  const [selectedTab, setSelectedTab] = useState('draft');
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Impact des taux directeurs sur les marchés européens",
      status: 'draft',
      author: "Sarah Martin",
      category: "market",
      createdAt: "2024-03-15T10:30:00",
      isPremium: true,
    },
    {
      id: 2,
      title: "Analyse technique Bitcoin",
      status: 'pending',
      author: "Alex Chen",
      category: "crypto",
      createdAt: "2024-03-15T11:45:00",
      isPremium: false,
    }
  ]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Edit size={32} />
              Gestion du Contenu
            </h1>
            <p className="mt-2 text-white/80">
              Créez et gérez le contenu éditorial
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-white/90">
            <Plus size={20} />
            Nouvel Article
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Articles publiés', value: '127' },
            { label: 'En attente', value: '8' },
            { label: 'Brouillons', value: '15' },
            { label: 'Total vues', value: '24.5k' }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtres et recherche */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Status tabs */}
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'Tous' },
                  { id: 'draft', label: 'Brouillons' },
                  { id: 'pending', label: 'En attente' },
                  { id: 'published', label: 'Publiés' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedTab === tab.id
                        ? 'bg-[#869D78] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Autres filtres */}
              <div className="flex gap-2 ml-auto">
                <select className="px-4 py-2 border border-gray-200 rounded-lg">
                  <option>Toutes les catégories</option>
                  <option>Marchés</option>
                  <option>Crypto</option>
                  <option>Immobilier</option>
                </select>
                <select className="px-4 py-2 border border-gray-200 rounded-lg">
                  <option>Tous les auteurs</option>
                  <option>Sarah Martin</option>
                  <option>Alex Chen</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des articles */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              {articles.map(article => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{article.title}</h3>
                      {article.isPremium && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          Premium
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded ${
                        article.status === 'draft'
                          ? 'bg-gray-100 text-gray-600'
                          : article.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {article.status === 'draft' ? 'Brouillon' : 
                         article.status === 'pending' ? 'En attente' : 'Publié'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>{article.author}</span>
                      <span>{article.category}</span>
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Eye size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Edit size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-red-500">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Éditeur d'article */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Nouvel Article</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre de l'article"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                />
                
                <div className="flex gap-4">
                  <select className="flex-1 p-3 border border-gray-200 rounded-lg">
                    <option>Sélectionner une catégorie</option>
                    <option>Marchés</option>
                    <option>Crypto</option>
                    <option>Immobilier</option>
                  </select>
                  
                  <select className="flex-1 p-3 border border-gray-200 rounded-lg">
                    <option>Sélectionner un auteur</option>
                    <option>Sarah Martin</option>
                    <option>Alex Chen</option>
                  </select>
                </div>
              </div>

              {/* Éditeur de contenu */}
              <div className="border border-gray-200 rounded-lg">
                {/* Barre d'outils */}
                <div className="flex items-center gap-2 p-2 border-b">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <FileText size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Image size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Link size={18} />
                  </button>
                </div>
                
                {/* Zone de texte */}
                <textarea
                  placeholder="Contenu de l'article..."
                  className="w-full p-4 min-h-[300px] border-none focus:ring-0"
                />
              </div>

              {/* Options de publication */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Article Premium</span>
                  </label>
                  
                  <button className="flex items-center gap-2 text-gray-600">
                    <Tag size={18} />
                    Ajouter des tags
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Enregistrer comme brouillon
                  </button>
                  <button className="px-4 py-2 bg-[#869D78] text-white rounded-lg hover:opacity-90">
                    Publier
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow et validation */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Workflow de validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Étapes de validation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  {[
                    { label: 'Rédaction', status: 'done' },
                    { label: 'Relecture', status: 'current' },
                    { label: 'Validation', status: 'pending' },
                    { label: 'Publication', status: 'pending' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === 'done'
                          ? 'bg-green-500 text-white'
                          : step.status === 'current'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      }`}>
                        {step.status === 'done' ? (
                          <Check size={16} />
                        ) : index + 1}
                      </div>
                      <div className="ml-2">
                        <p className="font-medium">{step.label}</p>
                        <p className="text-sm text-gray-500">
                          {step.status === 'done' ? 'Complété' :
                           step.status === 'current' ? 'En cours' : 'En attente'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validateurs */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Validateurs assignés</h4>
                <div className="flex gap-2">
                  {['Sarah M.', 'Alex C.', 'Marie P.'].map((validator, index) => (
                    <div key={index} className="px-3 py-1 bg-white rounded-full text-sm">
                      {validator}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentManagement;