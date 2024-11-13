import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  FileText,
  Download,
  ChevronDown,
  Calendar,
  Filter,
  Share2,
  FileCheck,
  Crown
} from 'lucide-react';

const GenerateurRapportsFiscaux = () => {
  const [selectedYear] = useState('2023');
  
  // Initialisation des valeurs à zéro
  const [reports, setReports] = useState({
    summary: {
      totalGains: 0,
      totalLosses: 0,
      netTaxableGains: 0,
      estimatedTax: 0,
      carryForwardLosses: 0
    },
    transactions: []
  });

  const [documents, setDocuments] = useState([]);

  // Simule la récupération des données utilisateur après la connexion de la banque
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch('/api/user/reports');
        const data = await response.json();

        setReports({
          summary: {
            totalGains: data.summary.totalGains || 0,
            totalLosses: data.summary.totalLosses || 0,
            netTaxableGains: data.summary.netTaxableGains || 0,
            estimatedTax: data.summary.estimatedTax || 0,
            carryForwardLosses: data.summary.carryForwardLosses || 0
          },
          transactions: data.transactions || []
        });
        
        setDocuments(data.documents || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du rapport:", error);
      }
    };

    fetchReportData();
  }, [selectedYear]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText size={24} />
            Rapports Fiscaux
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
              <Calendar size={20} />
              {selectedYear}
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 bg-[#9b59b6] text-white px-4 py-2 rounded-lg hover:opacity-90">
              <Crown size={20} />
              <span>Premium</span>
            </button>
          </div>
        </div>

        {/* Résumé fiscal */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Résumé Fiscal {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Plus-values</p>
                <p className="text-xl font-bold text-green-600">
                  +{reports.summary.totalGains.toLocaleString('fr-FR')} €
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Moins-values</p>
                <p className="text-xl font-bold text-red-600">
                  {reports.summary.totalLosses.toLocaleString('fr-FR')} €
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Solde net imposable</p>
                <p className="text-xl font-bold">
                  {reports.summary.netTaxableGains.toLocaleString('fr-FR')} €
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Estimation impôt</p>
                <p className="text-xl font-bold text-gray-800">
                  {reports.summary.estimatedTax.toLocaleString('fr-FR')} €
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Report déficitaire</p>
                <p className="text-xl font-bold text-blue-600">
                  {reports.summary.carryForwardLosses.toLocaleString('fr-FR')} €
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents fiscaux */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Documents {selectedYear}</CardTitle>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <FileCheck size={24} className="text-gray-400" />
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-600">
                        {doc.source} • {new Date(doc.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Download size={18} />
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Détail des opérations */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Détail des Opérations {selectedYear}</CardTitle>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#9b59b6] text-white rounded-lg hover:opacity-90">
                <Crown size={18} />
                Export détaillé
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-gray-600">Type</th>
                    <th className="text-left py-3 text-gray-600">Actif</th>
                    <th className="text-left py-3 text-gray-600">Date achat</th>
                    <th className="text-left py-3 text-gray-600">Date vente</th>
                    <th className="text-right py-3 text-gray-600">Prix achat</th>
                    <th className="text-right py-3 text-gray-600">Prix vente</th>
                    <th className="text-right py-3 text-gray-600">+/- value</th>
                    <th className="text-left py-3 text-gray-600">Statut fiscal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reports.transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="py-3">{tx.type}</td>
                      <td className="py-3">{tx.asset}</td>
                      <td className="py-3">{new Date(tx.buyDate).toLocaleDateString('fr-FR')}</td>
                      <td className="py-3">{new Date(tx.sellDate).toLocaleDateString('fr-FR')}</td>
                      <td className="py-3 text-right">{tx.buyPrice.toLocaleString('fr-FR')} €</td>
                      <td className="py-3 text-right">{tx.sellPrice.toLocaleString('fr-FR')} €</td>
                      <td className="py-3 text-right">
                        <span className={tx.gain >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {tx.gain > 0 ? '+' : ''}{tx.gain.toLocaleString('fr-FR')} €
                        </span>
                      </td>
                      <td className="py-3">{tx.taxStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateurRapportsFiscaux;