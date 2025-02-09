<?php

namespace App\Controller;

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
    ) {}

    #[Route('/register', name: 'user_register', methods: ['POST', 'OPTIONS'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $utilisateur = new Utilisateur();
        // Remappez les clés si besoin (votre front envoie "firstName", etc.)
        $utilisateur->setUtNom($data['ut_nom'] ?? '');
        $utilisateur->setUtPrenom($data['ut_prenom'] ?? '');
        $utilisateur->setUtMail($data['ut_mail'] ?? '');
        $utilisateur->setPlainPassword($data['plainPassword'] ?? '');
        $utilisateur->setUtActive(true);

        $defaultRole = $this->roleRepository->findOneBy(['role_nom' => 'ROLE_USER']);
        if (!$defaultRole) {
            return new JsonResponse(['error' => 'Rôle par défaut introuvable.'], 400);
        }
        $utilisateur->setRole($defaultRole);

        // Validation
        $errors = $this->validator->validate($utilisateur, null, ['registration']);
        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string) $errors], 400);
        }

        // Hashage du mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword($utilisateur, $utilisateur->getPlainPassword());
        $utilisateur->setUtPassword($hashedPassword);
        $utilisateur->setPlainPassword(null);

        $this->entityManager->persist($utilisateur);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Utilisateur créé'], 201);
    }
}
