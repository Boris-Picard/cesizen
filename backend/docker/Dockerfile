FROM php:8.2-fpm

# Installer dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    zip \
    unzip \
    git \
    bash \
    postgresql-client \
    curl \
    nano \
    && docker-php-ext-install \
        pdo_pgsql \
        intl \
        opcache \
        mbstring \
        zip \
        xml \
        bcmath \
    && rm -rf /var/lib/apt/lists/*

# Installer Composer depuis l'image officielle
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Installer wait-for-it.sh
RUN curl -Lo /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

# Installer la Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www

# Copier l'entrypoint dans l'image
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Donner les permissions
RUN chown -R www-data:www-data /var/www

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["php-fpm"]
