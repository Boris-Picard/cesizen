<?php

namespace App\Controller;

use App\Service\ConfirmationEmailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AccountConfirmationController extends AbstractController
{

    public function __construct(protected ConfirmationEmailService $confirmationEmailService) {}

    #[Route(path: "/account-confirmation/{token}", name: "account_confirmation")]
    public function confirm(string $token): JsonResponse
    {
        try {
            $user = $this->confirmationEmailService->confirmAccount($token);
            return new JsonResponse([
                'success' => true,
                'message' => 'Compte confirmé avec succès.',
                'user' => [
                    'id'       => $user->getId(),
                    'username' => $user->getUtPrenom(),
                    'mail'     => $user->getUtMail(),
                ]
            ]);
        } catch (\Exception $error) {
            return new JsonResponse(['error' => $error->getMessage()], 400);
        }
    }
}
