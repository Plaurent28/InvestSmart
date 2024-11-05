const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return res.status(400).json(JSON.stringify({ error: `Webhook error: ${err.message}` }));
    }

    // Gérer les différents événements Stripe ici
    if (event.type === 'customer.subscription.created') {
        const subscription = event.data.object;
        console.log(`Nouvelle souscription : ${subscription.id}`);
    }
    // Autres événements à gérer...
    
    res.json(JSON.stringify({ received: true }));
});

module.exports = router;