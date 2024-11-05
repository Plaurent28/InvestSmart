const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { validateRequest } = require('../middleware/validator');
const { Investment } = require('../models');
const { body } = require('express-validator');

router.use(authMiddleware);

/**
 * @swagger
 * /api/investments:
 *   post:
 *     description: Crée un nouvel investissement
 */
router.post('/',
  [
    body('amount').isNumeric(),
    body('type').isIn(['stocks', 'bonds', 'crypto', 'real_estate']),
    validateRequest
  ],
  async (req, res) => {
    try {
      const investment = await Investment.create({
        ...req.body,
        userId: req.user._id
      });
      
      // Mettre à jour le portfolio
      await Portfolio.updateInvestments(req.user._id);
      
      res.status(201).json(JSON.stringify(investment));
    } catch (error) {
      res.status(500).json(JSON.stringify({ error: 'Erreur lors de la création' }));
    }
});

// ... autres routes investments

module.exports = router;