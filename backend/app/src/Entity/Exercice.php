<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExerciceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExerciceRepository::class)]
#[ApiResource]
class Exercice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 200)]
    private ?string $nom = null;

    #[ORM\Column(nullable: true)]
    private ?int $inspiration = null;

    #[ORM\Column(nullable: true)]
    private ?int $apnee = null;

    #[ORM\Column(nullable: true)]
    private ?int $expiration = null;

    #[ORM\Column]
    private ?bool $active = null;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'exercice')]
    private Collection $interactions;

    /**
     * @var Collection<int, Utilisateur>
     */
    #[ORM\ManyToMany(targetEntity: Utilisateur::class, mappedBy: 'exercices')]
    private Collection $utilisateurs;

    public function __construct()
    {
        $this->interactions = new ArrayCollection();
        $this->utilisateurs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getInspiration(): ?int
    {
        return $this->inspiration;
    }

    public function setInspiration(?int $inspiration): static
    {
        $this->inspiration = $inspiration;

        return $this;
    }

    public function getApnee(): ?int
    {
        return $this->apnee;
    }

    public function setApnee(?int $apnee): static
    {
        $this->apnee = $apnee;

        return $this;
    }

    public function getExpiration(): ?int
    {
        return $this->expiration;
    }

    public function setExpiration(?int $expiration): static
    {
        $this->expiration = $expiration;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

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
            // set the owning side to null (unless already changed)
            if ($interaction->getExercice() === $this) {
                $interaction->setExercice(null);
            }
        }

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
}
