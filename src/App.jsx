import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import des composants utilisés dans les routes
import SystemeAuthentificationComplet from './components/auth/SystemeAuthentificationComplet';
import DoubleAuthentification from './components/auth/DoubleAuthentification';
import Register from './components/auth/Register';
import DashboardPrincipal from './components/dashboard/DashboardPrincipal';
import GuideDemarrageRapide from './components/guide/GuideDemarrageRapide';
import PolitiqueConfidentialite from './components/Pages/PolitiqueConfidentialite';
import SecurisationDonneesFinancieres from './components/Pages/SecurisationDonneesFinancieres';
import MentionsLegales from './components/Pages/MentionsLegales';
import PageDeTarification from './components/premium/PageDeTarification';
import PaymentForm from './components/premium/PaymentForm';
import MonCompte from './components/account/MonCompte';
import Profile from './components/account/Profile';
import PersonalInfoPage from './components/account/PersonalInfoPage';
import Security from './components/account/Security';
import Preferences from './components/account/Preferences';
import GestionForfaitsPremium from './components/premium/GestionForfaitsPremium';
import FormulaireAjoutInvestissement from './components/dashboard/FormulaireAjoutInvestissement';
import PerformanceGlobaleDetaillee from './components/dashboard/PerformanceGlobaleDetaillee';
import VueDetailleeInvestissement from './components/dashboard/VueDetailleeInvestissement';
import ConnexionBanques from './components/connections/ConnexionBanques';
import ConnexionComptesTitresPea from './components/connections/ConnexionComptesTitresPea';
import GenerateurRapportsFiscaux from './components/reports/GenerateurRapportsFiscaux';
import CentreDeNotificationsEtSuggestions from './components/notifications/CentreDeNotificationsEtSuggestions';
import SimulateurScenariosInvestissements from './components/simulator/SimulateurScenariosInvestissements';
import ActualitesAnalyses from './components/news/ActualitesAnalyses';
import ContentManagement from './components/admin/ContentManagement';
import PageNotFound from './components/Pages/PageNotFound';

function App() {
  const { loading, isAdmin } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Vérification initiale
    handleResize();
    
    // Ajout de l'écouteur d'événement
    window.addEventListener('resize', handleResize);
    
    // Nettoyage
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          {/* Routes publiques */}
          <Route element={<AuthLayout isMobile={isMobile} />}>
            <Route 
              path="/login" 
              element={<SystemeAuthentificationComplet isMobile={isMobile} />} 
            />
            <Route 
              path="/2fa" 
              element={<DoubleAuthentification isMobile={isMobile} />} 
            />
          </Route>

          {/* Pages publiques dans MainLayout */}
          <Route path="/" element={<MainLayout isMobile={isMobile} />}>
            <Route index element={<DashboardPrincipal isMobile={isMobile} />} />
            <Route path="guide" element={<GuideDemarrageRapide isMobile={isMobile} />} />
            <Route path="privacy-policy" element={<PolitiqueConfidentialite isMobile={isMobile} />} />
            <Route path="data-security" element={<SecurisationDonneesFinancieres isMobile={isMobile} />} />
            <Route path="legal-notices" element={<MentionsLegales isMobile={isMobile} />} />
            
            {/* Routes Premium accessibles à tous */}
            <Route path="premium">
              <Route index element={<PageDeTarification isMobile={isMobile} />} />
              <Route path="payment" element={<PaymentForm isMobile={isMobile} />} />
            </Route>

            {/* Routes protégées */}
            <Route element={<ProtectedRoute />}>
              {/* Compte utilisateur */}
              <Route path="account">
                <Route index element={<MonCompte isMobile={isMobile} />} />
                <Route path="profile" element={<Profile isMobile={isMobile} />} />
                <Route path="informations" element={<PersonalInfoPage isMobile={isMobile} />} />
                <Route path="security" element={<Security isMobile={isMobile} />} />
                <Route path="preferences" element={<Preferences isMobile={isMobile} />} />
                <Route path="subscription" element={<GestionForfaitsPremium isMobile={isMobile} />} />
              </Route>

              {/* Dashboard protégé */}
              <Route path="dashboard">
                <Route path="add-investment" element={<FormulaireAjoutInvestissement isMobile={isMobile} />} />
                <Route path="performance" element={<PerformanceGlobaleDetaillee isMobile={isMobile} />} />
                <Route path="investment/:id" element={<VueDetailleeInvestissement isMobile={isMobile} />} />
              </Route>

              {/* Connexions */}
              <Route path="connections">
                <Route path="banks" element={<ConnexionBanques isMobile={isMobile} />} />
                <Route path="trading-accounts" element={<ConnexionComptesTitresPea isMobile={isMobile} />} />
              </Route>

              {/* Autres routes protégées */}
              <Route path="reports">
                <Route index element={<GenerateurRapportsFiscaux isMobile={isMobile} />} />
                <Route path=":year" element={<GenerateurRapportsFiscaux isMobile={isMobile} />} />
              </Route>
              <Route path="notifications" element={<CentreDeNotificationsEtSuggestions isMobile={isMobile} />} />
              <Route path="simulator" element={<SimulateurScenariosInvestissements isMobile={isMobile} />} />
              <Route path="news" element={<ActualitesAnalyses isMobile={isMobile} />} />
            </Route>
          </Route>

          {/* Routes d'administration */}
          <Route element={<ProtectedRoute />}>
            {isAdmin && (
              <Route path="/admin" element={<AdminLayout isMobile={isMobile} />}>
                <Route index element={<ContentManagement isMobile={isMobile} />} />
                <Route path="users" element={<ContentManagement section="users" isMobile={isMobile} />} />
                <Route path="settings" element={<ContentManagement section="settings" isMobile={isMobile} />} />
              </Route>
            )}
          </Route>

          {/* Page 404 */}
          <Route path="*" element={<PageNotFound isMobile={isMobile} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;