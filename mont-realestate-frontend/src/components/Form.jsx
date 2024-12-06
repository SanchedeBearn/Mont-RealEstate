import React, { useState, useEffect, useRef } from 'react';
import './css/Form.css';
import { geocodeAddress } from '../utils/geocoding'; // Utilisation d'une fonction de géocodage

const Form = ({ onSubmit, onReset }) => {
    const titleRef = useRef(null);
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [bathrooms, setBathrooms] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [surface, setSurface] = useState(100);
    const [errors, setErrors] = useState({}); // Gestion des erreurs

    // Charger les valeurs depuis le localStorage au montage
    useEffect(() => {
        const savedAddress = localStorage.getItem('address');
        const savedPostalCode = localStorage.getItem('postalCode');
        const savedBathrooms = localStorage.getItem('bathrooms');
        const savedBedrooms = localStorage.getItem('bedrooms');
        const savedSurface = localStorage.getItem('surface');

        if (savedAddress) setAddress(savedAddress);
        if (savedPostalCode) setPostalCode(savedPostalCode);
        if (savedBathrooms) setBathrooms(Number(savedBathrooms));
        if (savedBedrooms) setBedrooms(Number(savedBedrooms));
        if (savedSurface) setSurface(Number(savedSurface));
    }, []);

    // Observer pour les animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => {
            if (titleRef.current) {
                observer.unobserve(titleRef.current);
            }
        };
    }, []);

    const validateInputs = async () => {
        const errors = {};

        // Vérifier le code postal (Montréal : commence par H)
        const postalCodeRegex = /^H\d[A-Z]\s?\d[A-Z]\d$/;
        if (!postalCodeRegex.test(postalCode)) {
            errors.postalCode = 'Le code postal doit être valide et appartenir à Montréal (commençant par H).';
        }

        // Vérifier si l'adresse existe
        const location = await geocodeAddress(`${address}, ${postalCode}, Montréal`);
        if (!location) {
            errors.address = "L'adresse n'existe pas dans le code postal fourni.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0 ? location : null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation des entrées
        const location = await validateInputs();
        if (!location) return;

        // Si tout est bon, sauvegarder dans localStorage
        localStorage.setItem('address', address);
        localStorage.setItem('postalCode', postalCode);
        localStorage.setItem('bathrooms', bathrooms);
        localStorage.setItem('bedrooms', bedrooms);
        localStorage.setItem('surface', surface);

        // Soumettre les données avec la latitude/longitude
        const formData = {
            latitude: location.lat,
            longitude: location.lng,
            bathrooms,
            bedrooms,
            surface,
        };

        onSubmit(event, formData);
    };

    const handleReset = () => {
        // Réinitialiser les états et effacer le localStorage
        setAddress('');
        setPostalCode('');
        setBathrooms(1);
        setBedrooms(1);
        setSurface(100);
        localStorage.removeItem('address');
        localStorage.removeItem('postalCode');
        localStorage.removeItem('bathrooms');
        localStorage.removeItem('bedrooms');
        localStorage.removeItem('surface');
        setErrors({});
        if (onReset) onReset();
    };

    return (
        <div className="form">
            <h2 className="form__title" ref={titleRef}>
                Estimer votre bien
            </h2>
            <form onSubmit={handleSubmit} className="form__content">
                <div className="form__group">
                    <label htmlFor="address">Adresse :</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    {errors.address && <p className="error">{errors.address}</p>}
                </div>
                <div className="form__group">
                    <label htmlFor="postalCode">Code postal :</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                    {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                </div>
                <div className="form__group">
                    <label htmlFor="bedrooms">Nombre de chambres :</label>
                    <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        min="0"
                        required
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="bathrooms">Nombre de salles de bain :</label>
                    <input
                        type="number"
                        id="bathrooms"
                        name="bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        min="0"
                        required
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="surface">Surface du bien (en pi²) :</label>
                    <input
                        type="number"
                        id="surface"
                        name="surface"
                        value={surface}
                        onChange={(e) => setSurface(Number(e.target.value))}
                        min="0"
                        required
                    />
                </div>
                <div className="form__buttons">
                    <button type="submit" className="button">
                        Soumettre les informations
                    </button>
                    <button type="button" className="button" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
