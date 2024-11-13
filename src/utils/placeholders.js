const fs = require('fs');
const path = require('path');

const components = {
  'guide/GuideDemarrageRapide': 'Guide de démarrage rapide',
  'pages/PolitiqueConfidentialite': 'Politique de confidentialité',
  'pages/SecurisationDonneesFinancieres': 'Sécurisation des données financières',
  'pages/MentionsLegales': 'Mentions légales',
  'premium/PageDeTarification': 'Page de tarification',
  'premium/PaymentForm': 'Formulaire de paiement',
  'account/MonCompte': 'Mon compte',
  'account/Profile': 'Profil',
  'account/PersonalInfoPage': 'Informations personnelles',
  'account/Security': 'Sécurité',
  'account/Preferences': 'Préférences',
  'premium/GestionForfaitsPremium': 'Gestion des forfaits premium',
  'dashboard/FormulaireAjoutInvestissement': 'Formulaire d\'ajout d\'investissement',
  'dashboard/PerformanceGlobaleDetaillee': 'Performance globale détaillée',
  'dashboard/VueDetailleeInvestissement': 'Vue détaillée investissement',
  'connections/ConnexionBanques': 'Connexion banques',
  'connections/ConnexionComptesTitresPea': 'Connexion comptes titres PEA',
  'reports/GenerateurRapportsFiscaux': 'Générateur de rapports fiscaux',
  'notifications/CentreDeNotificationsEtSuggestions': 'Centre de notifications',
  'simulator/SimulateurScenariosInvestissements': 'Simulateur de scénarios',
  'news/ActualitesAnalyses': 'Actualités et analyses',
  'admin/ContentManagement': 'Gestion du contenu'
};

const componentTemplate = (componentName, displayName) => `
const ${componentName} = ({ isMobile }) => {
  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      <h1 className="text-2xl font-bold mb-4">${displayName}</h1>
      <p>Contenu à venir...</p>
    </div>
  );
};

export default ${componentName};
`;

Object.entries(components).forEach(([path, displayName]) => {
  const [folder, componentName] = path.split('/');
  const dir = `src/components/${folder}`;
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = `${dir}/${componentName}.jsx`;
  fs.writeFileSync(filePath, componentTemplate(componentName, displayName));
});