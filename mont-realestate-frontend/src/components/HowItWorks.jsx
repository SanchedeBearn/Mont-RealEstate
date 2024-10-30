import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <h3>Comment ça marche ?</h3>
            <div className="how-it-works__steps">
                <div className="how-it-works__step">
                    <img src="src/img/admission.png" alt="Step 1 Icon" />
                    <h4>Saisissez les informations de votre bien</h4>
                    <p>Remplissez les caractéristiques principales de votre bien immobilier : localisation, type, surface, etc.</p>
                </div>
                <div className="how-it-works__step">
                    <img src="src/img/artificial.png" alt="Step 2 Icon" />
                    <h4>Laissez notre IA analyser le marché</h4>
                    <p>Notre algorithme IA compare votre bien avec les données du marché en temps réel pour générer une estimation précise.</p>
                </div>
                <div className="how-it-works__step">
                    <img src="src/img/report.png" alt="Step 3 Icon" />
                    <h4>Recevez une estimation détaillée</h4>
                    <p>Obtenez une estimation immédiate avec des comparaisons et des détails sur le marché immobilier à Montréal.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;