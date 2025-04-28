// backend/models/commentModel.js

const db = require('../config/db');


// Créer un commentaire
const createComment = (content, recipeId, userId, parentCommentId = null) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO comments (content, recipe_id, user_id, parent_comment_id) VALUES (?, ?, ?, ?)';
        db.query(sql, [content, recipeId, userId, parentCommentId], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};

// Récupérer tous les commentaires d'une recette
const getCommentsByRecipeId = (recipeId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM comments WHERE recipe_id = ? ORDER BY created_at ASC';
        db.query(sql, [recipeId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Supprimer un commentaire
const deleteComment = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM comments WHERE id = ?', [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = { createComment, getCommentsByRecipeId, deleteComment };
