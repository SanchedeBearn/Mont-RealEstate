import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/api/getEmail', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.email) {
                        setEmail(data.email);
                        setIsAuthenticated(true);
                    }
                })
                .catch(() => setIsAuthenticated(false));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1160) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header className="header">
                <div className="header__main">
                    <div className="header__logo">
                        <img src="src/img/Mont-RealEstate - Titre.png" alt="Mont-RealEstate" />
                    </div>

                    <div className="header__menu">
                        <nav className="header__nav">
                            <ul>
                                <li><Link to="/">Accueil</Link></li>
                                <li><Link to="/prediction">Estimer son bien</Link></li>
                                <li><Link to="/about">À propos</Link></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="header__actions">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/connexion">
                                    <button className="header__button button">Connexion</button>
                                </Link>
                                <Link to="/creer_compte">
                                    <button className="header__button button">Créer un compte</button>
                                </Link>
                            </>
                        ) : (
                            <div className="dropdown">
                                <img
                                    src="src/img/noprofil.jpeg"
                                    alt="Profil"
                                    className="dropdown-button"
                                />
                            </div>
                        )}
                    </div>

                    <button className="burger" onClick={toggleMenu}>
                        <span className="burger__line"></span>
                        <span className="burger__line"></span>
                        <span className="burger__line"></span>
                    </button>
                </div>
                {/* Menu dupliqué pour le burger */}
            {isMenuOpen && (
                <div className="menu-burger">
                    <hr className="separate-menu-header"/>
                    <ul>
                        <li><Link to="/" onClick={toggleMenu}>Accueil</Link></li>
                        <li><Link to="/prediction" onClick={toggleMenu}>Estimer son bien</Link></li>
                        <li><Link to="/about" onClick={toggleMenu}>À propos</Link></li>
                        <hr className="separate-nav-co-profile"/>
                        {isAuthenticated ? (
                            <>
                                <li><Link to="/profil" onClick={toggleMenu}>Profil</Link></li>
                                <li><Link to="/historique" onClick={toggleMenu}>Historique</Link></li>
                                <li>
                                    <button onClick={handleLogout}>Se déconnecter</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/connexion" onClick={toggleMenu}>Connexion</Link></li>
                                <li><Link to="/creer_compte" onClick={toggleMenu}>Créer un compte</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            )}
            </header>
        </>
    );
};

export default Header;
