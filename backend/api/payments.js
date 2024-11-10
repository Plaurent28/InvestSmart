const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
// Endpoint pour initier un paiement
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card']
        });
        res.json(JSON.stringify({ clientSecret: paymentIntent.client_secret }));
    } catch (error) {
        res.status(500).json(JSON.stringify({ error: error.message }));
    }
});

module.exports = router;