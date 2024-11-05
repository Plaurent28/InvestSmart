const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['PEA', 'CTO', 'Crypto', 'Immobilier', 'SCPI', 'Épargne'] },
  name: String,
  createdAt: { type: Date, default: Date.now },
  lastUpdate: Date,
  totalValue: Number,
  performances: {
    day: Number,
    week: Number,
    month: Number,
    year: Number
  },
  settings: {
    color: String,
    visible: Boolean
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);