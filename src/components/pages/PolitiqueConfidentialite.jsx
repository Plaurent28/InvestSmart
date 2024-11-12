import React from 'react';
import { Card, CardContent } from '../ui/card';

const PolitiqueConfidentialite = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Politique de Confidentialité</h1>
      
      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">1. Collecte des Données</h2>
          <p className="mb-4">
            Nous collectons les informations que vous nous fournissez directement, notamment :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Informations d'identification (nom, prénom, email)</li>
            <li>Données de connexion et d'utilisation</li>
            <li>Informations de transaction</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">2. Utilisation des Données</h2>
          <p className="mb-4">
            Nous utilisons vos données personnelles pour :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
            <li>Assurer la sécurité de votre compte</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">3. Protection des Données</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">4. Vos Droits</h2>
          <ul className="list-disc pl-6">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolitiqueConfidentialite;