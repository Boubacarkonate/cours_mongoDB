const mongoose = require('mongoose');


async function connectDatabase () {
    try {
        await mongoose.connect('mongodb://localhost:27017/testMongoose');
        console.log('connexion réussie');
    } catch (error) {
        console.log('non connecté',error)
    }
}

// connectDatabase();

module.exports = connectDatabase;