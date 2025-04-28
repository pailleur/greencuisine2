// backend/routes/recipes.js

const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes } = require('../models/recipeModel');

// Créer une nouvelle recette
router.post('/', async (req, res) => {
    const { title, description, ingredients, steps, userId } = req.body;
    try {
        const recipe = await createRecipe(title, description, ingredients, steps, userId);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir toutes les recettes publiques
router.get('/', async (req, res) => {
    try {
        const recipes = await getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
