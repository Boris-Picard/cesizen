<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\RoleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AdminRegisterUserController extends AbstractController
{
    public function __construct(
        protected EntityManagerInterface $entityManagerInterface,
        protected UserPasswordHasherInterface $passwordHasher,
        protected RoleRepository $roleRepository,
        protected SerializerInterface $serializer
    ) {}

    #[Route(path: '/api/admin/register-user', name: 'admin_register_user', methods: 'POST')]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $existingUser = $this->entityManagerInterface
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
        $defaultRole = $this->roleRepository->findOneBy(['role_nom' => $data['role']]);
        if (!$defaultRole) {
            return new JsonResponse(['error' => 'Rôle par défaut introuvable.'], 400);
        }
        $utilisateur->setRole($defaultRole);
        $utilisateur->setUtActive($data['active']);


        $hashedPassword = $this->passwordHasher->hashPassword($utilisateur, $utilisateur->getPlainPassword());
        $utilisateur->setUtPassword($hashedPassword);
        $utilisateur->setPlainPassword(null);

        $this->entityManagerInterface->beginTransaction();

        try {
            $this->entityManagerInterface->persist($utilisateur);
            $this->entityManagerInterface->flush();

            $this->entityManagerInterface->commit();
        } catch (\Exception $error) {
            $this->entityManagerInterface->rollback();
            return new JsonResponse(['error' => $error->getMessage()], 500);
        }

        return new JsonResponse(
            [
                'status' => "L'utilisateur a été créé avec succès !",
                'data' => json_decode($this->serializer->serialize($utilisateur, 'json', ['groups' => ['utilisateur:read']]), true)
            ],
            201
        );
    }
}
