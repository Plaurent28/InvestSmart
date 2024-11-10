// src/utils/validators.js

/**
 * Valide une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} True si l'email est valide
 */
export const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };
  
  /**
   * Valide un mot de passe
   * @param {string} password - Mot de passe à valider
   * @returns {Object} Objet contenant isValid et les erreurs
   */
  export const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une minuscule');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  /**
   * Valide un montant
   * @param {number|string} amount - Montant à valider
   * @param {Object} options - Options de validation
   * @returns {boolean} True si le montant est valide
   */
  export const validateAmount = (amount, { min = 0, max = Infinity } = {}) => {
    const numAmount = Number(amount);
    return !isNaN(numAmount) && numAmount >= min && numAmount <= max;
  };
  
  /**
   * Valide un IBAN français
   * @param {string} iban - IBAN à valider
   * @returns {boolean} True si l'IBAN est valide
   */
  export const validateIBAN = (iban) => {
    const regex = /^FR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{3}$/;
    return regex.test(iban.replace(/\s/g, ''));
  };
  
  /**
   * Valide un numéro de téléphone français
   * @param {string} phone - Numéro à valider
   * @returns {boolean} True si le numéro est valide
   */
  export const validatePhoneNumber = (phone) => {
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return regex.test(phone);
  };
  
  /**
   * Valide un formulaire entier
   * @param {Object} formData - Données du formulaire
   * @param {Object} validationRules - Règles de validation
   * @returns {Object} Erreurs de validation
   */
  export const validateForm = (formData, validationRules) => {
    const errors = {};
    
    Object.keys(validationRules).forEach(field => {
      const value = formData[field];
      const rules = validationRules[field];
      
      if (rules.required && !value) {
        errors[field] = 'Ce champ est requis';
      }
      if (rules.minLength && value.length < rules.minLength) {
        errors[field] = `Minimum ${rules.minLength} caractères requis`;
      }
      if (rules.email && !validateEmail(value)) {
        errors[field] = 'Email invalide';
      }
      if (rules.phone && !validatePhoneNumber(value)) {
        errors[field] = 'Numéro de téléphone invalide';
      }
      if (rules.iban && !validateIBAN(value)) {
        errors[field] = 'IBAN invalide';
      }
    });
    
    return errors;
  };