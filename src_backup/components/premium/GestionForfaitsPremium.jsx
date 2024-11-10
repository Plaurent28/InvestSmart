import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GestionForfaitsPremium = () => {
  const navigate = useNavigate();
  const [currentPlan] = useState('premium'); // A remplacer par un vrai état/context
  const [billingHistory] = useState([
    {
      id: 1,
      date: '2024-03-01',
      montant: '9.99',
      statut: 'Payé',
      facture: '#INV-2024-001'
    },
    // Ajoutez l'historique des paiements ici
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion de votre abonnement Premium
          </h1>
          <p className="mt-2 text-gray-600">
            Gérez votre abonnement et consultez vos factures
          </p>
        </div>

        {/* Statut de l'abonnement */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Forfait actuel : {currentPlan === 'premium' ? 'Premium' : 'Starter'}
              </h2>
              <p className="text-gray-600">
                Prochain paiement : 1er avril 2024
              </p>
            </div>
            <button
              onClick={() => navigate('/premium')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Changer de forfait
            </button>
          </div>
        </div>

        {/* Méthode de paiement */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Méthode de paiement</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-md">
                <svg className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-medium">Carte terminant par 4242</p>
                <p className="text-sm text-gray-500">Expire le 12/25</p>
              </div>
            </div>
            <button className="text-green-600 hover:text-green-700">
              Modifier
            </button>
          </div>
        </div>

        {/* Historique des paiements */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Historique des paiements</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facture
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billingHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.montant}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payment.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 hover:text-green-700">
                      <a href={`/invoices/${payment.id}`}>
                        {payment.facture}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionForfaitsPremium;