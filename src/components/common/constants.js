// src/common/constants.js

export const COLORS = {
  PEA: '#3498db',
  'Compte-Titres': '#2ecc71',
  Crypto: '#f1c40f',
  Immobilier: '#e74c3c',
  SCPI: '#9b59b6',
  'Épargne': '#34495e'
};

export const INVESTMENT_CATEGORIES = {
  'PEA': ['Actions', 'ETF', 'Autres'],
  'Compte-Titres': ['Actions', 'ETF', 'Obligations', 'Autres'],
  'Crypto': ['Bitcoin', 'Ethereum', 'Autres'],
  'Immobilier': ['Résidence Principale', 'Locatif', 'Parking', 'Autres'],
  'SCPI': ['Bureaux', 'Commerce', 'Résidentiel', 'Diversifiée'],
  'Épargne': ['Livret A', 'LDDS', 'LEP', 'Autres']
};

export const PERIOD_LABELS = {
  day: '24h',
  week: '7 jours',
  month: '30 jours',
  year: '1 an'
};

export const APP_THEME = {
  primaryColor: '#869D78',
  primaryLight: '#9fb392',
  primaryDark: '#6d7f61',
  backgroundOpacity: '0.9',
  cardBackgroundColor: 'rgba(255, 255, 255, 0.9)'
};

export const CURRENCY_FORMATTER = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
});

export const PERCENTAGE_FORMATTER = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});