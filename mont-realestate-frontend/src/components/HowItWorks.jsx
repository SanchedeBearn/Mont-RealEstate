import React, { useEffect, useRef } from 'react';
import './css/HowItWorks.css';

const HowItWorks = () => {
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

    return (
        <section className="how-it-works">
            <div className="how-it-works__title">
                <h2 ref={titleRef}>Comment ça marche ?</h2>
            </div>
            <div className="how-it-works__steps">
                <div className="how-it-works__step">
                    <img src="src/img/admission.png" alt="Step 1 Icon" />
                    <h2>Saisissez les informations de votre bien</h2>
                    <p>Remplissez les <span className="bold">caractéristiques principales</span> de votre bien immobilier : localisation, type, surface, etc.</p>
                </div>
                <div className="how-it-works__step">
                    <img src="src/img/artificial.png" alt="Step 2 Icon" />
                    <h2>Laissez notre IA analyser le marché</h2>
                    <p>Notre <span className="bold">algorithme IA</span> compare votre bien avec les <span className="bold">données du marché</span> en temps réel pour générer une estimation précise.</p>
                </div>
                <div className="how-it-works__step">
                    <img src="src/img/report.png" alt="Step 3 Icon" />
                    <h2>Recevez une estimation détaillée</h2>
                    <p>Obtenez une <span className="bold">estimation immédiate</span> avec des comparaisons et des détails sur le <span className="bold">marché immobilier à Montréal</span>.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;