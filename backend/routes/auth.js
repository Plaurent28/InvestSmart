// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Routes publiques
router.post('/register', authController.register);
router.post('/login', authController.login);

// Routes protégées (nécessitent une authentification)
router.use(auth); // Middleware d'authentification pour toutes les routes suivantes

// Vérification du token et récupération des informations utilisateur
router.get('/verify', authController.verifyToken);

// Déconnexion
router.post('/logout', authController.logout);

// Changement de mot de passe
router.post('/change-password', authController.changePassword);

// Route pour mettre à jour le profil utilisateur (si vous l'ajoutez plus tard)
// router.put('/update-profile', authController.updateProfile);

// Route pour la suppression du compte (si vous l'ajoutez plus tard)
// router.delete('/delete-account', authController.deleteAccount);

// Gestion du mot de passe oublié (si vous l'ajoutez plus tard)
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password/:token', authController.resetPassword);

// Export du router
module.exports = router;