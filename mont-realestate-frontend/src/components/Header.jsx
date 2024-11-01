import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src="src/img/Mont-RealEstate - Titre.png" alt="Mont-RealEstate" className="header__logo"/>
            </div>
            <nav className="header__nav">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/prediction">Estimer son bien</a></li>
                    <li><a href="/about">À propos</a></li>
                </ul>
            </nav>
            <div className="header__actions">
                <button className="header__button">Connexion</button>
                <button className="header__button">Créer un compte</button>
            </div>
        </header>
    );
};

export default Header;