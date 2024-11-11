// src/components/ui/card.js
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      {children}
    </div>
  );
};

export default Card;