@echo off

:: Change directory to mont-realestate-frontend and run npm
echo Starting frontend server...
cd mont-realestate-frontend
start cmd /k "npm run dev"

:: Change directory to mont-realestate-backend and run Symfony server
echo Starting backend server...
cd ..\mont-realestate-backend
start cmd /k "symfony server:start"

echo All servers started. Close the windows to stop.
pause