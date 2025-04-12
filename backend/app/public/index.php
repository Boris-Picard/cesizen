<?php

use App\Kernel;
use Symfony\Component\Dotenv\Dotenv;

$envFile = dirname(__DIR__).'/.env';

if (!isset($_ENV['APP_ENV']) && file_exists($envFile)) {
    (new Dotenv())->bootEnv($envFile);
}

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'] ?? 'prod', (bool) ($context['APP_DEBUG'] ?? false));
};
