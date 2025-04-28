// backend/models/userModel.js

const db = require('../config/db');

// Créer un nouvel utilisateur
const createUser = (name, email, password, role = 'user') => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, password, role], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};


// Récupérer tous les utilisateurs
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Supprimer un utilisateur
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = { createUser, getAllUsers, deleteUser };
