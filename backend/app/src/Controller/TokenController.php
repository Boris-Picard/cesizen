<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TokenController extends AbstractController
{
    public function __construct(
        protected JWTTokenManagerInterface $jwtManager,
        protected JWTEncoderInterface $jwtEncoder,
        protected ManagerRegistry $doctrine
    ) {}

    #[Route("/api/token/refresh", name: "api_token_refresh", methods: "POST")]
    public function refresh(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['token'])) {
            return new JsonResponse(['error' => 'Token manquant'], 400);
        }

        $oldToken = $data['token'];

        try {
            $payload = $this->jwtEncoder->decode($oldToken);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Token invalide'], 401);
        }

        if (!isset($payload['username'])) {
            return new JsonResponse(['error' => 'Payload invalide'], 400);
        }

        $username = $payload['username'];
        $user = $this->doctrine->getRepository(Utilisateur::class)->findOneBy(['ut_mail' => $username]);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur introuvable'], 404);
        }

        $newToken = $this->jwtManager->create($user);

        return new JsonResponse(['token' => $newToken]);
    }
}
