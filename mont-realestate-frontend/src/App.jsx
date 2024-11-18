import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Accueil from './pages/Accueil';
import Prediction from './pages/Prediction';
import About from './pages/About';
import Connexion from './pages/Connexion';
import CreerCompte from './pages/CreerCompte';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/prediction" element={<Prediction />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/creer_compte" element={<CreerCompte />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;