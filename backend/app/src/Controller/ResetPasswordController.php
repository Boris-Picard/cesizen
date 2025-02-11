<?php
// src/Controller/ResetPasswordController.php
namespace App\Controller;

use App\Entity\Utilisateur;
use App\Entity\Validation;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\PasswordResetService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/reset-password')]
class ResetPasswordController extends AbstractController
{
    public function __construct(
        private PasswordResetService $passwordResetService,
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher
    ) {}

    /**
     * Endpoint pour la demande de réinitialisation du mot de passe.
     * On reçoit l'email en JSON et on envoie le lien de réinitialisation.
     */
    #[Route('/forgot-password', name: 'app_forgot_password', methods: ['POST'])]
    public function forgotPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (empty($data['ut_mail'])) {
            return new JsonResponse(['error' => 'L\'adresse e-mail est requise.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        try {
            /** @var Utilisateur|null $user */
            $user = $this->entityManager
                ->getRepository(Utilisateur::class)
                ->findOneBy(['ut_mail' => $data['ut_mail']]);

            if ($user) {
                $this->passwordResetService->sendPasswordResetEmail($user);
            }
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => 'Une erreur est survenue lors de l\'envoi de l\'email de réinitialisation.'],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return new JsonResponse([
            'message' => 'Un email de réinitialisation a été envoyé (si l\'adresse existe).'
        ]);
    }

    /**
     * Endpoint appelé quand l’utilisateur clique sur le lien contenu dans l’email.
     * Ce endpoint valide le token et permet ensuite la réinitialisation du mot de passe.
     */
    #[Route('/reset/{token}', name: 'app_reset_password', methods: ['POST'])]
    public function reset(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        // Récupérer le token depuis l'URL
        $token = $request->attributes->get('token');
        if (!$token) {
            return new JsonResponse(['error' => 'Token manquant.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $validation = $this->entityManager->getRepository(Validation::class)
            ->findOneBy([
                'validation_token' => $token,
                'type_validation'  => 'password_reset'
            ]);

        if (!$validation) {
            return new JsonResponse(['error' => 'Token invalide.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        if ($validation->getDateExpirationToken() < new \DateTime()) {
            return new JsonResponse(['error' => 'Token expiré.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $validation->getUtilisateur();
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $data = json_decode($request->getContent(), true);
        if (empty($data['plainPassword'])) {
            return new JsonResponse(['error' => 'Le nouveau mot de passe est requis.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $hashedPassword = $passwordHasher->hashPassword($user, $data['plainPassword']);
        $user->setUtPassword($hashedPassword);

        $this->entityManager->remove($validation);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Mot de passe réinitialisé avec succès.']);
    }
}
