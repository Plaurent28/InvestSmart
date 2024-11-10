import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('votre_cle_publique_stripe');

const CheckoutForm = ({ forfaitInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Créez une intention de paiement côté serveur
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: forfaitInfo.prixChoisi * 100, // Stripe utilise les centimes
          forfait: forfaitInfo.nom,
          periode: forfaitInfo.periode,
        }),
      });

      const data = await response.json();

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            // Vous pouvez ajouter des détails de facturation ici
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        setSucceeded(true);
        setProcessing(false);
      }
    } catch (err) {
      setError('Une erreur est survenue lors du paiement.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      {succeeded ? (
        <div className="text-green-500 text-center p-4 bg-green-50 rounded-lg">
          <p className="font-medium">Paiement réussi ! Merci de votre confiance.</p>
          <p className="text-sm mt-2">Vous avez accès à toutes les fonctionnalités Premium.</p>
        </div>
      ) : (
        <button
          type="submit"
          disabled={!stripe || processing}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium ${
            processing || !stripe
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {processing ? 'Traitement...' : `Payer ${forfaitInfo.prixChoisi}€`}
        </button>
      )}
    </form>
  );
};

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const forfaitInfo = location.state?.forfait || {
    nom: 'Premium',
    prixChoisi: '9.99',
    periode: 'mois',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Paiement du forfait {forfaitInfo.nom}
          </h1>
          <p className="mt-2 text-gray-600">
            {forfaitInfo.prixChoisi}€/{forfaitInfo.periode}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
            <div className="border-t border-b py-4">
              <div className="flex justify-between">
                <span>Forfait {forfaitInfo.nom} ({forfaitInfo.periode})</span>
                <span>{forfaitInfo.prixChoisi}€</span>
              </div>
              {forfaitInfo.periode === 'an' && (
                <div className="text-sm text-green-600 mt-2">
                  Économisez 16% avec l'abonnement annuel
                </div>
              )}
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm forfaitInfo={forfaitInfo} />
          </Elements>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Paiement sécurisé par Stripe</p>
          <p className="mt-2">
            En procédant au paiement, vous acceptez nos{' '}
            <button 
              onClick={() => navigate('/terms')}
              className="text-green-600 hover:text-green-700"
            >
              conditions générales de vente
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;