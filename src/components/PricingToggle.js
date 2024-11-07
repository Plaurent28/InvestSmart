// src/components/PricingToggle.js
import React from 'react';

const PricingToggle = ({ billingPeriod, setBillingPeriod }) => (
  <div className="toggle-container flex justify-center items-center space-x-4 mb-12">
    <div className="bg-white rounded-lg p-1 shadow-sm inline-flex">
      <button
        onClick={() => setBillingPeriod('monthly')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          billingPeriod === 'monthly' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Mensuel
      </button>
      <button
        onClick={() => setBillingPeriod('annual')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          billingPeriod === 'annual' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Annuel
      </button>
    </div>
    {billingPeriod === 'annual' && (
      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
        16% de réduction
      </span>
    )}
  </div>
);

export default PricingToggle;