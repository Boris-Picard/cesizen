<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ValidationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ValidationRepository::class)]
#[ApiResource]
class Validation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateExpirationToken = null;

    #[ORM\Column(length: 100)]
    private ?string $typeValidation = null;

    #[ORM\ManyToOne(inversedBy: 'validations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getDateExpirationToken(): ?\DateTimeInterface
    {
        return $this->dateExpirationToken;
    }

    public function setDateExpirationToken(\DateTimeInterface $dateExpirationToken): static
    {
        $this->dateExpirationToken = $dateExpirationToken;

        return $this;
    }

    public function getTypeValidation(): ?string
    {
        return $this->typeValidation;
    }

    public function setTypeValidation(string $typeValidation): static
    {
        $this->typeValidation = $typeValidation;

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
