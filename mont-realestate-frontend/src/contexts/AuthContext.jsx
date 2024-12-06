import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Stocker les informations de l'utilisateur
    const [loading, setLoading] = useState(true); // Charger l'état initial

    useEffect(() => {
        // Vérifier si le cookie auth_token est valide au chargement
        axios
            .get('http://localhost:8000/api/me', { withCredentials: true }) // Inclure le cookie
            .then((response) => {
                setIsAuthenticated(true);
                setUser(response.data); // Par exemple { email, roles }
            })
            .catch(() => {
                setIsAuthenticated(false);
                setUser(null);
            })
            .finally(() => {
                setLoading(false); // Chargement terminé
            });
    }, []);

    // Si l'application est encore en train de vérifier l'état
    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};