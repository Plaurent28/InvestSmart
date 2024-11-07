// Liste des endpoints avec leurs méthodes HTTP et descriptions
{
  "users": {
    "auth": {
      "POST /api/auth/register": {
        "description": "Inscription d'un nouvel utilisateur",
        "body": {
          "email": "string",
          "password": "string",
          "firstName": "string",
          "lastName": "string"
        }
      },
      "POST /api/auth/login": {
        "description": "Connexion utilisateur",
        "body": {
          "email": "string",
          "password": "string"
        }
      },
      "POST /api/auth/2fa/setup": {
        "description": "Configuration 2FA",
        "requiresAuth": true
      },
      "POST /api/auth/2fa/verify": {
        "description": "Vérification code 2FA"
      }
    },
    "profile": {
      "GET /api/users/me": {
        "description": "Récupération profil utilisateur",
        "requiresAuth": true
      },
      "PUT /api/users/me": {
        "description": "Mise à jour profil",
        "requiresAuth": true
      },
      "GET /api/users/preferences": {
        "description": "Récupération préférences",
        "requiresAuth": true
      }
    }
  },

  "portfolios": {
    "GET /api/portfolios/summary": {
      "description": "Résumé du portfolio",
      "requiresAuth": true,
      "response": {
        "totalValue": "number",
        "performance": {
          "day": "number",
          "week": "number",
          "month": "number",
          "year": "number"
        },
        "distribution": "array"
      }
    },
    "GET /api/portfolios/assets/{type}": {
      "description": "Détail par type d'actif",
      "requiresAuth": true,
      "params": {
        "type": "enum (PEA, CTO, etc.)"
      }
    }
  },

  "investments": {
    "POST /api/investments": {
      "description": "Ajout investissement",
      "requiresAuth": true,
      "body": {
        "type": "string",
        "category": "string",
        "name": "string",
        "amount": "number",
        "date": "date",
        "notes": "string?"
      }
    },
    "PUT /api/investments/{id}": {
      "description": "Mise à jour investissement",
      "requiresAuth": true
    },
    "DELETE /api/investments/{id}": {
      "description": "Suppression investissement",
      "requiresAuth": true
    },
    "GET /api/investments/history": {
      "description": "Historique des transactions",
      "requiresAuth": true,
      "query": {
        "startDate": "date?",
        "endDate": "date?",
        "type": "string?"
      }
    }
  },

  