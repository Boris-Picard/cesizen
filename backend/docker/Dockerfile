FROM php:8.2-fpm AS build

RUN apt-get update && apt-get install -y \
    git unzip curl zip libpq-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer
WORKDIR /app

COPY app/ .  
RUN composer install --no-dev --optimize-autoloader --no-interaction

FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx curl libpq-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www
COPY --from=build /app /var/www

COPY app/.env.local.php /var/www/.env.local.php

RUN chown -R www-data:www-data /var/www

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
