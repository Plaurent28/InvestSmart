#!/bin/bash

# Fonction pour déplacer un fichier si le fichier existe
move_if_exists() {
  if [ -e "$1" ]; then
    mv "$1" "$2"
    echo "Déplacé $1 vers $2"
  else
    echo "Fichier $1 introuvable, saut de cette étape."
  fi
}

# Création des répertoires
mkdir -p backend/api
mkdir -p backend/config
mkdir -p backend/controllers
mkdir -p backend/middleware
mkdir -p backend/models
mkdir -p backend/routes
mkdir -p backend/utils
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/contexts
mkdir -p src/layouts
mkdir -p src/lib
mkdir -p src/notifications
mkdir -p src/premium
mkdir -p src/reports
mkdir -p src/simulator
mkdir -p src/ui

# Déplacement des fichiers backend
move_if_exists api/auth.js backend/api/
move_if_exists api/banking.js backend/api/
move_if_exists api/index.js backend/api/
move_if_exists api/investments.js backend/api/
move_if_exists api/payments.js backend/api/
move_if_exists api/portfolios.js backend/api/
move_if_exists api/test.js backend/api/
move_if_exists api/users.js backend/api/
move_if_exists api/webhook.js backend/api/

move_if_exists config/db.js backend/config/
move_if_exists config/passport.js backend/config/
move_if_exists config/plaid.js backend/config/
move_if_exists config/stripe.js backend/config/

move_if_exists controllers/authController.js backend/controllers/

move_if_exists middleware/auth.js backend/middleware/
move_if_exists middleware/rateLimiter.js backend/middleware/
move_if_exists middleware/validator.js backend/middleware/

move_if_exists models/BankConnection.js backend/models/
move_if_exists models/Investment.js backend/models/
move_if_exists models/InvestmentHistory.js backend/models/
move_if_exists models/Payment.js backend/models/
move_if_exists models/Portfolio.js backend/models/
move_if_exists models/Subscription.js backend/models/
move_if_exists models/Transaction.js backend/models/
move_if_exists models/User.js backend/models/
move_if_exists models/UserPreferences.js backend/models/

move_if_exists routes/auth.js backend/routes/

move_if_exists utils/2fa.js backend/utils/

# Déplacement des fichiers src
move_if_exists App.jsx src/
move_if_exists App.test.js src/
move_if_exists axios.config.js src/
move_if_exists index.css src/
move_if_exists index.js src/
move_if_exists reportWebVitals.js src/
move_if_exists setupTests.js src/

# Déplacement des composants et utilitaires
move_if_exists components/common src/components/
move_if_exists contexts/AuthContext.jsx src/contexts/
move_if_exists layouts/* src/layouts/
move_if_exists lib/* src/lib/
move_if_exists notifications/* src/notifications/
move_if_exists premium/* src/premium/
move_if_exists reports/* src/reports/
move_if_exists simulator/* src/simulator/
move_if_exists ui/* src/ui/

# Déplacement des services et pages
move_if_exists pages/* src/pages/
move_if_exists services/* src/services/
move_if_exists utils/* src/utils/

# Suppression des répertoires vides
rmdir api config controllers middleware models routes utils components common contexts layouts lib notifications premium reports simulator ui 2>/dev/null || true