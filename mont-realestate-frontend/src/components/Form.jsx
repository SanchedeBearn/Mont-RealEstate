import React from 'react';
import './Form.css';

const Form = ({ onSubmit, onReset }) => {
    return (
        <div className="form">
            <h2 className="form__title">Estimer votre bien</h2>
            <form onSubmit={onSubmit} className="form__content">
                <label>Adresse :
                    <input type="text" name="address" required />
                </label>
                <label>Ville :
                    <input type="text" name="city" required />
                </label>
                <label>Code postal :
                    <input type="text" name="postalCode" required />
                </label>
                <label>Nombre de salles de bain :
                    <input type="number" name="bathrooms" required />
                </label>
                <label>Nombre de chambres :
                    <input type="number" name="bedrooms" required />
                </label>
                <label>Surface du bien (en pi²) :
                    <input type="number" name="surface" required />
                </label>
                <div className="form__buttons">
                    <button type="submit">Soumettre les informations</button>
                    <button type="reset" onClick={onReset}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default Form;