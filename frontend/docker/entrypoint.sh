#!/bin/bash
set -e

# Fonction pour initialiser le projet React avec Vite
init_react() {
    echo "Initialisation d'un nouveau projet React avec Vite..."
    npx create-vite@latest . --template react-ts --force
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm install shadcn/ui

    # Ajouter les directives Tailwind à src/index.css
    echo "@tailwind base;\n@tailwind components;\n@tailwind utilities;" > src/index.css

    # Configurer Tailwind CSS
    cat <<EOL > tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL
}

# Vérifier si package.json existe
if [ ! -f "/app/package.json" ]; then
    if [ -z "$(ls -A /app)" ]; then
        init_react
    else
        echo "Le dossier /app n'est pas vide et aucun package.json trouvé. On ne fait rien."
    fi
else
    echo "package.json trouvé, saut de l'initialisation du projet React."
fi

# Installer les dépendances
echo "Installation des dépendances npm..."
npm install

# Démarrer le serveur de développement Vite
echo "Démarrage du serveur de développement Vite..."
exec "$@"
