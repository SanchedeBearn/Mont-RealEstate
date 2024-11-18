import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './pages/css/index.css'
import App from './App.jsx'


/*
TODO : Faire en sorte que l'entrainement de l'IA se fasse tous les x temps pour comparer l'evolution des prix
et ainsi avoir des graphiques d'evolution des prix dans l'historique des analyses pour chaque utilisateur et pourquoi pas
meme faire des predictions de l'evolution des prix dans le futur

*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
