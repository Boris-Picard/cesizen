<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\ExerciceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(
    normalizationContext: ['groups' => ['exercice:read']],
    denormalizationContext: ['groups' => ['exercice:write']],
    // operations: [
    //     new Get(
    //         security: "object.isExActive() == true",
    //         securityMessage: "Cet exercice est inactif."
    //     ),
    // ]
)]
#[ApiFilter(SearchFilter::class, properties: ['ex_active' => 'exact'])]
#[ORM\Entity(repositoryClass: ExerciceRepository::class)]
class Exercice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "ex_id", type: "integer")]
    #[Groups(['exercice:read', 'utilisateur:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 200)]
    #[Groups(['exercice:read', 'exercice:write', 'utilisateur:read'])]
    private ?string $ex_nom = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?string $ex_description = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?string $ex_difficulty = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?int $ex_duration = null;

    #[ORM\Column(type: "json", nullable: true)]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?array $ex_benefits = [];

    #[ORM\Column(nullable: true)]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?int $ex_inspiration = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?int $ex_apnee = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?int $ex_expiration = null;

    #[ORM\Column]
    #[Groups(['exercice:read', 'exercice:write'])]
    private ?bool $ex_active = null;

    /**
     * @var Collection<int, Utilisateur>
     */
    #[ORM\ManyToMany(targetEntity: Utilisateur::class, mappedBy: 'exercices')]
    #[Groups(['exercice:read'])]
    #[MaxDepth(1)]
    private Collection $utilisateurs;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'exercice')]
    private Collection $interactions;

    public function __construct()
    {
        $this->utilisateurs = new ArrayCollection();
        $this->interactions = new ArrayCollection();
    }

    // Getters et setters pour tous les champs

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getExNom(): ?string
    {
        return $this->ex_nom;
    }

    public function setExNom(string $ex_nom): static
    {
        $this->ex_nom = $ex_nom;
        return $this;
    }

    public function getExDescription(): ?string
    {
        return $this->ex_description;
    }

    public function setExDescription(?string $ex_description): static
    {
        $this->ex_description = $ex_description;
        return $this;
    }

    public function getExDifficulty(): ?string
    {
        return $this->ex_difficulty;
    }

    public function setExDifficulty(?string $ex_difficulty): static
    {
        $this->ex_difficulty = $ex_difficulty;
        return $this;
    }

    public function getExDuration(): ?int
    {
        return $this->ex_duration;
    }

    public function setExDuration(?int $ex_duration): static
    {
        $this->ex_duration = $ex_duration;
        return $this;
    }

    public function getExBenefits(): ?array
    {
        return $this->ex_benefits;
    }

    public function setExBenefits(?array $ex_benefits): static
    {
        $this->ex_benefits = $ex_benefits;
        return $this;
    }

    public function getExInspiration(): ?int
    {
        return $this->ex_inspiration;
    }

    public function setExInspiration(?int $ex_inspiration): static
    {
        $this->ex_inspiration = $ex_inspiration;
        return $this;
    }

    public function getExApnee(): ?int
    {
        return $this->ex_apnee;
    }

    public function setExApnee(?int $ex_apnee): static
    {
        $this->ex_apnee = $ex_apnee;
        return $this;
    }

    public function getExExpiration(): ?int
    {
        return $this->ex_expiration;
    }

    public function setExExpiration(?int $ex_expiration): static
    {
        $this->ex_expiration = $ex_expiration;
        return $this;
    }

    public function isExActive(): ?bool
    {
        return $this->ex_active;
    }

    public function setExActive(bool $ex_active): static
    {
        $this->ex_active = $ex_active;
        return $this;
    }

    /**
     * @return Collection<int, Utilisateur>
     */
    public function getUtilisateurs(): Collection
    {
        return $this->utilisateurs;
    }

    public function addUtilisateur(Utilisateur $utilisateur): static
    {
        if (!$this->utilisateurs->contains($utilisateur)) {
            $this->utilisateurs->add($utilisateur);
            $utilisateur->addExercice($this);
        }
        return $this;
    }

    public function removeUtilisateur(Utilisateur $utilisateur): static
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            $utilisateur->removeExercice($this);
        }
        return $this;
    }

    /**
     * @return Collection<int, Interaction>
     */
    public function getInteractions(): Collection
    {
        return $this->interactions;
    }

    public function addInteraction(Interaction $interaction): static
    {
        if (!$this->interactions->contains($interaction)) {
            $this->interactions->add($interaction);
            $interaction->setExercice($this);
        }
        return $this;
    }

    public function removeInteraction(Interaction $interaction): static
    {
        if ($this->interactions->removeElement($interaction)) {
            if ($interaction->getExercice() === $this) {
                $interaction->setExercice(null);
            }
        }
        return $this;
    }
}
