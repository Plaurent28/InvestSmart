const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const { validateRequest } = require('../middleware/validator');
const { User, UserPreferences } = require('../models');
const rateLimiter = require('../middleware/rateLimiter');

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     description: Récupère le profil de l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur récupéré avec succès
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -refreshToken')
      .populate('preferences');

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Ajout des informations de portfolio si nécessaire
    const userWithPortfolio = await enrichUserWithPortfolioData(user);
    
    res.json({
      status: 'success',
      data: userWithPortfolio
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     description: Met à jour le profil utilisateur
 */
router.put('/me', 
  [
    authMiddleware,
    body('email').optional().isEmail().normalizeEmail(),
    body('fullName').optional().trim().isLength({ min: 2, max: 50 }),
    body('phoneNumber').optional().matches(/^\+?[\d\s-]+$/),
    validateRequest
  ],
  async (req, res) => {
    try {
      const allowedUpdates = ['email', 'fullName', 'phoneNumber', 'notificationSettings'];
      const updates = {};
      
      // Filtrer les champs autorisés
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      // Si changement d'email, vérifier qu'il n'est pas déjà utilisé
      if (updates.email) {
        const existingUser = await User.findOne({ 
          email: updates.email, 
          _id: { $ne: req.user._id } 
        });
        if (existingUser) {
          return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password -refreshToken');

      res.json({
        status: 'success',
        message: 'Profil utilisateur mis à jour',
        data: user
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
});

/**
 * @swagger
 * /api/users/preferences:
 *   get:
 *     description: Récupère les préférences de l'utilisateur
 */
router.get('/preferences', authMiddleware, async (req, res) => {
  try {
    const preferences = await UserPreferences.findOne({ userId: req.user._id });
    
    if (!preferences) {
      // Créer des préférences par défaut si elles n'existent pas
      const defaultPreferences = await UserPreferences.create({
        userId: req.user._id,
        language: 'fr',
        theme: 'light',
        riskProfile: 'moderate',
        investmentPreferences: {
          stocks: true,
          bonds: true,
          crypto: false,
          realEstate: false
        },
        notificationSettings: {
          email: true,
          push: true,
          sms: false
        }
      });
      
      return res.json({
        status: 'success',
        message: 'Préférences par défaut créées',
        data: defaultPreferences
      });
    }

    res.json({
      status: 'success',
      data: preferences
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des préférences' });
  }
});

/**
 * @swagger
 * /api/users/preferences:
 *   put:
 *     description: Met à jour les préférences utilisateur
 */
router.put('/preferences',
  [
    authMiddleware,
    body('language').optional().isIn(['fr', 'en']),
    body('theme').optional().isIn(['light', 'dark']),
    body('riskProfile').optional().isIn(['conservative', 'moderate', 'aggressive']),
    body('investmentPreferences').optional().isObject(),
    body('notificationSettings').optional().isObject(),
    validateRequest
  ],
  async (req, res) => {
    try {
      const preferences = await UserPreferences.findOneAndUpdate(
        { userId: req.user._id },
        { $set: req.body },
        { new: true, runValidators: true, upsert: true }
      );

      // Si les préférences de notification ont changé, mettre à jour les services concernés
      if (req.body.notificationSettings) {
        await updateNotificationServices(req.user._id, req.body.notificationSettings);
      }

      // Si le profil de risque a changé, recalculer les recommandations
      if (req.body.riskProfile) {
        await recalculateInvestmentRecommendations(req.user._id);
      }

      res.json({
        status: 'success',
        message: 'Préférences mises à jour',
        data: preferences
      });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour des préférences' });
    }
});

/**
 * Fonctions utilitaires
 */
const enrichUserWithPortfolioData = async (user) => {
  // Enrichir l'utilisateur avec les données de portfolio
  try {
    const portfolioSummary = await Portfolio.findOne({ userId: user._id })
      .select('totalValue performance lastUpdate');
    return { ...user.toObject(), portfolio: portfolioSummary };
  } catch (error) {
    console.error('Error enriching user with portfolio data:', error);
    return user;
  }
};

const updateNotificationServices = async (userId, settings) => {
  // Mettre à jour les préférences de notification dans les services externes
  try {
    if (settings.push) {
      await NotificationService.updatePushPreferences(userId);
    }
    if (settings.email) {
      await NotificationService.updateEmailPreferences(userId);
    }
    if (settings.sms) {
      await NotificationService.updateSMSPreferences(userId);
    }
  } catch (error) {
    console.error('Error updating notification services:', error);
  }
};

const recalculateInvestmentRecommendations = async (userId) => {
  // Recalculer les recommandations d'investissement basées sur le nouveau profil
  try {
    const recommendations = await InvestmentService.generateRecommendations(userId);
    await Portfolio.findOneAndUpdate(
      { userId },
      { $set: { recommendations } }
    );
  } catch (error) {
    console.error('Error recalculating investment recommendations:', error);
  }
};

module.exports = router;