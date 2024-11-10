// src/utils/helpers.js

/**
 * Retarde l'exécution d'une fonction
 * @param {Function} func - Fonction à retarder
 * @param {number} wait - Délai en ms
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Limite le nombre d'appels à une fonction
 * @param {Function} func - Fonction à limiter
 * @param {number} limit - Délai minimum entre les appels
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Génère un ID unique
 * @returns {string} ID unique
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Calcule la performance d'un investissement
 * @param {number} initial - Montant initial
 * @param {number} final - Montant final
 * @returns {number} Pourcentage de performance
 */
export const calculatePerformance = (initial, final) => {
  return ((final - initial) / initial) * 100;
};

/**
 * Calcule les intérêts composés
 * @param {number} principal - Capital initial
 * @param {number} rate - Taux d'intérêt annuel (en %)
 * @param {number} time - Durée en années
 * @param {number} frequency - Fréquence de composition par an
 * @returns {number} Montant final
 */
export const calculateCompoundInterest = (principal, rate, time, frequency = 12) => {
  const r = rate / 100 / frequency;
  const n = frequency * time;
  return principal * Math.pow(1 + r, n);
};

/**
 * Trie un tableau d'objets par propriété
 * @param {Array} array - Tableau à trier
 * @param {string} key - Clé de tri
 * @param {string} direction - 'asc' ou 'desc'
 */
export const sortArrayByKey = (array, key, direction = 'asc') => {
  return array.sort((a, b) => {
    if (direction === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
};

/**
 * Groupe un tableau d'objets par propriété
 * @param {Array} array - Tableau à grouper
 * @param {string} key - Clé de groupement
 * @returns {Object} Objets groupés
 */
export const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
};

/**
 * Conversion entre devises
 * @param {number} amount - Montant à convertir
 * @param {number} rate - Taux de conversion
 * @returns {number} Montant converti
 */
export const convertCurrency = (amount, rate) => {
  return amount * rate;
};

/**
 * Calcule la durée entre deux dates
 * @param {Date} start - Date de début
 * @param {Date} end - Date de fin
 * @returns {Object} Durée en années, mois, jours
 */
export const calculateDuration = (start, end) => {
  const diff = new Date(end) - new Date(start);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  return {
    years,
    months: months % 12,
    days: days % 30
  };
};