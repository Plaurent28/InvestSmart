const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.sk_test_51QHPRBKnNbCUmSR7E4lxWycUsrnZXLed526rt00tNkknuLmvm9CotBLd4Fz9ebmSk7HzfzD1uKYmcW9irRdD2wp500EyAd7pL2);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Gérer les différents événements Stripe ici
    if (event.type === 'customer.subscription.created') {
        const subscription = event.data.object;
        console.log(`Nouvelle souscription : ${subscription.id}`);
    }
    // Autres événements à gérer...
    
    res.json({ received: true });
});
module.exports = router;