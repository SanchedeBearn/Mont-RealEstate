@echo off

:: Démarrage du serveur Python pour le modèle ML
echo Starting Python ML server...
cd mont-realestate-ml
start cmd /k "python app.py"

:: Démarrage du serveur Frontend
echo Starting frontend server...
cd ..\mont-realestate-frontend
start cmd /k "npm run dev"

:: Démarrage du serveur Backend Symfony
echo Starting backend server...
cd ..\mont-realestate-backend
start cmd /k "symfony server:start"



echo All servers started. Close the windows to stop.
pause
