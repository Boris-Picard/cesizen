<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InteractionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(
    normalizationContext: ['groups' => ['interaction:read']],
    denormalizationContext: ['groups' => ['interaction:write']]
)]
#[ORM\Entity(repositoryClass: InteractionRepository::class)]
class Interaction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "inter_id", type: "integer")]
    #[Groups(['interaction:read', 'utilisateur:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['interaction:read', 'interaction:write', 'utilisateur:read'])]
    private ?\DateTimeInterface $inter_date_de_debut = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['interaction:read', 'interaction:write', 'utilisateur:read'])]
    private ?\DateTimeInterface $inter_date_de_fin = null;

    #[ORM\ManyToOne(targetEntity: Information::class, inversedBy: "interactions")]
    #[ORM\JoinColumn(name: "info_id", referencedColumnName: "info_id", nullable: true)]
    #[Groups(['interaction:read', 'interaction:write', 'utilisateur:read'])]
    #[MaxDepth(1)]
    private ?Information $information = null;

    #[ORM\ManyToOne(targetEntity: Exercice::class, inversedBy: "interactions")]
    #[ORM\JoinColumn(name: "ex_id", referencedColumnName: "ex_id", nullable: true)]
    #[Groups(['interaction:read', 'interaction:write', 'utilisateur:read'])]
    #[MaxDepth(1)]
    private ?Exercice $exercice = null;

    #[ORM\ManyToOne(targetEntity: Utilisateur::class, inversedBy: "interactions")]
    #[ORM\JoinColumn(name: "ut_id", referencedColumnName: "ut_id", nullable: true)]
    #[Groups(['interaction:read', 'interaction:write'])]
    #[MaxDepth(1)]
    private ?Utilisateur $utilisateur = null;

    #[ORM\ManyToOne(targetEntity: TypeInteraction::class, inversedBy: "interactions")]
    #[ORM\JoinColumn(name: "type_inter_id", referencedColumnName: "type_inter_id", nullable: false)]
    #[Groups(['interaction:read', 'interaction:write'])]
    #[MaxDepth(1)]
    private ?TypeInteraction $typeInteraction = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInterDateDeDebut(): ?\DateTimeInterface
    {
        return $this->inter_date_de_debut;
    }

    public function setInterDateDeDebut(\DateTimeInterface $inter_date_de_debut): static
    {
        $this->inter_date_de_debut = $inter_date_de_debut;

        return $this;
    }

    public function getInterDateDeFin(): ?\DateTimeInterface
    {
        return $this->inter_date_de_fin;
    }

    public function setInterDateDeFin(\DateTimeInterface $inter_date_de_fin): static
    {
        $this->inter_date_de_fin = $inter_date_de_fin;

        return $this;
    }

    public function getInformation(): ?Information
    {
        return $this->information;
    }

    public function setInformation(?Information $information): static
    {
        $this->information = $information;

        return $this;
    }

    public function getTypeInteraction(): ?TypeInteraction
    {
        return $this->typeInteraction;
    }

    public function setTypeInteraction(?TypeInteraction $typeInteraction): static
    {
        $this->typeInteraction = $typeInteraction;

        return $this;
    }

    public function getExercice(): ?Exercice
    {
        return $this->exercice;
    }

    public function setExercice(?Exercice $exercice): static
    {
        $this->exercice = $exercice;

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
