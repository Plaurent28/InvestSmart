import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoadingSpinner from './components/common/LoadingSpinner';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Composants du dashboard
import DashboardPrincipal from './components/dashboard/DashboardPrincipal';
import FormulaireAjoutInvestissement from './components/dashboard/FormulaireAjoutInvestissement';
import PerformanceGlobaleDetaillee from './components/dashboard/PerformanceGlobaleDetaillee';
import VueDetailleeInvestissement from './components/dashboard/VueDetailleeInvestissement';

// Composants d'authentification
import DoubleAuthentification from './components/auth/DoubleAuthentification';
import SystemeAuthentificationComplet from './components/auth/SystemeAuthentificationComplet';

// Pages publiques
import PolitiqueConfidentialite from './components/Pages/PolitiqueConfidentialite';
import SecurisationDonneesFinancieres from './components/Pages/SecurisationDonneesFinancieres';
import MentionsLegales from './components/Pages/MentionsLegales';
import PageNotFound from './components/Pages/PageNotFound';

// Composants admin
import ContentManagement from './components/admin/ContentManagement';

// Import de tous vos autres composants
import ConnexionBanques from './components/connections/ConnexionBanques';
import ConnexionComptesTitresPea from './components/connections/ConnexionComptesTitresPea';
import GestionForfaitsPremium from './components/premium/GestionForfaitsPremium';
import PageDeTarification from './components/premium/PageDeTarification';
import PaymentForm from './components/premium/PaymentForm';
import MonCompte from './components/account/MonCompte';
import Profile from './components/account/Profile';
import Security from './components/account/Security';
import Preferences from './components/account/Preferences';
import GuideDemarrageRapide from './components/guide/GuideDemarrageRapide';
import ActualitesAnalyses from './components/news/ActualitesAnalyses';
import CentreDeNotificationsEtSuggestions from './components/notifications/CentreDeNotificationsEtSuggestions';
import GenerateurRapportsFiscaux from './components/reports/GenerateurRapportsFiscaux';
import SimulateurScenariosInvestissements from './components/simulator/SimulateurScenariosInvestissements';

// Composant pour protéger les routes
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Composant pour les routes publiques
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  const { loading } = useAuth();
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

  const publicPages = [
    { path: "privacy-policy", element: <PolitiqueConfidentialite /> },
    { path: "data-security", element: <SecurisationDonneesFinancieres /> },
    { path: "legal-notices", element: <MentionsLegales /> }
  ];

  return (
    <Routes>
      {/* Routes d'authentification */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <SystemeAuthentificationComplet />
            </PublicRoute>
          }
        />
        <Route path="/2fa" element={<DoubleAuthentification />} />
      </Route>

      {/* Routes d'administration */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout isMobile={isMobile} />
          </ProtectedRoute>
        }
      >
        <Route index element={<ContentManagement />} />
        <Route path="users" element={<ContentManagement section="users" />} />
        <Route path="settings" element={<ContentManagement section="settings" />} />
      </Route>

      {/* Routes principales */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout isMobile={isMobile} />
          </ProtectedRoute>
        }
      >
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

        {/* Pages publiques */}
        {publicPages.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Page 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;