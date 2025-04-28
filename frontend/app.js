// frontend/app.js

const apiUrl = 'http://localhost:3001/api'; // À adapter si besoin (ex: Railway)

// Inscription
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role: 'user' })
            });
            if (res.ok) {
                alert('Inscription réussie !');
                window.location.href = 'login.html';
            } else {
                alert('Erreur lors de l\'inscription.');
            }
        } catch (error) {
            console.error(error);
        }
    });
}

// Connexion (simple simulation)
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'dashboard.html'; // Simulation rapide sans auth réelle
    });
}

// Charger les recettes publiques
const recipesList = document.getElementById('recipes-list');
if (recipesList) {
    fetch(`${apiUrl}/recipes`)
        .then(res => res.json())
        .then(recipes => {
            recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <button onclick="viewRecipe(${recipe.id})">Voir la recette</button>
                `;
                recipesList.appendChild(card);
            });
        });
}

// Voir une recette
function viewRecipe(id) {
    localStorage.setItem('currentRecipeId', id);
    window.location.href = 'recipe.html';
}

// Détail d'une recette
const recipeDetail = document.getElementById('recipe-detail');
if (recipeDetail) {
    const recipeId = localStorage.getItem('currentRecipeId');
    fetch(`${apiUrl}/recipes`)
        .then(res => res.json())
        .then(recipes => {
            const recipe = recipes.find(r => r.id == recipeId);
            if (recipe) {
                recipeDetail.innerHTML = `
                    <h2>${recipe.title}</h2>
                    <p>${recipe.description}</p>
                    <h4>Ingrédients</h4>
                    <p>${recipe.ingredients}</p>
                    <h4>Étapes</h4>
                    <p>${recipe.steps}</p>
                    <span class="favorite-icon" onclick="addToFavorites(${recipe.id})">⭐</span>
                `;
            }
        });
}

// Ajouter en favori
function addToFavorites(recipeId) {
    const userId = 1; // À remplacer par vrai ID utilisateur une fois authentification ajoutée
    fetch(`${apiUrl}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, recipeId })
    }).then(res => {
        if (res.ok) {
            alert('Recette ajoutée aux favoris !');
        } else {
            alert('Erreur ajout favoris.');
        }
    });
}

// Charger les favoris
const favoritesList = document.getElementById('favorites-list');
if (favoritesList) {
    const userId = 1; // Idem ici : remplacer plus tard
    fetch(`${apiUrl}/favorites/${userId}`)
        .then(res => res.json())
        .then(favorites => {
            favorites.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                `;
                favoritesList.appendChild(card);
            });
        });
}

// Dashboard utilisateur (ajout rapide de recette à simuler)
const addRecipeBtn = document.getElementById('add-recipe');
if (addRecipeBtn) {
    addRecipeBtn.addEventListener('click', () => {
        const title = prompt('Titre de la recette :');
        const description = prompt('Description :');
        const ingredients = prompt('Ingrédients :');
        const steps = prompt('Étapes :');
        const userId = 1; // À remplacer plus tard

        fetch(`${apiUrl}/recipes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, ingredients, steps, userId })
        }).then(res => {
            if (res.ok) {
                alert('Recette ajoutée !');
                window.location.reload();
            } else {
                alert('Erreur ajout recette.');
            }
        });
    });
}
