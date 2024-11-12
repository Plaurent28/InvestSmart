import React from 'react';

// Card Component
export const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white rounded-lg shadow ${className}`} {...props}>
    {children}
  </div>
);

// Card Header Component
export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

// Card Title Component
export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

// Card Content Component
export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Card Footer Component
export const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 flex items-center ${className}`} {...props}>
    {children}
  </div>
);

// Alert Components (optional, only if required in this file)
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

// Export unique pour éviter tout doublon
export { CardHeader, CardTitle, CardContent, CardFooter, Alert, AlertTitle, AlertDescription };