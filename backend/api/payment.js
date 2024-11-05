const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.sk_test_51QHPRBKnNbCUmSR7E4lxWycUsrnZXLed526rt00tNkknuLmvm9CotBLd4Fz9ebmSk7HzfzD1uKYmcW9irRdD2wp500EyAd7pL2);

// Endpoint pour initier un paiement
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card']
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;