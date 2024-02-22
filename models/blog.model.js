const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    titre: String,
    contenu: String,
    estArchive: Boolean,
    nbrePage: Number,
    categories: [String],
    auteur: {
        nom: String,
        adresse: String
    },
    dateCreation: {
        type: Date,                             //validation intégrées
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

mongoose.model('Blog', blogSchema);

