import React, { useState } from 'react';

const Form = () => {
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Estimation demandée pour :", location, propertyType);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Localisation :
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </label>
            <label>
                Type de bien :
                <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="studio">Studio</option>
                </select>
            </label>
            <button type="submit">Estimer le bien</button>
        </form>
    );
};

export default Form;