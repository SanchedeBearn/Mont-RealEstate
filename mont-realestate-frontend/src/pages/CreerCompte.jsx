import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CreerCompte.css';

const CreerCompte = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
                navigate('/connexion'); // Rediriger vers la page de connexion
            } else {
                alert(data.message || 'Erreur lors de la création du compte.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible de créer un compte. Veuillez réessayer.');
        }
    };

    return (
        <div className="creer-compte">
            <div className="creer-compte__form">
                <h2 className="creer-compte__title">Créer un compte</h2>
                <form onSubmit={handleSignup} className="creer-compte__content">
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
                    <div className="creer-compte__buttons">
                        <button type="submit" className="creer-compte__button button">Créer un compte</button>
                        <button
                            type="button"
                            className="creer-compte__button button"
                            onClick={() => navigate('/connexion')}
                        >
                            Retour à la connexion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreerCompte;