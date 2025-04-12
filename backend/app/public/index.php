<?php

use App\Kernel;
use Symfony\Component\Dotenv\Dotenv;

// Forcer la lecture de .env uniquement si aucune variable d'env n'est définie
if (!isset($_ENV['APP_ENV']) && file_exists(dirname(__DIR__).'/.env')) {
    (new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
} else {
    // Render ou Docker ont fourni les variables d'env
    $_SERVER['APP_ENV'] = $_SERVER['APP_ENV'] ?? 'prod';
    $_SERVER['APP_DEBUG'] = $_SERVER['APP_DEBUG'] ?? '0';
    $_ENV['APP_ENV'] = $_ENV['APP_ENV'] ?? 'prod';
    $_ENV['APP_DEBUG'] = $_ENV['APP_DEBUG'] ?? '0';
}

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel(
        $context['APP_ENV'] ?? $_ENV['APP_ENV'],
        (bool) ($context['APP_DEBUG'] ?? $_ENV['APP_DEBUG'])
    );
};
