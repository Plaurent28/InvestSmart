const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stripeSubscriptionId: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
    amount: Number,
    currency: String,
    interval: String, // "month" ou "year"
});

module.exports = mongoose.model('Payment', PaymentSchema);