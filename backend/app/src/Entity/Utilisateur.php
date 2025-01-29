<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
#[ApiResource]
class Utilisateur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 200)]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    private ?string $mail = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column]
    private ?bool $active = null;

    #[ORM\ManyToOne(inversedBy: 'utilisateurs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Role $role = null;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'utilisateur')]
    private Collection $interactions;

    /**
     * @var Collection<int, Validation>
     */
    #[ORM\OneToMany(targetEntity: Validation::class, mappedBy: 'utilisateur')]
    private Collection $validations;

    /**
     * @var Collection<int, Realiser>
     */
    #[ORM\OneToMany(targetEntity: Realiser::class, mappedBy: 'utilisateur')]
    private Collection $realisers;

    /**
     * @var Collection<int, Creer>
     */
    #[ORM\OneToMany(targetEntity: Creer::class, mappedBy: 'utilisateur')]
    private Collection $creers;

    public function __construct()
    {
        $this->interactions = new ArrayCollection();
        $this->validations = new ArrayCollection();
        $this->realisers = new ArrayCollection();
        $this->creers = new ArrayCollection();
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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): static
    {
        $this->mail = $mail;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

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

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): static
    {
        $this->role = $role;

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
            $interaction->setUtilisateur($this);
        }

        return $this;
    }

    public function removeInteraction(Interaction $interaction): static
    {
        if ($this->interactions->removeElement($interaction)) {
            // set the owning side to null (unless already changed)
            if ($interaction->getUtilisateur() === $this) {
                $interaction->setUtilisateur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Validation>
     */
    public function getValidations(): Collection
    {
        return $this->validations;
    }

    public function addValidation(Validation $validation): static
    {
        if (!$this->validations->contains($validation)) {
            $this->validations->add($validation);
            $validation->setUtilisateur($this);
        }

        return $this;
    }

    public function removeValidation(Validation $validation): static
    {
        if ($this->validations->removeElement($validation)) {
            // set the owning side to null (unless already changed)
            if ($validation->getUtilisateur() === $this) {
                $validation->setUtilisateur(null);
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
            $realiser->setUtilisateur($this);
        }

        return $this;
    }

    public function removeRealiser(Realiser $realiser): static
    {
        if ($this->realisers->removeElement($realiser)) {
            // set the owning side to null (unless already changed)
            if ($realiser->getUtilisateur() === $this) {
                $realiser->setUtilisateur(null);
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
            $creer->setUtilisateur($this);
        }

        return $this;
    }

    public function removeCreer(Creer $creer): static
    {
        if ($this->creers->removeElement($creer)) {
            // set the owning side to null (unless already changed)
            if ($creer->getUtilisateur() === $this) {
                $creer->setUtilisateur(null);
            }
        }

        return $this;
    }
}
