// backend/models/favoriteModel.js

const db = require('../config/db');

// Ajouter un favori
const addFavorite = (userId, recipeId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)';
        db.query(sql, [userId, recipeId], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};

// Récupérer les favoris d'un utilisateur
const getFavoritesByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT recipes.* FROM favorites
            JOIN recipes ON favorites.recipe_id = recipes.id
            WHERE favorites.user_id = ?
        `;
        db.query(sql, [userId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = { addFavorite, getFavoritesByUserId };
