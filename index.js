//documentation: https://mongoosejs.com/

const mongoose = require('mongoose');           //import du module mongoose
const connectDatabase = require('./db');
require('./models/blog.model');
require('./models/user.model');


// Définir le modèle de Blog
let Blog = mongoose.model('Blog');

// Définir le modèle de User
let User = mongoose.model('User');

                    /*******************************************************
                     * CREATION D'OBJET ET ENREGISTRENT EN BASE DE DONNEES
                     ****************************************************** */


const createBlog = async () => {
    try {
         // Attendre la connexion à la base de données
        await connectDatabase();

         // Créer une nouvelle instance de Blog
        const blog = new Blog({
            titre: 'Premier Blog',
            contenu: 'Je suis en train de créer un 1er blog avec MongoDb'
        });

         // Enregistrer le blog dans la base de données
        await blog.save();
        console.log('blog créé en bdd');

    } catch (error) {
        console.error('Erreur lors de la création du blog:', error);
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
    }
}
// createBlog();





//je peux créer et enregistrer en bdd la méthode insertMany() de Mongoose pour insérer plusieurs documents dans la base de données en une seule opération
const createMethod_uneListedeDocuments = async () => {
    try {
        // Attendre la connexion à la base de données
       await connectDatabase();

      // Créer et enregistrer une liste de blogs en base de données en utilisant Blog.insertMany() qui un tableau de documents sous forme d'objets
       const blogs = await Blog.insertMany([
        {
            titre: 'blog5',
            contenu: 'ce blog 3 est enregistré avec d\'autres en même temps'
        },
        {
            titre: 'blog6',
            contenu: 'ce blog 4 est enregistré avec d\'autres en même temps'
        }

       ])

       console.log('blog créé en bdd', blogs);

   } catch (error) {
       console.error('Erreur lors de la création du blog:', error);
   } finally {
       // Fermer la connexion à la base de données lorsque vous avez terminé
       mongoose.connection.close();
   }
}
// createMethod_uneListedeDocuments();


// Modèle pour un utilisateur
// let User = mongoose.model('User');  défini en haut du fichier

// Exemple d'utilisation
const registerUser = async () => {
    try {
        await connectDatabase();

        // Création d'un nouvel utilisateur
        const utilisateur = new User({
            nomUtilisateur: 'utilisateur2',
            motDePasse: 'motdepasse123'
        });

        // Enregistrement de l'utilisateur dans la base de données
        await utilisateur.save();

        console.log('Utilisateur enregistré avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    } finally {
        // Fermeture de la connexion à la base de données
        mongoose.connection.close();
    }
};

// registerUser();

let mailUser = 'toto@gmail.com'
let password = 'motdepasse123'

// je peux créer en base de données avec la méthode create() de Mongoose
const createMethod2 = async () => {
    try {
        // Attendre la connexion à la base de données
       await connectDatabase();
      
       const utilisateur1 = new User({
        email:mailUser,
        motDePasse: password
    });
    
      // Créer et enregistrer le blog en base de données en utilisant Blog.create()
       const blog2 = await Blog.create({
        titre: " blog avec différent type donnés",
        contenu: "Création de mon blog avec plusieurs type donnés qui peuvent être enregistrés et manipulés avec MongoDb.",
        estArchive: true,
        nbrePage: 3,
        categories: ['voyage, découverte, sport'],
        auteur: {
            nom: 'Bob Dylan',
            adresse: 'rue des Lacs'
        },
        user: utilisateur1._id
       });
       await utilisateur1.save();

       console.log('blog créé en bdd', blog2);

   } catch (error) {
       console.error('Erreur lors de la création du blog:', error);
   } finally {
       // Fermer la connexion à la base de données lorsque vous avez terminé
       mongoose.connection.close();
   }
}
// createMethod2();


                    /*******************************************************
                     * LECTURE DE DATAS EN BASE DE DONNEES
                     ****************************************************** */

const readDataById = async () => {
    try {
        // Attendre la connexion à la base de données
        await connectDatabase();
        
        const result = await Blog.findById('65d619d3e26cd79f9bf8b4ed')

        console.log('datas de l\id : ', result);

    } catch (error) {
        console.error('Erreur lors de récupération de l\'id:', error);
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
    }
}
// readById();


const readAllDatas = async () => {
    try {
        // Attendre la connexion à la base de données
        await connectDatabase();
        
        const result = await Blog.find();

        console.log('-------------------toutes les documents de la collection Blogs : ', result);

    } catch (error) {
        console.error('Erreur lors de récupération de l\'id:', error);
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
    }
}
// readAllDatas();

const readAllDatas_withQueries = async () => {
    try {
        // Attendre la connexion à la base de données
        await connectDatabase();
        
        //on peut ajouter des queries(requêtes) de MongoDb
        // const result = await Blog.find().where('auteur.nom').equals('Bobby Dylan');
        // const result = await Blog.find().sort('dateCreation');
        const result = await Blog.find().sort({ dateCreation: -1 });            //requête MongoDb en utilisant les objets de l'application

        console.log('-------------------toutes les documents de la collection Blogs avec une requête: ', result);

    } catch (error) {
        console.error('Erreur lors de récupération de l\'id:', error);
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
    }
}
// readAllDatas_withQueries();


//METHODE populate() à revoir
const blog_du_user = async () => {
    try {
        // Attendre la connexion à la base de données
        await connectDatabase();

        // Exécuter une requête pour trouver tous les blogs et les peupler avec les utilisateurs correspondants
        const result = await Blog.find().populate('user').exec();

        console.log(result);
    } catch (error) {
        console.error('Erreur lors de la recherche des blogs de l\'utilisateur:', error);
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
    }
}
// blog_du_user();



                    /*******************************************************
                     * SUPPRIMER DES DATAS EN BASE DE DONNEES
                     ****************************************************** */

const updateOne_document = async () => {

    try {
        // Attendre la connexion à la base de données
        await connectDatabase();
    
        // Mettre à jour le document
        const document_id = { _id: '65d61bf5cdf168fdc4ef0f4f' };            //document à cibler
        const update_data =  { titre: 'I\'M THE NEW MODIFIED TITLE ' };     //champ à modifier avec sa nouvelle valeur

        const result = await Blog.updateOne(document_id, update_data);
        console.log('Document mis à jour avec succès:', result);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du document:', error);
      } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
      }
}; 
// updateOne_document();






                    /*******************************************************
                     * SUPPRIMER DES DATAS EN BASE DE DONNEES
                     ****************************************************** */

/*pour supprimer un document dans MongoDB à l'aide de Mongoose, vous pouvez utiliser la 
méthode findOneAndDelete() ou findByIdAndDelete().*/


const deleteOne_document = async () => {
    try {
        // Attendre la connexion à la base de données
        await connectDatabase();
        
        // Supprimer plusieurs documents avec l'ID spécifié
        const result = await Blog.deleteOne({ _id: '65d619d3e26cd79f9bf8b4ed' });
        console.log('Documents supprimés avec succès avec deleteOne():', result);
    } catch (error) {
        console.error('Erreur lors de la suppression des documents:', error);
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
    }
}
// deleteOne_document();

const deleteMany_documents = async () => {
    try {
        // Attendre la connexion à la base de données
        await connectDatabase();
        
        // Supprimer plusieurs documents avec l'ID spécifié
        const result = await Blog.deleteOne({ _id: '65d619d3e26cd79f9bf8b4ed' }, {_id: '65d61bf5cdf168fdc4ef0f4f'});
        console.log('Documents supprimés avec succès avec deleteMany():', result);
    } catch (error) {
        console.error('Erreur lors de la suppression des documents:', error);
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        mongoose.connection.close();
    }
}
// deleteMany_documents();


