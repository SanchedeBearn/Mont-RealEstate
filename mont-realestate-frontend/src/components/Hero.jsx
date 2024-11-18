import React from 'react';
import { Link } from 'react-router-dom';
import './css/Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__overlay">
                <div className="hero__logo">
                    <img src="src/img/Mont-RealEstate.png" alt="Mont-RealEstate Logo" className="hero__logo"/>
                </div>
                <div className="hero__content">
                    <h2>Bienvenue sur Mont-RealEstate !</h2>
                    <p>Estimez facilement la valeur de votre bien immobilier à Montréal grâce à notre technologie IA</p>
                    <Link to="/prediction" className="button">Obtenez une estimation gratuite</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;