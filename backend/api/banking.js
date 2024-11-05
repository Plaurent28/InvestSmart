const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { BankConnection, Transaction } = require('../models');
const { plaidClient } = require('../config/plaid');

router.use(authMiddleware);

/**
 * @swagger
 * /api/banking/connect:
 *   post:
 *     description: Connecte un compte bancaire
 */
router.post('/connect', async (req, res) => {
  try {
    const { publicToken, accountId } = req.body;
    const accessToken = await plaidClient.exchangePublicToken(publicToken);
    
    await BankConnection.create({
      userId: req.user._id,
      accessToken,
      accountId
    });
    
    res.json({ message: 'Compte connecté avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur de connexion bancaire' });
  }
});

/**
 * @swagger
 * /api/banking/accounts:
 *   get:
 *     description: Liste des comptes bancaires
 */
router.get('/accounts', async (req, res) => {
  try {
    const connections = await BankConnection.find({ userId: req.user._id });
    const accounts = [];
    
    for (const connection of connections) {
      const accountInfo = await plaidClient.getAccounts(connection.accessToken);
      accounts.push(...accountInfo.accounts);
    }
    
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de récupération des comptes' });
  }
});

// Nouvelles routes recommandées
router.post('/verify-account', async (req, res) => {
  try {
    const { accountId } = req.body;
    const verification = await plaidClient.verifyAccount(accountId);
    res.json(verification);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de vérification' });
  }
});

module.exports = router;