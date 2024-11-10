const speakeasy = require('speakeasy');

function generateSecret() {
  return speakeasy.generateSecret();
}

function getToken(secret) {
  return speakeasy.totp({ secret, encoding: 'base32' });
}

function verifyToken(token, secret) {
  return speakeasy.totp.verify({ token, secret, encoding: 'base32' });
}

module.exports = { generateSecret, getToken, verifyToken };