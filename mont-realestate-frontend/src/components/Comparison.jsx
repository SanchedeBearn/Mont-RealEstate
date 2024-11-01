import React from 'react';
import './Comparison.css';

const Comparison = () => {
    return (
        <div className="comparison">
            <h3>Comparaison</h3>
            <div className="comparison__graphs">
                <div className="comparison__graph comparison__graph--pie"> {/* Placez l'image du graphique ici si nécessaire */} </div>
                <div className="comparison__graph comparison__graph--bar"> {/* Placez l'image du graphique ici si nécessaire */} </div>
            </div>
        </div>
    );
};

export default Comparison;