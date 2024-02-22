# cours_mongoDB
## Téléchargement des outils
### 1- Télécharger MongoDB Community server
### 2- Télécharger MongoDB Compass (interface utilisateur)

## Configuration du projet avec Node.js (lignes de commandes)
### 1- npm init -y
### 2- npm i mongoose -save
### 3- nodemon

## Connexion à la base de données 
 const mongoose = require('mongoose');


async function connectDatabase () {
    try {
        await mongoose.connect('mongodb://localhost:PORT/NOM_DATABSE');
        console.log('connexion réussie');
    } catch (error) {
        console.log('non connecté',error)
    }
}

 connectDatabase();

## Démarrer le server
### nodemon "nom_du_fichier"

