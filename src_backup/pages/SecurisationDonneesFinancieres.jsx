import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Shield, Lock, Key, Database } from 'lucide-react';

const SecurityFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 mb-6">
    <div className="flex-shrink-0">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const SecurisationDonneesFinancieres = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Cryptage de Bout en Bout",
      description: "Toutes les données financières sont cryptées lors de la transmission et du stockage."
    },
    {
      icon: Lock,
      title: "Authentification Multi-facteurs",
      description: "Protection supplémentaire avec authentification à deux facteurs."
    },
    {
      icon: Key,
      title: "Gestion des Accès",
      description: "Contrôle strict des accès avec des permissions granulaires."
    },
    {
      icon: Database,
      title: "Sauvegarde Sécurisée",
      description: "Backup régulier des données avec encryption."
    }
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sécurisation des Données Financières</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Nos Mesures de Sécurité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {securityFeatures.map((feature, index) => (
              <SecurityFeature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Certifications et Conformité</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Conformité RGPD</li>
            <li>Certification ISO 27001</li>
            <li>Standards PCI DSS</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurisationDonneesFinancieres;