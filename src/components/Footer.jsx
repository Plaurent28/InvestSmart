// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-white py-4 border-t text-center text-gray-500">
      <p>© 2024 InvestSmart. Tous droits réservés.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link to="/privacy-policy" className="hover:underline">
          Politique de confidentialité
        </Link>
        <Link to="/terms-of-service" className="hover:underline">
          Conditions d'utilisation
        </Link>
      </div>
    </footer>
  );
}

export default Footer;