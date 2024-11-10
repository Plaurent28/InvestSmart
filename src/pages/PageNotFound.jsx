import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

const PageNotFound = ({ isMobile }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      {/* Container principal */}
      <div className={`
        bg-white rounded-lg shadow-xl 
        text-center max-w-md w-full 
        ${isMobile ? 'p-6' : 'p-8'}
      `}>
        {/* Icône d'erreur */}
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full p-3">
            <AlertTriangle 
              className="text-red-500" 
              size={isMobile ? 32 : 48}
            />
          </div>
        </div>

        {/* Titre */}
        <h1 className={`
          font-bold text-gray-900 mt-6
          ${isMobile ? 'text-4xl' : 'text-6xl'}
        `}>
          404
        </h1>

        {/* Message d'erreur */}
        <div className="mt-4 space-y-2">
          <p className={`
            text-gray-600
            ${isMobile ? 'text-lg' : 'text-xl'}
          `}>
            Page non trouvée
          </p>
          <p className="text-gray-500 text-sm">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className={`
          flex flex-col sm:flex-row items-center justify-center gap-4 
          mt-8 
          ${isMobile ? 'space-y-3 sm:space-y-0' : ''}
        `}>
          {/* Bouton retour */}
          <button 
            onClick={() => window.history.back()}
            className={`
              flex items-center gap-2 px-4 py-2
              text-gray-600 hover:text-gray-900
              bg-gray-100 hover:bg-gray-200
              rounded-lg transition-colors
              ${isMobile ? 'w-full justify-center sm:w-auto' : ''}
            `}
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>

          {/* Bouton accueil */}
          <Link 
            to="/"
            className={`
              flex items-center gap-2 px-4 py-2
              text-white
              bg-green-600 hover:bg-green-700
              rounded-lg transition-colors
              ${isMobile ? 'w-full justify-center sm:w-auto' : ''}
            `}
          >
            <Home size={20} />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>

      {/* Message supplémentaire */}
      <p className="mt-8 text-sm text-gray-500">
        Besoin d'aide ? {' '}
        <Link 
          to="/help" 
          className="text-green-600 hover:text-green-700 hover:underline"
        >
          Contactez notre support
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;