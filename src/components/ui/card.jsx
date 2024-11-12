import React from 'react';

export const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white rounded-lg shadow ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 flex items-center ${className}`} {...props}>
    {children}
  </div>
);

// Si Alert, AlertTitle et AlertDescription sont dans ce fichier, définis-les ci-dessous, sinon supprime cette section.
export const Alert = ({ className = '', children, ...props }) => (
  <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`} {...props}>
    {children}
  </div>
);

export const AlertTitle = ({ className = '', children, ...props }) => (
  <h5 className={`font-bold ${className}`} {...props}>
    {children}
  </h5>
);

export const AlertDescription = ({ className = '', children, ...props }) => (
  <p className={`text-sm ${className}`} {...props}>
    {children}
  </p>
);

// Export unique de tous les composants définis dans ce fichier
export { CardHeader, CardTitle, CardContent, CardFooter, Alert, AlertTitle, AlertDescription };