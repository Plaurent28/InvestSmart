#!/bin/bash
# Ajouter le script de démarrage au package.json
echo '{ "scripts": { "start": "node server.js" } }' > /var/app/staging/package.json.tmp
jq -s '.[0] * .[1]' /var/app/staging/package.json /var/app/staging/package.json.tmp > /var/app/staging/package.json.new
mv /var/app/staging/package.json.new /var/app/staging/package.json
rm /var/app/staging/package.json.tmp