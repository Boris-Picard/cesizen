# ========================
# 🏗 Étape de build
# ========================
FROM php:8.2-fpm AS build

# Install dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Installer Composer depuis l'image officielle
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers de Composer pour cache Docker
COPY composer.* ./

# Installer les dépendances PHP (prod uniquement)
RUN composer install --no-dev --prefer-dist --no-scripts --no-progress

# Copier tout le code Symfony
COPY . .

# ========================
# 🧩 Étape finale
# ========================
FROM php:8.2-fpm

# Installer dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    postgresql-client \
    curl \
    bash \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Installer la CLI Symfony
RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Installer wait-for-it pour attendre la DB (utile au démarrage)
RUN curl -Lo /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

# Définir le dossier de travail
WORKDIR /var/www

# Copier le build Symfony depuis le container précédent
COPY --from=build /app /var/www

# Copier l'entrypoint (facultatif, mais pratique)
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Droits
RUN chown -R www-data:www-data /var/www

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
