FROM php:8.2-fpm

# Installer dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    bash \
    postgresql-client \
    curl \
  && docker-php-ext-install pdo_pgsql \
  && rm -rf /var/lib/apt/lists/*

# Installer Composer depuis l'image officielle
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Installer wait-for-it.sh
RUN curl -Lo /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

# Installer la Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www

# Copier l'entrypoint dans l'image
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Donner les permissions (optionnel)
RUN chown -R www-data:www-data /var/www

# Exposer le port 8000 (pour symfony serve)
EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Commande finale : lancer "symfony serve" sur 0.0.0.0:8000, sans TLS
CMD ["php-fpm"]
