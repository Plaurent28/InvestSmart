// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { validateRequest } = require('../middleware/validator');
const apiLimiter = require('../middleware/rateLimiter');
const authController = require('../controllers/authController'); // Vérifiez que cette importation est correcte

// Route pour l'inscription
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Mot de passe de 8 caractères minimum'),
    validateRequest,
    apiLimiter
  ],
  authController.registerUser
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
  authController.loginUser
);

// Route pour le logout
router.post('/logout', authMiddleware, authController.logoutUser);

// Route OAuth Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback Google OAuth
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.oauthSuccessRedirect // Assurez-vous que cette fonction existe dans authController
);

module.exports = router;