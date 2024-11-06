import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoadingSpinner from './components/common/LoadingSpinner';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Import tous les composants nécessaires...
import DashboardPrincipal from './components/dashboard/DashboardPrincipal';
import FormulaireAjoutInvestissement from './components/dashboard/FormulaireAjoutInvestissement';
// ... autres imports ...

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

  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = [
    { path: 'privacy-policy', element: <PolitiqueConfidentialite /> },
    { path: 'data-security', element: <SecurisationDonneesFinancieres /> },
    { path: 'legal-notices', element: <MentionsLegales /> },
  ];

  return (
    <Routes>
      {/* Routes d'authentification */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SystemeAuthentificationComplet />} />
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
        <Route index element={<DashboardPrincipal />} />
        
        {/* Routes du dashboard */}
        <Route path="dashboard">
          <Route path="add-investment" element={<FormulaireAjoutInvestissement />} />
          <Route path="performance" element={<PerformanceGlobaleDetaillee />} />
          <Route path="investment/:id" element={<VueDetailleeInvestissement />} />
        </Route>

        {/* Routes des autres fonctionnalités... */}
        {/* ... vos autres routes ... */}

        {/* Routes publiques */}
        {publicRoutes.map(({ path, element }) => (
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;