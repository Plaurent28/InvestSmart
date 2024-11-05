import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { 
  Wallet, 
  X,
  ArrowLeft,
  Building2,
  LineChart,
  Bitcoin,
  Landmark
} from 'lucide-react';

// Constantes de couleurs
const COLORS = {
  PEA: '#3498db',
  'Compte-Titres': '#2ecc71',
  Crypto: '#f1c40f',
  Immobilier: '#e74c3c',
  SCPI: '#9b59b6',
  'Épargne': '#34495e'
};

const FormulaireAjoutInvestissement = ({ onClose }) => {
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const categories = {
    'PEA': ['Actions', 'ETF', 'Autres'],
    'Compte-Titres': ['Actions', 'ETF', 'Obligations', 'Autres'],
    'Crypto': ['Bitcoin', 'Ethereum', 'Autres'],
    'Immobilier': ['Résidence Principale', 'Locatif', 'Parking', 'Autres'],
    'SCPI': ['Bureaux', 'Commerce', 'Résidentiel', 'Diversifiée'],
    'Épargne': ['Livret A', 'LDDS', 'LEP', 'Autres']
  };

  const getIcon = (type) => {
    switch(type) {
      case 'PEA':
        return <LineChart className="text-[#3498db]" />;
      case 'Compte-Titres':
        return <LineChart className="text-[#2ecc71]" />;
      case 'Crypto':
        return <Bitcoin className="text-[#f1c40f]" />;
      case 'Immobilier':
        return <Building2 className="text-[#e74c3c]" />;
      case 'SCPI':
        return <Building2 className="text-[#9b59b6]" />;
      case 'Épargne':
        return <Landmark className="text-[#34495e]" />;
      default:
        return <Wallet className="text-gray-400" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici viendra la logique pour sauvegarder l'investissement
    console.log(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(134, 157, 120, 0.9)' }}>
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            {formData.type ? getIcon(formData.type) : <Wallet className="text-[#869D78]" size={24} />}
            <CardTitle>Ajouter un Investissement</CardTitle>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type d'investissement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'investissement
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(categories).map((type) => (
                  <button
                    key={type}
                    type="button"
                    style={{
                      backgroundColor: formData.type === type ? COLORS[type] : 'rgb(243 244 246)',
                      borderColor: COLORS[type],
                      borderWidth: '1px',
                    }}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 justify-center ${
                      formData.type === type 
                        ? 'text-white' 
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setFormData({ ...formData, type, category: '' })}
                  >
                    {getIcon(type)}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Sous-catégorie */}
            {formData.type && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories[formData.type].map((category) => (
                    <button
                      key={category}
                      type="button"
                      style={{
                        backgroundColor: formData.category === category ? COLORS[formData.type] : 'rgb(243 244 246)',
                        borderColor: COLORS[formData.type],
                        borderWidth: '1px',
                      }}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        formData.category === category 
                          ? 'text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setFormData({ ...formData, category })}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nom et détails */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'investissement
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Actions Apple, Appartement Paris..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant
                </label>
                <input
                  type="number"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Montant en €"
                  required
                />
              </div>
            </div>

            {/* Date et Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'acquisition
                </label>
                <input
                  type="date"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optionnel)
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Informations complémentaires..."
                  rows={1}
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ArrowLeft size={20} />
                Annuler
              </button>
              <button
                type="submit"
                style={{ 
                  backgroundColor: formData.type ? COLORS[formData.type] : '#869D78',
                }}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Ajouter l'investissement
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaireAjoutInvestissement;
