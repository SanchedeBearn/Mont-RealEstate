import React from 'react';
import './css/Form.css';

const Form = ({ onSubmit, onReset }) => {
    return (
        <div className="form" method="POST" enctype="multipart/form-data">
            <h2 className="form__title">Estimer votre bien</h2>
            <form onSubmit={onSubmit} className="form__content">
                <label>Adresse :
                    <input type="text" name="address" value="1324 Papineau Avenue" required/>
                </label>
                <label>Code postal :
                    <input type="text" name="postalCode" value="H2K 4J5" required />
                </label>
                <label>Nombre de salles de bain :
                    <input type="number" name="bathrooms" value="2" min="0" required />
                </label>
                <label>Nombre de chambres :
                    <input type="number" name="bedrooms" value="2" min="0" required />
                </label>
                <label>Surface du bien (en pi²) :
                    <input type="number" name="surface" value="100" min="0" required />
                </label>
                <label>Photos du bien :
                    <input type="file" id="inputImage" name="imageUpload" accept="image/*" min="4" multiple/>
                </label>
                <div className="form__buttons">
                    <button type="submit" className="button">Soumettre les informations</button>
                    <button type="reset" className="button" onClick={onReset}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default Form;