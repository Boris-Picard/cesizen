#!/bin/bash

set -e

# Clear & warm cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# Lancer PHP-FPM en arrière-plan
php-fpm -D

# Lancer NGINX
exec nginx -g 'daemon off;'
