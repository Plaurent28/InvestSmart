import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';
// Supprimé: import Header from './components/Header';

// [Garder tous les autres imports...]

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
      {/* Supprimé: <Header /> */}
      <div className="flex-grow">
        <Routes>
          {/* Routes d'authentification */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SystemeAuthentificationComplet />} />
            <Route path="/2fa" element={<DoubleAuthentification />} />
          </Route>

          {/* Le reste des routes reste inchangé... */}
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
            {/* Reste du code des routes... */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;