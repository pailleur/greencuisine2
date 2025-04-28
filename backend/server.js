const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Charger les variables d'environnement
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

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
