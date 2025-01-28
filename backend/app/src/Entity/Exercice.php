<?php

namespace App\Entity;

use App\Repository\ExerciceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExerciceRepository::class)]
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
     * @var Collection<int, Realiser>
     */
    #[ORM\OneToMany(targetEntity: Realiser::class, mappedBy: 'exercice')]
    private Collection $realisers;

    public function __construct()
    {
        $this->interactions = new ArrayCollection();
        $this->realisers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
     * @return Collection<int, Realiser>
     */
    public function getRealisers(): Collection
    {
        return $this->realisers;
    }

    public function addRealiser(Realiser $realiser): static
    {
        if (!$this->realisers->contains($realiser)) {
            $this->realisers->add($realiser);
            $realiser->setExercice($this);
        }

        return $this;
    }

    public function removeRealiser(Realiser $realiser): static
    {
        if ($this->realisers->removeElement($realiser)) {
            // set the owning side to null (unless already changed)
            if ($realiser->getExercice() === $this) {
                $realiser->setExercice(null);
            }
        }

        return $this;
    }
}
