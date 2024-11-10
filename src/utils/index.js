// src/utils/index.js

// Import et re-export des formateurs
export {
    // Ajoutez ici vos exports de formatters.js
    formatDate,
    formatCurrency,
    formatNumber,
    formatPercentage
} from './formatters';

// Import et re-export des validateurs
export {
    // Ajoutez ici vos exports de validators.js
    validateEmail,
    validatePassword,
    validateForm,
    validatePhoneNumber,
    isRequired,
    minLength,
    maxLength,
    isEmail,
    isNumeric
} from './validators';

// Import et re-export des helpers
export {
    // Ajoutez ici vos exports de helpers.js
    capitalizeFirstLetter,
    debounce,
    throttle,
    generateUniqueId,
    deepClone,
    isEmpty,
    isObject,
    isArray,
    sleep,
    retry
} from './helpers';

// Import et re-export des composants placeholder
export {
    createPlaceholderImage,
    createLoadingPlaceholder,
    createTextPlaceholder,
    createAvatarPlaceholder
} from './createPlaceholderComponents';

// Configuration Axios
export { default as axiosConfig } from './axios.config';

// Vous pouvez aussi exporter des constantes utiles
export const CONSTANTS = {
    API_URL: process.env.REACT_APP_API_URL,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    DEFAULT_PAGINATION_LIMIT: 10,
    DATE_FORMAT: 'DD/MM/YYYY',
    CURRENCY: 'EUR'
};

// Export de fonctions utilitaires supplémentaires
export const utils = {
    // Fonctions de date
    formatDateToISO: (date) => date.toISOString(),
    isValidDate: (date) => date instanceof Date && !isNaN(date),
    
    // Fonctions de string
    truncate: (str, length = 100) => 
        str.length > length ? `${str.substring(0, length)}...` : str,
    slugify: (str) => 
        str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    
    // Fonctions de tableau
    chunk: (arr, size) => 
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        ),
    unique: (arr) => [...new Set(arr)],
    
    // Fonctions d'objet
    pick: (obj, keys) => 
        keys.reduce((acc, key) => (key in obj ? { ...acc, [key]: obj[key] } : acc), {}),
    omit: (obj, keys) => 
        Object.keys(obj)
            .filter(key => !keys.includes(key))
            .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
};

// Export des types communs (si vous utilisez TypeScript)
export const types = {
    ERROR_TYPES: {
        VALIDATION_ERROR: 'VALIDATION_ERROR',
        NETWORK_ERROR: 'NETWORK_ERROR',
        AUTH_ERROR: 'AUTH_ERROR',
        NOT_FOUND: 'NOT_FOUND'
    },
    USER_ROLES: {
        ADMIN: 'ADMIN',
        USER: 'USER',
        GUEST: 'GUEST'
    },
    STATUS: {
        PENDING: 'PENDING',
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR'
    }
};