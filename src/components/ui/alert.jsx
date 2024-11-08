// src/components/ui/alert.js

import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type = 'info', message }) => {
  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className={`p-4 rounded-md ${getColor()} mb-4`}>
      <p>{message}</p>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string.isRequired,
};

export default Alert;