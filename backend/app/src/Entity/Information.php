<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InformationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InformationRepository::class)]
#[ApiResource]
class Information
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $contenu = null;

    #[ORM\Column]
    private ?bool $active = null;

    #[ORM\ManyToOne(inversedBy: 'information')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TypeInformation $type = null;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'information', orphanRemoval: true)]
    private Collection $interactions;

    /**
     * @var Collection<int, Creer>
     */
    #[ORM\OneToMany(targetEntity: Creer::class, mappedBy: 'information')]
    private Collection $creers;

    public function __construct()
    {
        $this->interactions = new ArrayCollection();
        $this->creers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): static
    {
        $this->contenu = $contenu;

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

    public function getType(): ?TypeInformation
    {
        return $this->type;
    }

    public function setType(?TypeInformation $type): static
    {
        $this->type = $type;

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
            $interaction->setInformation($this);
        }

        return $this;
    }

    public function removeInteraction(Interaction $interaction): static
    {
        if ($this->interactions->removeElement($interaction)) {
            // set the owning side to null (unless already changed)
            if ($interaction->getInformation() === $this) {
                $interaction->setInformation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Creer>
     */
    public function getCreers(): Collection
    {
        return $this->creers;
    }

    public function addCreer(Creer $creer): static
    {
        if (!$this->creers->contains($creer)) {
            $this->creers->add($creer);
            $creer->setInformation($this);
        }

        return $this;
    }

    public function removeCreer(Creer $creer): static
    {
        if ($this->creers->removeElement($creer)) {
            // set the owning side to null (unless already changed)
            if ($creer->getInformation() === $this) {
                $creer->setInformation(null);
            }
        }

        return $this;
    }
}
