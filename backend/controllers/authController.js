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
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("L'utilisateur existe déjà:", email);
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
    console.log('Utilisateur créé avec succès:', newUser);
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
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, twoFactorCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Utilisateur non trouvé:', email);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Mot de passe incorrect pour l\'utilisateur:', email);
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    if (user.twoFactorSecret) {
      if (!twoFactorCode) {
        console.error('Code 2FA requis pour l\'utilisateur:', email);
        return res.status(400).json({ message: 'Code 2FA requis' });
      }
      const isCodeValid = verifyToken(twoFactorCode, user.twoFactorSecret);
      if (!isCodeValid) {
        console.error('Code 2FA incorrect pour l\'utilisateur:', email);
        return res.status(401).json({ message: 'Code 2FA incorrect' });
      }
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Connexion réussie pour l\'utilisateur:', email);
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
  try {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Redirection OAuth réussie pour l\'utilisateur:', req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  } catch (error) {
    console.error('Erreur lors de la redirection OAuth:', error);
    res.status(500).json({ message: 'Erreur lors de la redirection OAuth' });
  }
};