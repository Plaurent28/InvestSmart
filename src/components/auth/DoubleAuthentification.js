import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import {
  Smartphone,
  Mail,
  Shield,
  Settings,
  Key,
  QrCode,
  Copy,
  Check,
  RefreshCcw,
  AlertTriangle,
  ChevronRight,
  Download,
  Clock
} from 'lucide-react';

const DoubleAuthentification = () => {
  const [activeMethod, setActiveMethod] = useState('app');
  const [showQR, setShowQR] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([
    "ABCD-EFGH-IJKL",
    "MNOP-QRST-UVWX",
    "YZAB-CDEF-GHIJ",
    "KLMN-OPQR-STUV",
    "WXYZ-1234-5678"
  ]);
  const [copiedCode, setCopiedCode] = useState(false);

  const methods = [
    {
      id: 'app',
      title: 'Application d\'authentification',
      description: 'Utiliser Google Authenticator, Authy ou une autre application 2FA',
      icon: Smartphone,
      recommended: true
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Recevoir un code par email à chaque connexion',
      icon: Mail,
      recommended: false
    }
  ];

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#869D78' }}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* En-tête */}
        <div className="text-center text-white space-y-4">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Shield size={32} />
            Double Authentification (2FA)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Renforcez la sécurité de votre compte avec une deuxième étape de vérification
          </p>
        </div>

        {/* Choix de la méthode */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Choisir votre méthode de vérification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {methods.map((method) => (
              <div
                key={method.id}
                className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  activeMethod === method.id
                    ? 'border-[#869D78] bg-[#869D78]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveMethod(method.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    activeMethod === method.id ? 'bg-[#869D78]/10' : 'bg-gray-100'
                  }`}>
                    <method.icon size={24} className={
                      activeMethod === method.id ? 'text-[#869D78]' : 'text-gray-500'
                    } />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{method.title}</h3>
                      {method.recommended && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Recommandé
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {method.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Configuration App 2FA */}
        {activeMethod === 'app' && (
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Configuration de l'application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showQR ? (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <QrCode size={48} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600">
                      Scannez le QR code avec votre application d'authentification
                    </p>
                    <button
                      onClick={() => setShowQR(true)}
                      className="mt-4 px-6 py-2 bg-[#869D78] text-white rounded-lg hover:opacity-90"
                    >
                      Afficher le QR code
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg flex flex-col items-center gap-4">
                    <div className="w-48 h-48 bg-white p-4 rounded-lg">
                      {/* Simulated QR Code */}
                      <div className="w-full h-full bg-gray-200 rounded" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Code de sauvegarde :</p>
                      <p className="font-mono mt-1">XXXX XXXX XXXX XXXX</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Entrez le code généré par votre application :
                    </p>
                    <div className="flex gap-2">
                      {Array(6).fill(0).map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className="w-12 h-12 text-center text-2xl font-mono border rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Configuration Email 2FA */}
        {activeMethod === 'email' && (
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Vérification par email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-start gap-2">
                <AlertTriangle size={20} />
                <p className="text-sm">
                  La vérification par email est moins sécurisée que l'utilisation d'une application d'authentification.
                  Nous recommandons d'utiliser une application 2FA pour une meilleure protection.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email de vérification
                </label>
                <input
                  type="email"
                  value="utilisateur@example.com"
                  disabled
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Codes de secours */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Codes de secours</CardTitle>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <RefreshCcw size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={handleCopyBackupCodes}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  {copiedCode ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <Copy size={20} className="text-gray-600" />
                  )}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Download size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Conservez ces codes en lieu sûr. Ils vous permettront de récupérer l'accès à votre compte si vous perdez accès à votre méthode de vérification principale.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {backupCodes.map((code, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg font-mono text-center">
                    {code}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <Clock size={16} />
                <span>Codes générés le 3 novembre 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appareils de confiance */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Appareils de confiance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'MacBook Pro', location: 'Paris, France', lastUsed: 'Aujourd\'hui' },
                { name: 'iPhone 14', location: 'Paris, France', lastUsed: 'Il y a 2 heures' }
              ].map((device, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full">
                      <Smartphone size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-gray-600">
                        {device.location} • Dernière utilisation : {device.lastUsed}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Settings size={20} className="text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions de sécurité */}
        <Card className="bg-white/90 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Key, title: 'Changer le mot de passe', color: 'text-blue-600' },
                { icon: RefreshCcw, title: 'Révoquer toutes les sessions', color: 'text-red-600' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <action.icon size={20} className={action.color} />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conseil de sécurité */}
        <div className="text-center text-white/80 text-sm">
          <p>
            Activez la double authentification sur tous vos comptes sensibles pour une sécurité optimale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoubleAuthentification;