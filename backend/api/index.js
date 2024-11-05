const express = require('express');
const router = express.Router();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Importation des routes
const authRoutes = require('./auth');
const userRoutes = require('./users');
const portfolioRoutes = require('./portfolios');
const investmentRoutes = require('./investments');
const bankingRoutes = require('./banking');
const paymentRoutes = require('./payment');
const webhookRoutes = require('./webhook');

// Middleware de sécurité
router.use(helmet());
router.use(cors());
router.use(morgan('combined'));
router.use(express.json());

// Routes avec préfixes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/investments', investmentRoutes);
router.use('/banking', bankingRoutes);
router.use('/payment', paymentRoutes);
router.use('/webhooks/stripe', webhookRoutes);

// Middleware d'erreur global
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(JSON.stringify({
    error: 'Une erreur est survenue',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  }));
});

module.exports = router;