import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Accueil from './pages/Accueil';
import Prediction from './pages/Prediction';
import About from './pages/About';
import Connexion from './pages/Connexion';
import CreerCompte from './pages/CreerCompte';
import Resultat from './pages/Resultat';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/prediction" element={<Prediction />} />
                    <Route path="/resultat" element={<Resultat />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/creer_compte" element={<CreerCompte />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
