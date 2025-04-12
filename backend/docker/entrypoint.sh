#!/bin/bash

set -e

echo "En attente de PostgreSQL..."
wait-for-it.sh db:5432 --timeout=60 -- echo "PostgreSQL est prêt."

# Clear & warm cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# Lancer PHP-FPM en arrière-plan
php-fpm -D

# Lancer NGINX
exec nginx -g 'daemon off;'
