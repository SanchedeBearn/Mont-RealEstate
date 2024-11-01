import React from 'react';
import './Result.css';

const Result = ({ estimation }) => {
    return (
        <div className="result">
            <h2 className="result__title">Résultats</h2>
            <div className="result__estimation">
                <h3>Estimation</h3>
                <p>{estimation ? `${estimation} $CAD` : '------ $CAD'}</p>
            </div>
        </div>
    );
};

export default Result;