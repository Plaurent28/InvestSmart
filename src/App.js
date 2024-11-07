import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';

// Import des composants du dashboard
import DashboardPrincipal from './components/dashboard/DashboardPrincipal';
import FormulaireAjoutInvestissement from './components/dashboard/FormulaireAjoutInvestissement';
import PerformanceGlobaleDetaillee from './components/dashboard/PerformanceGlobaleDetaillee';
import VueDetailleeInvestissement from './components/dashboard/VueDetailleeInvestissement';

// Import des composants d'authentification
import DoubleAuthentification from './components/auth/DoubleAuthentification';
import SystemeAuthentificationComplet from './components/auth/SystemeAuthentificationComplet';

// Import des composants de connexion
import ConnexionBanques from './components/connections/ConnexionBanques';
import ConnexionComptesTitresPea from './components/connections/ConnexionComptesTitresPea';

// Import des composants premium
import GestionForfaitsPremium from './components/premium/GestionForfaitsPremium';
import PageDeTarification from './components/premium/PageDeTarification';
import PaymentForm from './components/premium/PaymentForm';

// Import des composants du compte
import MonCompte from './components/account/MonCompte';
import Profile from './components/account/Profile';
import Security from './components/account/Security';
import Preferences from './components/account/Preferences';

// Import des composants administratifs
import ContentManagement from './components/admin/ContentManagement';

// Import des autres composants
import PolitiqueConfidentialite from './components/Pages/PolitiqueConfidentialite';
import SecurisationDonneesFinancieres from './components/Pages/SecurisationDonneesFinancieres';
import PageNotFound from './components/Pages/PageNotFound';
import MentionsLegales from './components/Pages/MentionsLegales.jsx';
import GuideDemarrageRapide from './components/guide/GuideDemarrageRapide';
import ActualitesAnalyses from './components/news/ActualitesAnalyses';
import CentreDeNotificationsEtSuggestions from './components/notifications/CentreDeNotificationsEtSuggestions';
import GenerateurRapportsFiscaux from './components/reports/GenerateurRapportsFiscaux';
import SimulateurScenariosInvestissements from './components/simulator/SimulateurScenariosInvestissements';

function App() {
  const { loading, isAdmin } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Routes d'authentification */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SystemeAuthentificationComplet />} />
        <Route path="/2fa" element={<DoubleAuthentification />} />
      </Route>

      {/* Routes d'administration */}
      {isAdmin && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ContentManagement />} />
          <Route path="users" element={<ContentManagement section="users" />} />
          <Route path="settings" element={<ContentManagement section="settings" />} />
        </Route>
      )}

      {/* Routes principales */}
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard */}
        <Route index element={<DashboardPrincipal />} />
        <Route path="dashboard">
          <Route path="add-investment" element={<FormulaireAjoutInvestissement />} />
          <Route path="performance" element={<PerformanceGlobaleDetaillee />} />
          <Route path="investment/:id" element={<VueDetailleeInvestissement />} />
        </Route>

        {/* Connexions */}
        <Route path="connections">
          <Route path="banks" element={<ConnexionBanques />} />
          <Route path="trading-accounts" element={<ConnexionComptesTitresPea />} />
        </Route>

        {/* Premium */}
        <Route path="premium">
          <Route index element={<PageDeTarification />} />
          <Route path="manage" element={<GestionForfaitsPremium />} />
          <Route path="payment" element={<PaymentForm />} />
        </Route>

        {/* Compte utilisateur */}
        <Route path="account">
          <Route index element={<MonCompte />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="subscription" element={<GestionForfaitsPremium />} />
        </Route>

        {/* Autres fonctionnalités */}
        <Route path="guide" element={<GuideDemarrageRapide />} />
        <Route path="news" element={<ActualitesAnalyses />} />
        <Route path="notifications" element={<CentreDeNotificationsEtSuggestions />} />
        <Route path="reports">
          <Route index element={<GenerateurRapportsFiscaux />} />
          <Route path=":year" element={<GenerateurRapportsFiscaux />} />
        </Route>
        <Route path="simulator" element={<SimulateurScenariosInvestissements />} />

        {/* Pages légales et informatives */}
        <Route path="privacy-policy" element={<PolitiqueConfidentialite />} />
        <Route path="data-security" element={<SecurisationDonneesFinancieres />} />
        <Route path="legal-notices" element={<MentionsLegales />} />

        {/* Page 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;