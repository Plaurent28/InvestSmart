import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { 
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
  AlertCircle,
  Check,
  Loader2
} from 'lucide-react';

const SystemeAuthentificationComplet = () => {
  const handleGoogleLogin = () => {
    // Ici viendra la logique d'authentification Google
    console.log('Connexion avec Google initiée');
  };
  const [currentView, setCurrentView] = useState('login'); // login, register, forgot-password
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validations, setValidations] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
    length: false
  });

  // Validation du mot de passe en temps réel
  const validatePassword = (password) => {
    setValidations({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
      length: password.length >= 8
    });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    validatePassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation d'une requête API
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#869D78' }}>
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0">
        {/* En-tête */}
        <CardHeader className="space-y-1">
          {currentView !== 'login' && (
            <button
              onClick={() => setCurrentView('login')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <ChevronLeft size={20} />
              Retour à la connexion
            </button>
          )}
          <CardTitle className="text-2xl">
            {currentView === 'login' && 'Connexion'}
            {currentView === 'register' && 'Créer un compte'}
            {currentView === 'forgot-password' && 'Réinitialisation du mot de passe'}
          </CardTitle>
          <p className="text-gray-600">
            {currentView === 'login' && 'Accédez à votre espace personnel'}
            {currentView === 'register' && 'Commencez à suivre vos investissements'}
            {currentView === 'forgot-password' && 'Nous vous enverrons un lien de réinitialisation'}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
            </div>

            {/* Mot de passe - Affiché pour login et register */}
            {currentView !== 'forgot-password' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation du mot de passe - Uniquement pour register */}
            {currentView === 'register' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={20} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#869D78] focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Critères de validation du mot de passe */}
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Le mot de passe doit contenir :</p>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries({
                      'Au moins 8 caractères': validations.length,
                      'Une lettre minuscule': validations.lowercase,
                      'Une lettre majuscule': validations.uppercase,
                      'Un chiffre': validations.number,
                      'Un caractère spécial': validations.special
                    }).map(([text, isValid]) => (
                      <div key={text} className="flex items-center gap-2">
                        {isValid ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <AlertCircle size={16} className="text-gray-400" />
                        )}
                        <span className={`text-sm ${isValid ? 'text-green-500' : 'text-gray-600'}`}>
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Connexion avec Google */}
            {currentView !== 'forgot-password' && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Ou continuer avec
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-[#869D78]"
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5">
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                  {currentView === 'login' ? 'Se connecter avec Google' : 'S\'inscrire avec Google'}
                </button>
              </>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#869D78] text-white py-2 px-4 rounded-lg hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-[#869D78] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {currentView === 'login' && 'Se connecter'}
                  {currentView === 'register' && 'Créer mon compte'}
                  {currentView === 'forgot-password' && 'Envoyer le lien'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Liens de navigation */}
            <div className="space-y-2 text-center">
              {currentView === 'login' && (
                <>
                  <button
                    type="button"
                    onClick={() => setCurrentView('forgot-password')}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Mot de passe oublié ?
                  </button>
                  <div className="text-sm">
                    Pas encore de compte ?{' '}
                    <button
                      type="button"
                      onClick={() => setCurrentView('register')}
                      className="text-[#869D78] hover:underline font-medium"
                    >
                      Créer un compte
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemeAuthentificationComplet;
