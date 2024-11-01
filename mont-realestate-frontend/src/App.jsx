import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Accueil from './pages/Accueil';
import Prediction from './pages/Prediction';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/prediction" element={<Prediction />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;