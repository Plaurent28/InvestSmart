// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateSecret, verifyToken } = require('../utils/2fa');

// Fonction pour l'inscription de l'utilisateur
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const twoFactorSecret = generateSecret().base32;

    const newUser = new User({
      email,
      password: hashedPassword,
      twoFactorSecret,
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

// Fonction pour la connexion de l'utilisateur
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, twoFactorCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    if (user.twoFactorSecret) {
      if (!twoFactorCode) {
        return res.status(400).json({ message: 'Code 2FA requis' });
      }
      const isCodeValid = verifyToken(twoFactorCode, user.twoFactorSecret);
      if (!isCodeValid) {
        return res.status(401).json({ message: 'Code 2FA incorrect' });
      }
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

// Fonction pour la déconnexion de l'utilisateur
exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    res.status(500).json({ message: 'Erreur lors de la déconnexion' });
  }
};

// Fonction de redirection après la connexion OAuth réussie
exports.oauthSuccessRedirect = (req, res) => {
  // Générer un jeton JWT pour l'utilisateur authentifié
  const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Rediriger vers le frontend avec le token JWT comme paramètre d'URL
  res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
};