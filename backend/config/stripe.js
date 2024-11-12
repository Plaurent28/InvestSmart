const Stripe = require('stripe');
const stripe = new Stripe(process.env.pk_live_51QHPRBKnNbCUmSR7PMNHyQM9Cak7QvVpRgLVD7JzwJd8iLgrlgigQOhbDubd03qiLwqJAoJ8N8T906Siws1dpjWW00Eul2jJbY);
module.exports = stripe;