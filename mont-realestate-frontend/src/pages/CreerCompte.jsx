import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CreerCompte.css';

const CreerCompte = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const titleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            },
            {
                threshold: 0.1, // Ajustez ce seuil selon vos besoins
            }
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => {
            if (titleRef.current) {
                observer.unobserve(titleRef.current);
            }
        };
    }, []);

    const handleSignup = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
                navigate('/connexion');
            } else {
                setError(data.message || 'Erreur lors de la création du compte.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Impossible de créer un compte. Veuillez vérifier votre connexion.');
        } finally {
            setLoading(false);
        }
    };

    const validatePasswordCriteria = (password) => ({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        symbol: /[!@#$%^&*]/.test(password),
        number: /\d/.test(password),
    });

    const passwordValidation = validatePasswordCriteria(password);

    return (
        <div className="creer-compte__form">
            <h2 className="creer-compte__title" ref={titleRef}>Créer un compte</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignup} className="creer-compte__content">
                <div className="creer-compte__group">
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Veuillez entrer une adresse email valide (ex: exemple@test.com)."
                    />
                </div>
                <div className="creer-compte__group">
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        title="Le mot de passe doit contenir au moins 8 caractères, une majuscule, un symbole et un chiffre."
                    />
                    <ul className="password-criteria">
                        <li className={passwordValidation.length ? 'valid' : 'invalid'}>
                            <span className="icon">&#10004;</span> 8 caractères minimum
                        </li>
                        <li className={passwordValidation.uppercase ? 'valid' : 'invalid'}>
                            <span className="icon">&#10004;</span> Une majuscule
                        </li>
                        <li className={passwordValidation.symbol ? 'valid' : 'invalid'}>
                            <span className="icon">&#10004;</span> Un symbole
                        </li>
                        <li className={passwordValidation.number ? 'valid' : 'invalid'}>
                            <span className="icon">&#10004;</span> Un chiffre
                        </li>
                    </ul>
                </div>
                <div className="creer-compte__buttons">
                    <button type="submit" className="creer-compte__button button" disabled={loading}>
                        {loading ? 'Chargement...' : 'Créer un compte'}
                    </button>
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
    );
};

export default CreerCompte;
