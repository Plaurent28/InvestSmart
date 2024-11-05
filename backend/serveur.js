const express = require('express');
const mongoose = require('mongoose'); // Assurez-vous que mongoose est importé ici
const connectDB = require('./config/db');
const apiRoutes = require('./api');
const paymentsRouter = require('./api/payments');

const app = express();

// Configurer strictQuery pour Mongoose
mongoose.set('strictQuery', true);

// Connecter la base de données
connectDB();

// Middleware pour analyser le JSON
app.use(express.json());

// Utiliser les routes de l'API
app.use('/api/payments', paymentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});