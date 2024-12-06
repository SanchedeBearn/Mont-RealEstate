import React, { useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Prediction = () => {
    const navigate = useNavigate();
    const [estimation, setEstimation] = useState(null);

    const handleFormSubmit = async (event, formData) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            const simulatedEstimation = response.data.predicted_price;

            setEstimation(simulatedEstimation);

            localStorage.setItem('estimation', JSON.stringify(simulatedEstimation));
            navigate('/resultat');
        } catch (error) {
            console.error('Erreur lors de la prédiction :', error);
        }
    };

    const handleFormReset = () => {
        setEstimation(null);
        localStorage.removeItem('estimation');
    };

    return <Form onSubmit={handleFormSubmit} onReset={handleFormReset} />;
};

export default Prediction;