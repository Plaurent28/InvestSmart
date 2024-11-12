oimport React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';

const ForgotPasswordForm = ({ email, setEmail, onBack, onSubmit, resetEmailSent }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
      setError('');
    } else {
      setError('Veuillez saisir votre adresse e-mail');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la connexion
        </button>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Réinitialisation du mot de passe
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {resetEmailSent ? (
            <div className="text-center">
              <Alert className="bg-green-50 border-green-200 mb-4">
                <AlertDescription>
                  Un email de réinitialisation a été envoyé à {email}. Veuillez vérifier votre boîte de réception.
                </AlertDescription>
              </Alert>
              <button
                onClick={onBack}
                className="text-green-600 hover:text-green-800"
              >
                Retour à la connexion
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                  Adresse e-mail
                </label>
                <div className="mt-1">
                  <input
                    id="reset-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Envoyer les instructions
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;