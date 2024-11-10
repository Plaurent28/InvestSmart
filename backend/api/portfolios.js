const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { validateRequest } = require('../middleware/validator');
const { Portfolio, Investment } = require('../models/Portfolio');

router.use(authMiddleware);

/**
 * @swagger
 * /api/portfolios/summary:
 *   get:
 *     description: Récupère le résumé du portfolio
 */
router.get('/summary', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id })
      .populate('investments');
    
    const summary = {
      totalValue: portfolio.calculateTotalValue(),
      performance: await portfolio.calculatePerformance(),
      allocation: portfolio.getCurrentAllocation(),
      risk: portfolio.calculateRiskMetrics()
    };
    
    res.json(JSON.stringify(summary));
  } catch (error) {
    res.status(500).json(JSON.stringify({ error: 'Erreur lors de la récupération du résumé' }));
  }
});

/**
 * @swagger
 * /api/portfolios/assets/{type}:
 *   get:
 *     description: Récupère les détails par type d'actif
 */
router.get('/assets/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const assets = await Investment.find({
      userId: req.user._id,
      type
    });
    
    const details = {
      assets,
      totalValue: assets.reduce((sum, asset) => sum + asset.currentValue, 0),
      performance: calculateTypePerformance(assets)
    };
    
    res.json(JSON.stringify(details));
  } catch (error) {
    res.status(500).json(JSON.stringify({ error: 'Erreur lors de la récupération des actifs' }));
  }
});

// Nouvelles routes recommandées
router.post('/rebalance', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id });
    const rebalancingPlan = await portfolio.generateRebalancingPlan();
    res.json(JSON.stringify(rebalancingPlan));
  } catch (error) {
    res.status(500).json(JSON.stringify({ error: 'Erreur lors du rééquilibrage' }));
  }
});

module.exports = router;