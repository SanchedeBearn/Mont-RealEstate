import React from 'react';
import './css/Form.css';

const Form = ({ onSubmit, onReset }) => {
    return (
        <div className="form" method="POST" enctype="multipart/form-data">
            <h2 className="form__title">Estimer votre bien</h2>
            <form onSubmit={onSubmit} className="form__content">
                <div className="form__group">
                    <label htmlFor="address">Adresse :</label>
                    <input type="text" id="address" name="address" value="1324 Papineau Avenue" required />
                </div>
                <div className="form__group">
                    <label htmlFor="postalCode">Code postal :</label>
                    <input type="text" id="postalCode" name="postalCode" value="H2K 4J5" required />
                </div>
                <div className="form__group">
                    <label htmlFor="bathrooms">Nombre de salles de bain :</label>
                    <input type="number" id="bathrooms" name="bathrooms" value="2" min="0" required />
                </div>
                <div className="form__group">
                    <label htmlFor="bedrooms">Nombre de chambres :</label>
                    <input type="number" id="bedrooms" name="bedrooms" value="2" min="0" required />
                </div>
                <div className="form__group">
                    <label htmlFor="surface">Surface du bien (en pi²) :</label>
                    <input type="number" id="surface" name="surface" value="100" min="0" required />
                </div>
                <div className="form__group">
                    <label htmlFor="inputImage">Photos du bien :</label>
                    <input type="file" id="inputImage" name="imageUpload" accept="image/*" min="4" multiple />
                </div>
                <div className="form__buttons">
                    <button type="submit" className="button">Soumettre les informations</button>
                    <button type="reset" className="button" onClick={onReset}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
