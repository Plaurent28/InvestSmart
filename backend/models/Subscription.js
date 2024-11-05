const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stripeSubscriptionId: { type: String, required: true },
    status: { type: String, required: true },
    plan: { type: String, enum: ['free', 'premium'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);