const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { validateRequest } = require('../middleware/validator');
const apiLimiter = require('../middleware/rateLimiter');
const { generateTOTP, verifyTOTP } = require('../utils/2fa');
const User = require('../models/User'); // Correction de l'import du modèle
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     description: Inscription d'un nouvel utilisateur
 *     parameters:
 *       - name: email
 *         description: Email de l'utilisateur
 *         required: true
 *       - name: password
 *         description: Mot de passe
 *         required: true
 */
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    validateRequest,
    apiLimiter,
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'Inscription réussie' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
  }
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Connexion utilisateur
 */
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists(),
    validateRequest,
    apiLimiter,
  ],
  async (req, res) => {
    try {
      const { email, password, totpToken } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      if (user.is2FAEnabled) {
        if (!totpToken || !verifyTOTP(totpToken, user.twoFactorSecret)) {
          return res.status(403).json({ message: 'Code 2FA invalide ou manquant' });
        }
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur de connexion' });
    }
  }
);

module.exports = router;