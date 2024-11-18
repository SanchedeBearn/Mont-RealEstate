import React from 'react';
import './css/About.css';

const About = () => {
    return (
        <div className="about">
            <h1>À propos de Mont-RealEstate</h1>
            <section className="about__intro">
                <p>
                    Bienvenue sur <strong>Mont-RealEstate</strong>, votre solution pour estimer facilement la valeur de votre bien immobilier à Montréal grâce à notre technologie IA. Que vous souhaitiez obtenir une estimation rapide ou analyser les tendances du marché, notre outil est conçu pour vous fournir des résultats précis et pertinents.
                </p>
            </section>

            <section className="about__features">
                <h2>Ce que Mont-RealEstate vous permet de faire :</h2>
                <ul>
                    <li>
                        Obtenir une <strong>estimation précise</strong> de la valeur de votre bien immobilier à Montréal, en quelques clics seulement.
                    </li>
                    <li>
                        Comparer votre bien avec des <strong>données de marché actuelles</strong> pour mieux comprendre les tendances de prix dans votre quartier.
                    </li>
                    <li>
                        Recevoir un rapport détaillé avec des graphiques et des informations de comparaison pour chaque estimation effectuée.
                    </li>
                </ul>
            </section>

            <section className="about__info">
                <h2>Informations nécessaires pour l'estimation :</h2>
                <p>
                    Afin de vous fournir une estimation précise, notre outil vous demandera de renseigner :
                </p>
                <ul>
                    <li>Adresse complète du bien</li>
                    <li>Code postal</li>
                    <li>Nombre de salles de bain et de chambres</li>
                    <li>Surface du bien en pieds carrés</li>
                    <li>Photos du bien (optionnel)</li>
                </ul>
                <p>
                    Ces informations nous permettent de générer une estimation basée sur des données de marché actuelles et des modèles de régression prédictive.
                </p>
            </section>

            <section className="about__account">
                <h2>Création de compte et avantages :</h2>
                <p>
                    En créant un compte sur <strong>Mont-RealEstate</strong>, vous pourrez :
                </p>
                <ul>
                    <li>Accéder à un <strong>historique de vos estimations</strong>, pour suivre l'évolution des valeurs de vos biens dans le temps.</li>
                    <li>Enregistrer vos biens pour des analyses rapides et régulières sans devoir renseigner les mêmes informations à chaque fois.</li>
                </ul>
                <p>
                    Créer un compte est rapide et vous offre un accès privilégié à des fonctionnalités avancées pour une expérience utilisateur optimale.
                </p>
            </section>
        </div>
    );
};

export default About;