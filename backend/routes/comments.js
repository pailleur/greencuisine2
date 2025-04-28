// backend/routes/comments.js

const express = require('express');
const router = express.Router();
const { createComment, getCommentsByRecipeId, deleteComment } = require('../models/commentModel');

// Ajouter un commentaire
router.post('/', async (req, res) => {
    const { content, recipeId, userId, parentCommentId } = req.body;
    try {
        const comment = await createComment(content, recipeId, userId, parentCommentId);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir les commentaires d'une recette
router.get('/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const comments = await getCommentsByRecipeId(recipeId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
