import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// [Garder tous les imports...]

function App() {
  const { loading, isAdmin, isAuthenticated } = useAuth();
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          {/* Routes publiques */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SystemeAuthentificationComplet />} />
            <Route path="/2fa" element={<DoubleAuthentification />} />
          </Route>

          {/* Pages publiques dans MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPrincipal />} />
            <Route path="guide" element={<GuideDemarrageRapide />} />
            <Route path="privacy-policy" element={<PolitiqueConfidentialite />} />
            <Route path="data-security" element={<SecurisationDonneesFinancieres />} />
            <Route path="legal-notices" element={<MentionsLegales />} />
            
            {/* Routes Premium accessibles à tous */}
            <Route path="premium">
              <Route index element={<PageDeTarification />} />
              <Route path="payment" element={<PaymentForm />} />
            </Route>

            {/* Routes protégées */}
            <Route element={<ProtectedRoute />}>
              {/* Compte utilisateur */}
              <Route path="account">
                <Route index element={<MonCompte />} />
                <Route path="profile" element={<Profile />} />
                <Route path="informations" element={<PersonalInfoPage />} />
                <Route path="security" element={<Security />} />
                <Route path="preferences" element={<Preferences />} />
                <Route path="subscription" element={<GestionForfaitsPremium />} />
              </Route>

              {/* Dashboard protégé */}
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

              {/* Autres routes protégées */}
              <Route path="reports">
                <Route index element={<GenerateurRapportsFiscaux />} />
                <Route path=":year" element={<GenerateurRapportsFiscaux />} />
              </Route>
              <Route path="notifications" element={<CentreDeNotificationsEtSuggestions />} />
              <Route path="simulator" element={<SimulateurScenariosInvestissements />} />
              <Route path="news" element={<ActualitesAnalyses />} />
            </Route>
          </Route>

          {/* Routes d'administration */}
          <Route element={<ProtectedRoute />}>
            {isAdmin && (
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<ContentManagement />} />
                <Route path="users" element={<ContentManagement section="users" />} />
                <Route path="settings" element={<ContentManagement section="settings" />} />
              </Route>
            )}
          </Route>

          {/* Page 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;