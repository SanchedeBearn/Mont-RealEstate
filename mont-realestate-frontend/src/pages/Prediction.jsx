import React, { useState } from 'react';
import Form from '../components/Form';
import Result from '../components/Result';
import Comparison from '../components/Comparison';
import DownloadButton from '../components/DownloadButton';

const Prediction = () => {
    const [estimation, setEstimation] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Simuler une estimation
        setEstimation(500000); // Valeur fictive pour l'estimation
    };

    const handleFormReset = () => {
        setEstimation(null);
    };

    return (
        <div className="prediction">
            <Form onSubmit={handleFormSubmit} onReset={handleFormReset} />
            <Result estimation={estimation} />
            <Comparison />
            <DownloadButton />
        </div>
    );
};

export default Prediction;