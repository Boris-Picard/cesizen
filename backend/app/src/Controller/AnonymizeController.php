<?php

namespace App\Controller;

use App\Service\AnonymizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Utilisateur;
use Symfony\Bundle\SecurityBundle\Security;

class AnonymizeController extends AbstractController
{
    public function __construct(
        protected AnonymizationService $anonymizationService,
        protected Security $security
    ) {}

    #[Route('/profile/anonymize', name: 'profile_anonymize', methods: ['POST'])]
    public function anonymize(): JsonResponse
    {
        /** @var Utilisateur $currentUser */
        $currentUser = $this->security->getUser();
        
        if (!$currentUser) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié.'], 401);
        }

        $this->anonymizationService->anonymizeUser($currentUser->getId());

        return new JsonResponse(['status' => 'Vos données ont été anonymisées.'], 200);
    }
}
