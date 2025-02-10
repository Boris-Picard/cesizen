<?php

namespace App\Controller;

use App\Service\ConfirmationEmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Utilisateur;
use App\Repository\RoleRepository;

class RegistrationController
{
    public function __construct(
        protected EntityManagerInterface $entityManager,
        protected UserPasswordHasherInterface $passwordHasher,
        protected ValidatorInterface $validator,
        protected RoleRepository $roleRepository,
        protected ConfirmationEmailService $confirmationEmailService
    ) {}

    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $existingUser = $this->entityManager
            ->getRepository(Utilisateur::class)
            ->findOneBy(['ut_mail' => $data['ut_mail']]);

        if ($existingUser) {
            return new JsonResponse(['error' => 'Cette adresse email est déjà utilisée.'], 400);
        }

        $utilisateur = new Utilisateur();
        $utilisateur->setUtNom($data['ut_nom'] ?? '');
        $utilisateur->setUtPrenom($data['ut_prenom'] ?? '');
        $utilisateur->setUtMail($data['ut_mail'] ?? '');
        $utilisateur->setPlainPassword($data['plainPassword'] ?? '');
        $utilisateur->setUtActive(false);

        $defaultRole = $this->roleRepository->findOneBy(['role_nom' => 'ROLE_USER']);
        if (!$defaultRole) {
            return new JsonResponse(['error' => 'Rôle par défaut introuvable.'], 400);
        }
        $utilisateur->setRole($defaultRole);

        $errors = $this->validator->validate($utilisateur, null, ['utilisateur']);
        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string) $errors], 400);
        }

        $hashedPassword = $this->passwordHasher->hashPassword($utilisateur, $utilisateur->getPlainPassword());
        $utilisateur->setUtPassword($hashedPassword);
        $utilisateur->setPlainPassword(null);

        $this->entityManager->beginTransaction();

        try {
            $this->entityManager->persist($utilisateur);
            $this->entityManager->flush();

            $this->confirmationEmailService->sendConfirmationEmail($utilisateur);

            $this->entityManager->commit();
        } catch (\Exception $error) {
            $this->entityManager->rollback();

            return new JsonResponse(['error' => $error->getMessage()], 500);
        }

        return new JsonResponse(['status' => "Un mail de confirmation viens d'être envoyé"], 201);
    }
}
