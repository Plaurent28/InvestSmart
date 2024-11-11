#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Début de la réorganisation des fichiers...${NC}\n"

# Fonction pour déplacer les fichiers
move_files() {
  local source=$1
  local dest=$2
  if [ -d "$source" ] && [ -d "$dest" ]; then
    mv $source/* $dest/ 2>/dev/null || true
    echo "Déplacé les fichiers de $source vers $dest"
  fi
}

# Déplacer les composants vers features
move_files "src/components/auth" "src/features/auth"
move_files "src/components/dashboard" "src/features/dashboard"
move_files "src/components/account" "src/features/account"
move_files "src/components/premium" "src/features/premium"
move_files "src/components/admin" "src/features/admin"
move_files "src/components/connections" "src/features/connections"
move_files "src/components/news" "src/features/news"
move_files "src/components/notifications" "src/features/notifications"
move_files "src/components/reports" "src/features/reports"
move_files "src/components/simulator" "src/features/simulator"

# Déplacer les pages
move_files "src/components/Pages" "src/pages"
move_files "src/pages/MentionsLegales.tsx" "src/pages/legal/"

# Déplacer les layouts
move_files "src/layouts" "src/components/layout"

echo -e "\n${GREEN}Réorganisation terminée!${NC}"