// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import { MainLayout, AdminLayout, AuthLayout } from './components/layout';

// Components communs
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Contexts
import { useAuth } from './contexts/AuthContext';

// Lazy loading des composants
import { lazy, Suspense } from 'react';

// Auth
const SystemeAuthentification = lazy(() => import('./features/auth/SystemeAuthentificationComplet'));
const Register = lazy(() => import('./features/auth/Register'));
const DoubleAuthentification = lazy(() => import('./features/auth/DoubleAuthentification'));

// Dashboard
const DashboardPrincipal = lazy(() => import('./features/dashboard/DashboardPrincipal'));
const FormulaireAjoutInvestissement = lazy(() => import('./features/dashboard/FormulaireAjoutInvestissement'));
const PerformanceGlobaleDetaillee = lazy(() => import('./features/dashboard/PerformanceGlobaleDetaillee'));
const VueDetailleeInvestissement = lazy(() => import('./features/dashboard/VueDetailleeInvestissement'));

// Account
const AccountDashboard = lazy(() => import('./features/account/AccountDashboard'));
const Profile = lazy(() => import('./features/account/Profile'));
const PersonalInfoPage = lazy(() => import('./features/account/PersonalInfoPage'));
const Security = lazy(() => import('./features/account/Security'));
const Preferences = lazy(() => import('./features/account/Preferences'));

// Premium
const PageDeTarification = lazy(() => import('./features/premium/PageDeTarification'));
const PaymentForm = lazy(() => import('./features/premium/PaymentForm'));
const GestionForfaitsPremium = lazy(() => import('./features/premium/GestionForfaitsPremium'));

// Features
const ConnexionBanques = lazy(() => import('./features/connections/ConnexionBanques'));
const ConnexionComptesTitresPea = lazy(() => import('./features/connections/ConnexionComptesTitresPea'));
const GenerateurRapportsFiscaux = lazy(() => import('./features/reports/GenerateurRapportsFiscaux'));
const SimulateurScenarios = lazy(() => import('./features/simulator/SimulateurScenariosInvestissements'));
const ActualitesAnalyses = lazy(() => import('./features/news/ActualitesAnalyses'));
const Notifications = lazy(() => import('./features/notifications/CentreDeNotificationsEtSuggestions'));

// Pages
const GuideDemarrageRapide = lazy(() => import('./pages/guide/GuideDemarrageRapide'));
const PolitiqueConfidentialite = lazy(() => import('./pages/legal/PolitiqueConfidentialite'));
const SecurisationDonneesFinancieres = lazy(() => import('./pages/legal/SecurisationDonneesFinancieres'));
const MentionsLegales = lazy(() => import('./pages/legal/MentionsLegales'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// Admin
const ContentManagement = lazy(() => import('./features/admin/ContentManagement'));

function App() {
  const { loading, isAdmin } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Routes d'authentification */}
            <Route element={<AuthLayout isMobile={isMobile} />}>
              <Route path="/login" element={<SystemeAuthentification isMobile={isMobile} />} />
              <Route path="/register" element={<Register isMobile={isMobile} />} />
              <Route path="/2fa" element={<DoubleAuthentification isMobile={isMobile} />} />
            </Route>

            {/* Routes principales */}
            <Route element={<MainLayout isMobile={isMobile} />}>
              {/* Routes publiques */}
              <Route index element={<DashboardPrincipal isMobile={isMobile} />} />
              <Route path="guide" element={<GuideDemarrageRapide isMobile={isMobile} />} />
              <Route path="legal">
                <Route path="privacy" element={<PolitiqueConfidentialite isMobile={isMobile} />} />
                <Route path="security" element={<SecurisationDonneesFinancieres isMobile={isMobile} />} />
                <Route path="mentions" element={<MentionsLegales isMobile={isMobile} />} />
              </Route>
              
              {/* Routes Premium */}
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

                {/* Features protégées */}
                <Route path="dashboard">
                  <Route path="add" element={<FormulaireAjoutInvestissement isMobile={isMobile} />} />
                  <Route path="performance" element={<PerformanceGlobaleDetaillee isMobile={isMobile} />} />
                  <Route path=":id" element={<VueDetailleeInvestissement isMobile={isMobile} />} />
                </Route>

                <Route path="connections">
                  <Route path="banks" element={<ConnexionBanques isMobile={isMobile} />} />
                  <Route path="trading" element={<ConnexionComptesTitresPea isMobile={isMobile} />} />
                </Route>

                <Route path="reports" element={<GenerateurRapportsFiscaux isMobile={isMobile} />} />
                <Route path="simulator" element={<SimulateurScenarios isMobile={isMobile} />} />
                <Route path="news" element={<ActualitesAnalyses isMobile={isMobile} />} />
                <Route path="notifications" element={<Notifications isMobile={isMobile} />} />
              </Route>
            </Route>

            {/* Routes admin */}
            {isAdmin && (
              <Route path="admin" element={<AdminLayout isMobile={isMobile} />}>
                <Route index element={<ContentManagement isMobile={isMobile} />} />
                <Route path="users" element={<ContentManagement section="users" isMobile={isMobile} />} />
                <Route path="settings" element={<ContentManagement section="settings" isMobile={isMobile} />} />
              </Route>
            )}

            {/* 404 */}
            <Route path="*" element={<PageNotFound isMobile={isMobile} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;