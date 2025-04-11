FROM php:8.2-fpm AS build

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    postgresql-client \
    zip \
    unzip \
    git \
    curl \
    bash \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY app/ .

RUN composer install --no-dev --prefer-dist --no-scripts --no-progress

COPY app/ .

FROM php:8.2-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    postgresql-client \
    curl \
    bash \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

RUN curl -Lo /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

WORKDIR /var/www

COPY --from=build /app /var/www

COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN chown -R www-data:www-data /var/www

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 8000

CMD ["symfony", "serve", "--no-tls", "--port=8000", "--allow-http"]

