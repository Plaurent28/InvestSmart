import React from 'react';
import {
  Building,
  Mail,
  Phone,
  Globe,
  Shield,
  Server,
  HardDrive,
  Users,
  Scale,
  Clock,
  Info
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
          value: "[Nom de la société]"
        },
        {
          label: "Forme juridique",
          value: "Société par Actions Simplifiée (SAS)"
        },
        {
          label: "Capital social",
          value: "[Montant] euros"
        },
        {
          label: "RCS",
          value: "[Ville + Numéro]"
        },
        {
          label: "SIRET",
          value: "[Numéro SIRET]"
        },
        {
          label: "TVA Intracommunautaire",
          value: "[Numéro TVA]"
        },
        {
          label: "Siège social",
          value: "[Adresse complète]"
        }
      ]
    },
    {
      id: 'management',
      title: "Direction de la publication",
      Icon: Users,
      content: [
        {
          label: "Directeur de la publication",
          value: "[Nom du directeur]"
        },
        {
          label: "Responsable de la rédaction",
          value: "[Nom du responsable]"
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
          value: "contact@[domaine].com"
        },
        {
          label: "Téléphone",
          value: "[Numéro]"
        },
        {
          label: "Formulaire de contact",
          value: "Disponible dans votre espace client"
        }
      ]
    },
    {
      id: 'hosting',
      title: "Hébergement",
      Icon: Server,
      content: [
        {
          label: "Hébergeur",
          value: "[Nom de l'hébergeur]"
        },
        {
          label: "Forme juridique",
          value: "[Forme juridique de l'hébergeur]"
        },
        {
          label: "Adresse",
          value: "[Adresse de l'hébergeur]"
        },
        {
          label: "Localisation des données",
          value: "France/Union Européenne"
        }
      ]
    },
    {
      id: 'privacy',
      title: "Protection des données",
      Icon: Shield,
      content: [
        {
          label: "DPO",
          value: "[Nom du DPO]"
        },
        {
          label: "Email DPO",
          value: "dpo@[domaine].com"
        },
        {
          label: "Déclaration CNIL",
          value: "Numéro d'enregistrement : [Numéro]"
        },
        {
          label: "Politique de confidentialité",
          value: "Consultable dans les paramètres de votre compte"
        }
      ]
    },
    {
      id: 'property',
      title: "Propriété intellectuelle",
      Icon: Scale,
      content: [
        {
          label: "Copyright",
          value: "© 2024 [Nom de la société]. Tous droits réservés."
        },
        {
          label: "Marques déposées",
          value: "Toutes les marques citées sont la propriété de leurs détenteurs respectifs"
        },
        {
          label: "Licence",
          value: "Utilisation soumise à conditions, voir CGU"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#869D78]">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl font-bold">Mentions Légales</h1>
          <p className="text-lg text-white/80">
            Dernière mise à jour : 4 novembre 2024
          </p>
        </div>

        {/* Note d'information */}
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex items-center gap-3 text-gray-600">
            <Info size={24} />
            <p>
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 
              pour la confiance dans l'économie numérique, il est précisé aux 
              utilisateurs du site l'identité des différents intervenants dans le 
              cadre de sa réalisation et de son suivi.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map(section => (
            <div key={section.id} className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
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

        {/* Bas de page */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
          <div className="text-gray-600 space-y-4">
            <h3 className="font-medium">Conditions d'utilisation</h3>
            <p className="text-sm">
              L'utilisation du site implique l'acceptation pleine et entière des 
              conditions générales d'utilisation décrites dans les CGU. Ces conditions 
              d'utilisation sont susceptibles d'être modifiées ou complétées à tout 
              moment, les utilisateurs du site sont donc invités à les consulter 
              de manière régulière.
            </p>

            <h3 className="font-medium pt-4">Limitations de responsabilité</h3>
            <p className="text-sm">
              Le site ne pourra être tenu responsable des dommages directs et 
              indirects causés au matériel de l'utilisateur, lors de l'accès au site, 
              et résultant de l'utilisation d'un matériel ne répondant pas aux 
              spécifications techniques requises.
            </p>

            <div className="flex items-center justify-center gap-2 pt-4 text-sm">
              <Clock size={16} />
              <span>Document généré automatiquement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;