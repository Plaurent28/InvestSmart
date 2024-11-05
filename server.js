const express = require('express');
const path = require('path');
const app = express();

// Middleware pour servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'build')));

// Middleware pour parser le JSON
app.use(express.json());

// Route de base pour l'API
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Route catch-all pour servir l'application React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Port d'écoute
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});