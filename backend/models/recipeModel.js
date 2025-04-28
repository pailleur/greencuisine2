// backend/models/recipeModel.js

const db = require('../config/db');

// Créer une nouvelle recette
const createRecipe = (title, description, ingredients, steps, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO recipes (title, description, ingredients, steps, user_id) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [title, description, ingredients, steps, userId], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};

// Récupérer toutes les recettes
const getAllRecipes = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM recipes', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = { createRecipe, getAllRecipes };
