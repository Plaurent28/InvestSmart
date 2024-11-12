// backend/config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const User = require('../models/User');

// Configuration Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Crée un nouvel utilisateur si aucun utilisateur n'est trouvé
          user = new User({
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
            googleId: profile.id,
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || ''
          });
          await user.save();
        }

        done(null, user);
      } catch (error) {
        console.error("Erreur Google OAuth:", error);
        done(error, false);
      }
    }
  )
);

// Sérialisation de l'utilisateur dans la session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Désérialisation de l'utilisateur depuis la session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Erreur lors de la désérialisation de l'utilisateur:", error);
    done(error, null);
  }
});

module.exports = passport;