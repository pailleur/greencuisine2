// backend/routes/admin.js

const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../models/userModel');
const { deleteComment } = require('../models/commentModel');

// Obtenir tous les utilisateurs (admin seulement)
router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un utilisateur (admin seulement)
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteUser(id);
        res.status(200).json({ message: 'Utilisateur supprimé', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un commentaire (admin seulement)
router.delete('/comments/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteComment(id);
        res.status(200).json({ message: 'Commentaire supprimé', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
