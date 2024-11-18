import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Connexion.css';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Stocker le token JWT
                alert('Connexion réussie !');
                navigate('/'); // Retour à la page d'accueil
            } else {
                alert(data.message || 'Erreur lors de la connexion.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible de se connecter. Veuillez réessayer.');
        }
    };

    return (
        <div className="connexion">
            <div className="connexion__form">
                <h2 className="connexion__title">Connexion</h2>
                <form onSubmit={handleLogin} className="connexion__content">
                    <label>Email :
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>Mot de passe :
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="connexion__buttons">
                        <button type="submit" className="connexion__button button">Se connecter</button>
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
        </div>
    );
};

export default Connexion;
