<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use App\Entity\Utilisateur;

class AccountDeleteController
{
    public function __construct(
        protected EntityManagerInterface $entityManager,
        protected Security $security
    ) {}

    #[Route('/profile/delete', name: 'profile_delete', methods: ['DELETE'])]
    public function deleteAccount(): JsonResponse
    {
        /** @var Utilisateur $currentUser */
        $currentUser = $this->security->getUser();

        if (!$currentUser) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié.'], 401);
        }

        try {
            $this->entityManager->remove($currentUser);
            $this->entityManager->flush();

            return new JsonResponse(['status' => 'Votre compte a été supprimé définitivement.'], 200);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Une erreur est survenue lors de la suppression de votre compte.'], 500);
        }
    }
}
