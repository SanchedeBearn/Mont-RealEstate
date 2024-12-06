from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib  # Pour charger le modèle
import pandas as pd
import os
import xgboost as xgb

# Créer une application Flask
app = Flask(__name__)
CORS(app)  # Autorise toutes les origines pour simplifier le test

# Ajout de logs pour le chargement du modèle
try:
    model_path = os.path.join(os.path.dirname(__file__), 'model.json')
    print(f"Chemin du modèle : {model_path}")
    model = xgb.Booster()
    model.load_model(model_path)  # Chargez le modèle au format XGBoost
    print("Modèle XGBoost chargé avec succès.")
except FileNotFoundError as e:
    print("Erreur : fichier modèle introuvable :", str(e))
except Exception as e:
    print("Erreur lors du chargement du modèle :", str(e))

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Récupérer les données JSON envoyées par le frontend
        data = request.json

        # Préparer les données pour le modèle
        input_data = pd.DataFrame([{
            "Latitude": data.get("latitude"),
            "Longitude": data.get("longitude"),
            "Nb_Chambres": data.get("bedrooms"),
            "Nb_Salles_de_bain": data.get("bathrooms"),
            "Pieds_carrés": data.get("surface"),
        }])
        print("Données reçues pour la prédiction :", input_data)

        # Convertir les données en DMatrix pour XGBoost
        dmatrix = xgb.DMatrix(input_data)

        # Effectuer la prédiction
        prediction = model.predict(dmatrix)[0]
        print("Prédiction effectuée :", prediction)

        return jsonify({"predicted_price": float(prediction)}), 200
    except Exception as e:
        print("Erreur lors de la prédiction :", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Démarrage de l'application Flask...")
    app.run(host="0.0.0.0", port=5000)