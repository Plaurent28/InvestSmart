require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./api');
const paymentsRouter = require('./api/payments');
const authRoutes = require('./routes/auth'); // Nouveau import pour les routes d'auth

const app = express();

// Configuration de base
mongoose.set('strictQuery', true);
connectDB();

// Middleware
app.use(cors()); // Ajouter CORS pour les requêtes du frontend
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Nouvelles routes d'authentification
app.use('/api/payments', paymentsRouter);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Route par défaut
app.get('/', (req, res) => {
  res.json({ message: 'API InvestSmart' });
});

// Gérer les routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.log('Erreur non gérée:', err);
  // En production, vous voudrez peut-être gérer cela différemment
});