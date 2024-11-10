#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Début de la réorganisation du projet...${NC}\n"

# 1. Création des nouveaux dossiers
echo -e "${YELLOW}1. Création des nouveaux dossiers...${NC}"
mkdir -p src/features
mkdir -p src/pages/auth
mkdir -p src/pages/legal
mkdir -p src/pages/app
mkdir -p src/components/layout

# 2. Déplacement des dossiers de fonctionnalités vers features
echo -e "\n${YELLOW}2. Déplacement des fonctionnalités vers features/...${NC}"
folders_to_move=(
    "account"
    "admin"
    "auth"
    "dashboard"
    "notifications"
    "premium"
    "guide"
    "news"
    "connections"
)

for folder in "${folders_to_move[@]}"; do
    if [ -d "src/components/$folder" ]; then
        echo "Déplacement de $folder vers features/"
        mv "src/components/$folder" "src/features/"
    fi
done

# 3. Déplacement des layouts
echo -e "\n${YELLOW}3. Déplacement des layouts...${NC}"
if [ -d "src/layouts" ]; then
    echo "Déplacement des layouts vers components/layout/"
    mv src/layouts/* src/components/layout/ 2>/dev/null || true
    rmdir src/layouts 2>/dev/null || true
fi

# 4. Réorganisation des pages
echo -e "\n${YELLOW}4. Réorganisation des pages...${NC}"
files_to_move=(
    "MentionsLegales.jsx:legal/"
    "PolitiqueConfidentialite.jsx:legal/"
    "SecurisationDonneesFinancieres.jsx:legal/"
    "login.js:auth/login.jsx"
)

for file_map in "${files_to_move[@]}"; do
    source="${file_map%%:*}"
    dest="src/pages/${file_map#*:}"
    if [ -f "src/pages/$source" ]; then
        echo "Déplacement de $source vers $dest"
        mv "src/pages/$source" "$dest"
    fi
done

# 5. Conversion des fichiers .js en .jsx
echo -e "\n${YELLOW}5. Conversion des fichiers .js en .jsx...${NC}"
find src -name "*.js" | while read file; do
    if grep -l "React" "$file" > /dev/null 2>&1; then
        new_file="${file%.js}.jsx"
        if [ "$file" != "$new_file" ]; then
            echo "Conversion de $file en $new_file"
            mv "$file" "$new_file"
        fi
    fi
done

# 6. Suppression des fichiers en double
echo -e "\n${YELLOW}6. Nettoyage des fichiers en double...${NC}"
duplicates=(
    "src/features/admin/ContentManagement.js"
    "src/features/guide/GuideDemarrageRapide.js"
    "src/features/news/ActualitesAnalyses.js"
)

for file in "${duplicates[@]}"; do
    if [ -f "$file" ]; then
        echo "Suppression du fichier en double: $file"
        rm "$file"
    fi
done

# 7. Vérification finale
echo -e "\n${YELLOW}7. Vérification de la structure finale...${NC}"
echo -e "Structure des dossiers :"
tree src/ -L 3 -I 'node_modules|build|dist'

echo -e "\n${GREEN}Réorganisation terminée!${NC}"
echo -e "N'oubliez pas de :"
echo "1. Vérifier les imports dans vos fichiers"
echo "2. Tester l'application pour s'assurer que tout fonctionne"
echo "3. Mettre à jour vos chemins d'importation si nécessaire"