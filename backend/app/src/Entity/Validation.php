<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ValidationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(
    normalizationContext: ['groups' => ['validation:read']],
    denormalizationContext: ['groups' => ['validation:write']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Patch(),
    ]
)]
#[ORM\Entity(repositoryClass: ValidationRepository::class)]
class Validation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "valid_id")]
    #[Groups(['validation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['validation:read', 'validation:write'])]
    private ?string $validation_token = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['validation:read', 'validation:write'])]
    private ?\DateTimeInterface $date_expiration_token = null;

    #[ORM\Column(length: 100)]
    #[Groups(['validation:read', 'validation:write'])]
    private ?string $type_validation = null;

    #[ORM\ManyToOne(targetEntity: Utilisateur::class, inversedBy: "validations")]
    #[ORM\JoinColumn(name: "ut_id", referencedColumnName: "ut_id", nullable: false)]
    #[Groups(['validation:read', 'validation:write'])]
    #[MaxDepth(1)]
    private ?Utilisateur $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValidationToken(): ?string
    {
        return $this->validation_token;
    }

    public function setValidationToken(string $validation_token): static
    {
        $this->validation_token = $validation_token;

        return $this;
    }

    public function getDateExpirationToken(): ?\DateTimeInterface
    {
        return $this->date_expiration_token;
    }

    public function setDateExpirationToken(\DateTimeInterface $date_expiration_token): static
    {
        $this->date_expiration_token = $date_expiration_token;

        return $this;
    }

    public function getTypeValidation(): ?string
    {
        return $this->type_validation;
    }

    public function setTypeValidation(string $type_validation): static
    {
        $this->type_validation = $type_validation;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): static
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }
}
