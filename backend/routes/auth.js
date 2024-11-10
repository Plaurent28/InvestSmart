// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { validateRequest } = require('../middleware/validator');
const apiLimiter = require('../middleware/rateLimiter');
const authController = require('../controllers/authController');

// Route pour l'inscription
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Mot de passe de 8 caractères minimum'),
    validateRequest,
    apiLimiter
  ],
  authController.registerUser // Assurez-vous que cette fonction existe dans authController
);

// Route pour la connexion
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').exists().withMessage('Mot de passe requis'),
    validateRequest,
    apiLimiter
  ],
  authController.loginUser // Assurez-vous que cette fonction existe dans authController
);

// Route pour le logout
router.post('/logout', authMiddleware, authController.logoutUser); // Assurez-vous que cette fonction existe dans authController

// Ajoutez les autres routes ici si nécessaire, comme pour le 2FA, etc.

module.exports = router;