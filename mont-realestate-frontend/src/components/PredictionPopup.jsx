import React from 'react';
import './css/PredictionPopup.css';

const PredictionPopup = ({ estimation, onClose }) => {
    return (
        <div className="popup">
            <div className="popup__content">
                <div className="result">
                    <button className="popup__close" onClick={onClose}>X</button>
                    <h2 className="result__title">Résultats</h2>
                    <div className="result__estimation">
                        <h3>Estimation</h3>
                        <p>{estimation ? `${estimation} $CAD` : '------ $CAD'}</p>
                    </div>
                </div>

                <div className="comparison">
                    <h3>Comparaison</h3>
                    <div className="comparison__graphs">
                        <div className="comparison__graph comparison__graph--pie"> {/* Graphique à insérer ici */} </div>
                        <div className="comparison__graph comparison__graph--bar"> {/* Graphique à insérer ici */} </div>
                    </div>
                </div>

                <div className="download-button">
                    <button className="button">Télécharger le rapport</button>
                </div>
            </div>
        </div>
    );
};

export default PredictionPopup;
