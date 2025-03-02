<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Utilisateur;
use App\Service\ConfirmationEmailService;
use Symfony\Bundle\SecurityBundle\Security;

class AccountParametersController
{
    public function __construct(
        protected EntityManagerInterface $entityManager,
        protected UserPasswordHasherInterface $passwordHasher,
        protected ValidatorInterface $validator,
        protected ConfirmationEmailService $confirmationEmailService,
        protected Security $security
    ) {}

    #[Route('/profile/parameters', name: 'profile_parameters', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        /** @var Utilisateur $currentUser */
        $currentUser = $this->security->getUser();

        if (!$currentUser) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié.'], 401);
        }

        $newEmail = $data['ut_mail'] ?? null;
        if ($newEmail && $newEmail !== $currentUser->getUtMail()) {

            if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
                return new JsonResponse(['error' => "L'adresse email n'est pas valide."], 400);
            }

            $existingUser = $this->entityManager
                ->getRepository(Utilisateur::class)
                ->findOneBy(['ut_mail' => $newEmail]);

            if ($existingUser) {
                return new JsonResponse(['error' => 'Cette adresse email est déjà utilisée.'], 400);
            }

            $currentUser->setUtMail($newEmail);
            $this->confirmationEmailService->sendConfirmationEmail($currentUser);
        }

        if (isset($data['ut_nom']) && $data['ut_nom'] !== $currentUser->getUtNom()) {
            $currentUser->setUtNom($data['ut_nom']);
        }

        if (isset($data['ut_prenom']) && $data['ut_prenom'] !== $currentUser->getUtPrenom()) {
            $currentUser->setUtPrenom($data['ut_prenom']);
        }

        if (!empty($data['plainPassword'])) {
            $currentUser->setPlainPassword($data['plainPassword']);
            $hashedPassword = $this->passwordHasher->hashPassword($currentUser, $currentUser->getPlainPassword());
            $currentUser->setUtPassword($hashedPassword);
            $currentUser->setPlainPassword(null);
        }

        $errors = $this->validator->validate($currentUser, null, ['utilisateur']);
        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string)$errors], 400);
        }

        $this->entityManager->beginTransaction();
        try {
            $this->entityManager->persist($currentUser);
            $this->entityManager->flush();
            $this->entityManager->commit();
        } catch (\Exception $error) {
            $this->entityManager->rollback();
            return new JsonResponse(['error' => $error->getMessage()], 500);
        }

        return new JsonResponse(['status' => "Les paramètres du profil ont été mis à jour. Si vous avez changé votre adresse email, un mail de confirmation vous a été envoyé."], 200);
    }
}
