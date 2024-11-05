import React from 'react';
import {
  Building,
  Mail
} from 'lucide-react';

const MentionsLegales = () => {
  const sections = [
    {
      id: 'company',
      title: "Éditeur du site",
      Icon: Building,
      content: [
        {
          label: "Raison sociale",
          value: "PL Consulting"
        },
        {
          label: "Forme juridique",
          value: "Entrepreneur individuel"
        },
        {
          label: "Capital social",
          value: "N/A"
        },
        {
          label: "SIRET",
          value: "93430198700012"
        },
        {
          label: "Code APE",
          value: "7022Z"
        },
        {
          label: "Adresse",
          value: "541 AVENUE Colonel Meyère, 06140 Vence, FRANCE"
        }
      ]
    },
    {
      id: 'contact',
      title: "Contact",
      Icon: Mail,
      content: [
        {
          label: "Email",
          value: "p.laurent2812@outlook.fr"
        },
        {
          label: "Téléphone",
          value: "+33 749994576"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Mentions Légales</h1>
          <p className="text-lg opacity-80">
            Dernière mise à jour : 5 novembre 2024
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map(section => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 font-bold mb-4">
                <section.Icon size={20} />
                {section.title}
              </div>
              <div className="space-y-4">
                {section.content.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 gap-1">
                    <dt className="text-sm text-gray-600">{item.label}</dt>
                    <dd className="font-medium">{item.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;