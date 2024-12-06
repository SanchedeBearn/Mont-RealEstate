import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Utilisation d'Axios pour les requêtes
import { AuthContext } from '../contexts/AuthContext';
import './css/Connexion.css';

//TODO : PROBLEME COOKIE QUI NE RESTE PAS APRES RECHARGEMENT
const Connexion = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const titleRef = useRef(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        setServerError('');
        setLoading(true);

        try {
            // Requête de connexion
            const loginResponse = await axios.post(
                'http://localhost:8000/api/login',
                { email, password },
                { withCredentials: true } // Envoie des cookies
            );

            console.log(loginResponse);

            if (loginResponse.status === 200) {
                // Requête pour récupérer les informations utilisateur
                const userResponse = await axios.get('http://localhost:8000/api/me', {
                    withCredentials: true, // Inclure les cookies
                });

                if (userResponse.status === 200) {
                    setIsAuthenticated(true);
                    navigate('/'); // Redirection après connexion
                } else {
                    throw new Error('Erreur lors de la récupération des informations utilisateur.');
                }
            }
        } catch (error) {
            console.error('Erreur:', error);
            const errorMessage =
                error.response?.data?.message || 'Impossible de se connecter. Veuillez réessayer.';
            setServerError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="connexion__form">
            <h2 className="connexion__title" ref={titleRef}>
                Connexion
            </h2>
            {serverError && <p className="error-message">{serverError}</p>}
            <form onSubmit={handleLogin} className="connexion__content">
                <div className="connexion__group">
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="connexion__group">
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="connexion__buttons">
                    <button type="submit" className="connexion__button button" disabled={loading}>
                        {loading ? 'Chargement...' : 'Se connecter'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Connexion;
