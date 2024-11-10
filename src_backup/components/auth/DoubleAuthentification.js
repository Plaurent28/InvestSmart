import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft, RefreshCcw } from 'lucide-react';

const DoubleAuthentification = ({ isMobile }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Timer pour le renvoi de code
  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Empêcher de coller plus d'un caractère
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Gérer la touche Backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    [...pastedData].forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Veuillez entrer un code complet');
      setIsLoading(false);
      return;
    }

    try {
      // Simulation de vérification
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (error) {
      setError('Code incorrect. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setTimer(30);
    // Ajoutez ici la logique pour renvoyer le code
    // await resendVerificationCode();
  };

  return (
    <div className={`
      min-h-screen bg-gray-100 flex flex-col
      ${isMobile ? 'p-4' : 'p-8'}
    `}>
      {/* Header avec bouton retour */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
      </div>

      <div className={`
        bg-white rounded-lg shadow-lg
        ${isMobile ? 'p-6' : 'p-8 max-w-md mx-auto w-full'}
      `}>
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h2 className={`
            mt-4 font-extrabold text-gray-900 text-center
            ${isMobile ? 'text-2xl' : 'text-3xl'}
          `}>
            Vérification en deux étapes
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w-sm">
            Nous avons envoyé un code à 6 chiffres à votre adresse email/téléphone
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Champs de code */}
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:ring-green-500"
              />
            ))}
          </div>

          {/* Bouton de validation */}
          <button
            type="submit"
            disabled={isLoading || code.join('').length !== 6}
            className={`
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              ${isLoading || code.join('').length !== 6
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }
            `}
          >
            {isLoading ? 'Vérification...' : 'Vérifier le code'}
          </button>

          {/* Renvoi de code */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-green-600 hover:text-green-500 flex items-center justify-center w-full"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Renvoyer le code
              </button>
            ) : (
              <p className="text-sm text-gray-600">
                Renvoyer le code dans {timer} secondes
              </p>
            )}
          </div>
        </form>

        {/* Aide */}
        <div className="mt-6 text-center">
          <Link
            to="/help"
            className="text-sm text-green-600 hover:text-green-500"
          >
            Besoin d'aide ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoubleAuthentification;