// backend/routes/favorites.js

const express = require('express');
const router = express.Router();
const { addFavorite, getFavoritesByUserId } = require('../models/favoriteModel');

// Ajouter une recette aux favoris
router.post('/', async (req, res) => {
    const { userId, recipeId } = req.body;
    try {
        const favorite = await addFavorite(userId, recipeId);
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir les favoris d'un utilisateur
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const favorites = await getFavoritesByUserId(userId);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
