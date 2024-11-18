import React, { useState } from 'react';
import Form from '../components/Form';
import PredictionPopup from '../components/PredictionPopup';

const Prediction = () => {
    const [estimation, setEstimation] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Simulation d'estimation
        setEstimation(500000);
        setIsPopupOpen(true);
    };

    const handleFormReset = () => {
        setEstimation(null);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="prediction">
            <Form onSubmit={handleFormSubmit} onReset={handleFormReset} />
            {isPopupOpen && <PredictionPopup estimation={estimation} onClose={handleClosePopup} />}
        </div>
    );
};

export default Prediction;