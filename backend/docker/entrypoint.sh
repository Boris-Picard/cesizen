#!/bin/bash

set -e

# Petite fonction pour vérifier si un package est dans le composer.json
function has_composer_package() {
    local package="$1"
    composer show "$package" > /dev/null 2>&1 && return 0 || return 1
}

function init_symfony() {
    echo "Initialisation d'un nouveau projet Symfony..."
    composer create-project symfony/skeleton . --no-interaction
    composer require api
    composer require doctrine
    composer require nelmio/cors-bundle
}

# 1. Si pas de composer.json, potentiellement dossier vide => init
if [ ! -f "/var/www/composer.json" ]; then
    if [ -z "$(ls -A /var/www)" ]; then
        init_symfony
    else
        echo "Le dossier /var/www n'est pas vide mais aucun composer.json trouvé. On ne fait rien."
    fi
else
    echo "composer.json trouvé, pas d'initialisation du projet Symfony."
fi

echo "Installation des dépendances..."
composer install --no-interaction --prefer-dist --optimize-autoloader

# Attendre Postgres
echo "En attente de PostgreSQL..."
wait-for-it.sh db:5432 --timeout=60 -- echo "PostgreSQL est prêt."

# Lancer la commande finale du Dockerfile : symfony serve ...
exec "$@"