import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Connexion.css';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setServerError(''); // Réinitialiser les erreurs
        setLoading(true); // Activer l'état de chargement

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Stocker le token JWT
                navigate('/'); // Retour à la page d'accueil
            } else {
                setServerError(data.message || 'Erreur lors de la connexion.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setServerError('Impossible de se connecter. Veuillez réessayer.');
        } finally {
            setLoading(false); // Désactiver l'état de chargement
        }
    };

    return (
        <div className="connexion__form">
            <h2 className="connexion__title">Connexion</h2>
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
                    <button
                        type="submit"
                        className="connexion__button button"
                        disabled={loading}
                    >
                        {loading ? 'Chargement...' : 'Se connecter'}
                    </button>
                    <button
                        type="button"
                        className="connexion__button button"
                        onClick={() => navigate('/creer_compte')}
                    >
                        Créer un compte
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Connexion;
