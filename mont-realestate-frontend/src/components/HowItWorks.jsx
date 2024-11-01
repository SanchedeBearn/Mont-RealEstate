import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <div className="how-it-works__title">
                <h2>Comment ça marche ?</h2>
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