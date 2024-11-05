const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String, // Hashed
    firstName: String,
    lastName: String,
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date,
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    twoFactorAuth: {
        enabled: Boolean,
        secret: String,
        backupCodes: [String]
    },
    subscription: {
        plan: { type: String, enum: ["free", "premium"], default: "free" },
        startDate: Date,
        endDate: Date,
        status: String
    }
});

module.exports = mongoose.model('User', UserSchema);