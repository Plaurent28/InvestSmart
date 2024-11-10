// src/utils/formatters.js

/**
 * Formate un montant en euros
 * @param {number} amount - Montant à formater
 * @param {string} locale - Locale à utiliser (par défaut: fr-FR)
 * @returns {string} Montant formaté (ex: 1 234,56 €)
 */
export const formatCurrency = (amount, locale = 'fr-FR') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };
  
  /**
   * Formate un pourcentage
   * @param {number} value - Valeur à formater
   * @param {number} decimals - Nombre de décimales (par défaut: 2)
   * @returns {string} Pourcentage formaté (ex: 12,34%)
   */
  export const formatPercentage = (value, decimals = 2) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  };
  
  /**
   * Formate une date
   * @param {Date|string} date - Date à formater
   * @param {string} format - Format souhaité ('short', 'long', 'full')
   * @returns {string} Date formatée
   */
  export const formatDate = (date, format = 'short') => {
    const dateObj = new Date(date);
    const options = {
      short: { day: '2-digit', month: '2-digit', year: 'numeric' },
      long: { day: '2-digit', month: 'long', year: 'numeric' },
      full: { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    };
    
    return dateObj.toLocaleDateString('fr-FR', options[format]);
  };
  
  /**
   * Formate un grand nombre
   * @param {number} value - Nombre à formater
   * @param {number} decimals - Nombre de décimales
   * @returns {string} Nombre formaté avec séparateurs
   */
  export const formatNumber = (value, decimals = 0) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };
  
  /**
   * Formate un IBAN
   * @param {string} iban - IBAN à formater
   * @returns {string} IBAN formaté avec espaces
   */
  export const formatIBAN = (iban) => {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };
  
  /**
   * Formate un numéro de téléphone français
   * @param {string} phone - Numéro à formater
   * @returns {string} Numéro formaté (ex: 06 12 34 56 78)
   */
  export const formatPhoneNumber = (phone) => {
    return phone.replace(/(.{2})/g, '$1 ').trim();
  };