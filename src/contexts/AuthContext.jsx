import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Vérifie si l'utilisateur est authentifié
    const isAuthenticated = !!user;
    
    // Vérifie si l'utilisateur est admin (à adapter selon votre logique)
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/auth/user', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Erreur de vérification du token:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/auth/login', { email, password });
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
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Toutes les valeurs que nous voulons rendre disponibles dans notre application
    const value = {
        user,           // Les données de l'utilisateur
        loading,        // Indique si une opération est en cours
        error,          // Messages d'erreur éventuels
        login,          // Fonction de connexion
        logout,         // Fonction de déconnexion
        isAuthenticated, // Boolean qui indique si l'utilisateur est connecté
        isAdmin,        // Boolean qui indique si l'utilisateur est admin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
};

export { AuthContext };