import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingToggle from '../components/PricingToggle';

const PageDeTarification = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const forfaits = [
    {
      id: 'starter',
      nom: 'Starter',
      prix: { monthly: '0', annual: '0' },
      description: 'Pour démarrer',
      meilleurChoix: false,
      fonctionnalites: [
        '2 investissements maximum',
        'Tableaux de bord basiques',
        'Graphiques simples',
        'Alertes email basiques'
      ]
    },
    {
      id: 'premium',
      nom: 'Premium',
      prix: { monthly: '9.99', annual: '99.99' },
      reduction: { annual: '16%' },
      description: 'Pour les investisseurs actifs',
      meilleurChoix: true,
      fonctionnalites: [
        'Investissements illimités',
        'Tableaux de bord avancés',
        'Graphiques détaillés',
        'Alertes personnalisées',
        'Support prioritaire',
        'Export des données',
        'Analyses approfondies'
      ]
    }
  ];

  const handleSubscription = (forfaitId) => {
    const forfait = forfaits.find(f => f.id === forfaitId);
    if (forfaitId === 'starter') {
      navigate('/dashboard');
    } else {
      navigate('/premium/payment', { 
        state: { 
          forfait: {
            ...forfait,
            prixChoisi: forfait.prix[billingPeriod],
            periode: billingPeriod === 'monthly' ? 'mois' : 'an'
          }
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre forfait
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Découvrez nos forfaits adaptés à vos besoins d'investissement
          </p>

          {/* Sélecteur de période de facturation */}
          <PricingToggle billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
        </div>

        {/* Grille des forfaits */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {forfaits.map((forfait) => (
            <div
              key={forfait.id}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                forfait.meilleurChoix ? 'border-2 border-green-500' : ''
              }`}
            >
              {forfait.meilleurChoix && (
                <div className="absolute top-0 right-6 -translate-y-1/2 px-4 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                  Meilleur choix
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{forfait.nom}</h3>
                <p className="text-gray-500 mt-2">{forfait.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {forfait.prix[billingPeriod]}€
                  </span>
                  <span className="text-gray-500">
                    /{billingPeriod === 'monthly' ? 'mois' : 'an'}
                  </span>
                  {forfait.reduction && billingPeriod === 'annual' && (
                    <p className="text-green-600 text-sm mt-1">
                      Économisez {forfait.reduction.annual}
                    </p>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {forfait.fonctionnalites.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscription(forfait.id)}
                className={`w-full py-3 px-6 rounded-lg text-center font-medium transition-colors duration-200 ${
                  forfait.meilleurChoix
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {forfait.prix[billingPeriod] === '0'
                  ? 'Commencer gratuitement'
                  : 'Choisir ce forfait'}
              </button>
            </div>
          ))}
        </div>

        {/* Section FAQ */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Puis-je changer de forfait à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez passer d'un forfait à l'autre à tout moment.
                La différence sera calculée au prorata.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Comment fonctionne la facturation annuelle ?
              </h3>
              <p className="text-gray-600">
                En choisissant la facturation annuelle, vous bénéficiez de 2 mois gratuits,
                soit une économie de 16% par rapport à la facturation mensuelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDeTarification;