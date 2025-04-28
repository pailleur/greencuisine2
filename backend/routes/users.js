// backend/routes/users.js

const express = require('express');
const router = express.Router();
const { createUser } = require('../models/userModel');

// Inscription utilisateur
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await createUser(name, email, password, 'user');
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
