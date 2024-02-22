const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, required: true 
    },
    motDePasse: { 
        type: String, required: true 
    },
    dateCreation: {
        type: Date,                             //validation intégrées
        default: Date.now()
    },
});

userSchema.pre('save', async function(next) {
    if (this.isModified('motDePasse')) {
        try {
            // Hacher le mot de passe avec bcrypt
            this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
            next();
        } catch (error) {
            next(error); // Passer l'erreur au middleware suivant
        }
    } else {
        next(); // Si le mot de passe n'a pas été modifié, passer à l'étape suivante
    }
});

// Middleware post pour journaliser les détails d'une opération de sauvegarde
userSchema.post('save', function(doc) {
    console.log('Utilisateur sauvegardé avec succès :', doc);
});


mongoose.model('User', userSchema);