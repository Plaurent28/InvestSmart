import React from 'react';

const GreenHeader = () => (
  <div className="flex items-center justify-between p-6 bg-gradient-to-b from-white/10 to-transparent">
    <h1 className="text-white text-2xl font-bold">Mon Portfolio</h1>
    <button className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors">
      <span>Ajouter un investissement</span>
    </button>
  </div>
);

export default GreenHeader;