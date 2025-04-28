const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2'); // <-- À ajouter
const app = express();

// Charger les variables d'environnement
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données MySQL (via Aiven)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 14341, // Port spécifique pour Aiven
    ssl: {
        rejectUnauthorized: true // Obligatoire pour Aiven
    }
});

// Vérification de la connexion
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err.message);
    } else {
        console.log('Connexion réussie à MySQL (Aiven).');
    }
});

// Rendre la connexion disponible dans d'autres modules
module.exports = db;

// Importation des routes
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');
const favoriteRoutes = require('./routes/favorites');
const adminRoutes = require('./routes/admin');

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur GreenCuisine V2 démarré sur http://localhost:${PORT}`);
});
