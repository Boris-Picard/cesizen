<?php

namespace App\Controller;

use Doctrine\DBAL\Connection;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HealthController
{
    #[Route('/health', name: 'app_health', methods: ['GET'])]
    public function health(Connection $connection): Response
    {
        try {
            $connection->executeQuery('SELECT 1');
            return new Response('OK', Response::HTTP_OK);
        } catch (\Throwable $e) {
            // Ne pas exposer le message d'erreur exact
            return new Response('Service Unavailable', Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }
}
