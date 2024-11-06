import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    useCallback, 
    useMemo 
  } from 'react';
  import axios from 'axios'; // Assurez-vous d'avoir axios pour les appels API
  
  // Créez le contexte d'authentification
  const AuthContext = createContext();
  
  export const AuthProvider = ({ children }) => {
    // Initialisez toutes les valeurs avec des valeurs par défaut
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fonction de connexion
    const login = useCallback(async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
        const { token, user: userData } = response.data;
        localStorage.setItem('token', token);
        setUser(userData);
        return true;
      } catch (error) {
        console.error('Erreur de connexion:', error);
        setError('Échec de la connexion. Vérifiez vos identifiants.');
        return false;
      } finally {
        setLoading(false);
      }
    }, []);
  
    // Fonction de déconnexion
    const logout = useCallback(() => {
      localStorage.removeItem('token');
      setUser(null);
    }, []);
  
    // Objet memo-isé pour les valeurs du contexte
    const value = useMemo(() => ({
      user,
      loading,
      error,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }), [user, loading, error, login, logout]);
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Hook personnalisé pour utiliser le contexte d'authentification
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
  };
  
  // Exportez le contexte pour l'utiliser ailleurs si besoin
  export { AuthContext };