import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Resultat.css';

// TODO : Animation qui ne se déclenche pas
const Resultat = () => {
    const navigate = useNavigate();
    const [estimation, setEstimation] = useState(null);
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
                threshold: 0.1,
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

    useEffect(() => {
        const storedEstimation = localStorage.getItem('estimation');
        console.log("Estimation récupérée depuis localStorage :", storedEstimation);

        if (storedEstimation) {
            setEstimation(JSON.parse(storedEstimation)); // Load the saved estimation
        } else {
            navigate('/prediction'); // Redirect if no estimation found
        }
    }, [navigate]);

    if (!estimation) {
        return (
            <div>
                <p>Aucune estimation trouvée. Veuillez retourner au formulaire pour effectuer une estimation.</p>
                <button onClick={() => navigate('/prediction')}>Retour au formulaire</button>
            </div>
        );
    }

    return (
        <div className="resultat">
            <h2 className="resultat__title" ref={titleRef}>Résultats de l'estimation</h2>
            <div className="resultat__content">
                <div className="resultat__estimation">
                    <h3>Estimation</h3>
                    <p>{`${estimation} $CAD`}</p>
                </div>
                <button
                    className="resultat__button button"
                    onClick={() => navigate('/prediction')}
                >
                    Retour au formulaire
                </button>
            </div>
        </div>
    );
};

export default Resultat;
