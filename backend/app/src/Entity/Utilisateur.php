<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['utilisateur:read']],
    denormalizationContext: ['groups' => ['utilisateur:write']],
)]
#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
class Utilisateur implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "ut_id", type: "integer")]
    #[Groups(['utilisateur:read'])]
    private ?int $id = null;

    #[Groups(['utilisateur:read', 'utilisateur:write'])]
    #[Assert\NotBlank(message: "Le nom ne peut pas être vide", groups: ['registration'])]
    #[ORM\Column(name: "ut_nom", length: 255)]
    private ?string $ut_nom = null;

    #[Groups(['utilisateur:read', 'utilisateur:write'])]
    #[Assert\NotBlank(message: "Le prénom ne peut pas être vide", groups: ['registration'])]
    #[ORM\Column(name: "ut_prenom", length: 200)]
    private ?string $ut_prenom = null;

    #[Groups(['utilisateur:read', 'utilisateur:write'])]
    #[ORM\Column(name: "ut_mail", length: 255)]
    #[Assert\NotBlank(message: "L'addresse mail ne peut pas être vide", groups: ['registration'])]
    #[Assert\Email(
        message: "L'adresse mail {{ value }} n'est pas une adresse valide.",
    )]
    private ?string $ut_mail = null;

    #[Groups(['utilisateur:write'])]
    #[ORM\Column(name: "ut_password", length: 255)]
    private ?string $ut_password = null;

    #[Groups(['utilisateur:write'])]
    #[Assert\NotBlank(message: "Le mot de passe ne peut pas être vide", groups: ['registration'])]
    private ?string $plainPassword = null;

    #[Groups(['utilisateur:read', 'utilisateur:write'])]
    #[ORM\Column(name: "ut_active")]
    private ?bool $ut_active = null;

    /**
     * @var Role|null
     */
    #[ORM\ManyToOne(targetEntity: Role::class, inversedBy: "utilisateurs")]
    #[ORM\JoinColumn(name: "role_id", referencedColumnName: "role_id", nullable: false)]
    #[Groups(['utilisateur:read', 'utilisateur:write'])]
    private ?Role $role = null;

    /**
     * @var Collection<int, Exercice>
     */
    #[ORM\ManyToMany(targetEntity: Exercice::class, inversedBy: "utilisateurs")]
    #[ORM\JoinTable(
        name: "realiser",
        joinColumns: [new ORM\JoinColumn(name: "ut_id", referencedColumnName: "ut_id")],
        inverseJoinColumns: [new ORM\JoinColumn(name: "ex_id", referencedColumnName: "ex_id")]
    )]
    #[Groups(['utilisateur:read', 'utilisateur:write'])]
    #[MaxDepth(1)]
    private Collection $exercices;

    /**
     * @var Collection<int, Information>
     */
    #[ORM\ManyToMany(targetEntity: Information::class, inversedBy: "utilisateurs")]
    #[ORM\JoinTable(
        name: "creer",
        joinColumns: [new ORM\JoinColumn(name: "ut_id", referencedColumnName: "ut_id")],
        inverseJoinColumns: [new ORM\JoinColumn(name: "info_id", referencedColumnName: "info_id")]
    )]
    #[Groups(['utilisateur:read', 'utilisateur:write'])]
    #[MaxDepth(1)]
    private Collection $informations;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'utilisateur')]
    #[Groups(['utilisateur:read'])]
    #[MaxDepth(1)]
    private Collection $interactions;

    /**
     * @var Collection<int, Validation>
     */
    #[ORM\OneToMany(targetEntity: Validation::class, mappedBy: 'utilisateur')]
    #[Groups(['utilisateur:read'])]
    #[MaxDepth(1)]
    private Collection $validations;

    public function __construct()
    {
        $this->exercices = new ArrayCollection();
        $this->informations = new ArrayCollection();
        $this->interactions = new ArrayCollection();
        $this->validations = new ArrayCollection();
    }

    // --- Getters et Setters existants ---

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUtNom(): ?string
    {
        return $this->ut_nom;
    }

    public function setUtNom(string $ut_nom): static
    {
        $this->ut_nom = $ut_nom;
        return $this;
    }

    public function getUtPrenom(): ?string
    {
        return $this->ut_prenom;
    }

    public function setUtPrenom(string $ut_prenom): static
    {
        $this->ut_prenom = $ut_prenom;
        return $this;
    }

    public function getUtMail(): ?string
    {
        return $this->ut_mail;
    }

    public function setUtMail(string $ut_mail): static
    {
        $this->ut_mail = $ut_mail;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->ut_password;
    }

    public function setUtPassword(string $ut_password): static
    {
        $this->ut_password = $ut_password;
        return $this;
    }

    public function isUtActive(): ?bool
    {
        return $this->ut_active;
    }

    public function setUtActive(bool $ut_active): static
    {
        $this->ut_active = $ut_active;
        return $this;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): self
    {
        $this->role = $role;
        return $this;
    }

    /**
     * @return Collection<int, Exercice>
     */
    public function getExercices(): Collection
    {
        return $this->exercices;
    }

    public function addExercice(Exercice $exercice): static
    {
        if (!$this->exercices->contains($exercice)) {
            $this->exercices->add($exercice);
        }
        return $this;
    }

    public function removeExercice(Exercice $exercice): static
    {
        $this->exercices->removeElement($exercice);
        return $this;
    }

    /**
     * @return Collection<int, Information>
     */
    public function getInformations(): Collection
    {
        return $this->informations;
    }

    public function addInformation(Information $information): static
    {
        if (!$this->informations->contains($information)) {
            $this->informations->add($information);
        }
        return $this;
    }

    public function removeInformation(Information $information): static
    {
        $this->informations->removeElement($information);
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
            if ($validation->getUtilisateur() === $this) {
                $validation->setUtilisateur(null);
            }
        }
        return $this;
    }

    // --- Propriété non mappée pour le mot de passe en clair ---

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;
        return $this;
    }

    // --- Méthodes de l'interface UserInterface / PasswordAuthenticatedUserInterface ---

    /**
     * On utilise l'email comme identifiant unique.
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->ut_mail;
    }

    /**
     * Pour compatibilité avec l'ancienne méthode.
     */
    public function getUsername(): string
    {
        return (string) $this->ut_mail;
    }

    /**
     * Retourne le(s) rôle(s) de l'utilisateur.
     * Vous pouvez personnaliser en fonction de la relation avec Role.
     */
    public function getRoles(): array
    {
        $roles = [];
        if ($this->role !== null) {
            $roles[] = $this->role->getRoleNom();
        }

        if (empty($roles)) {
            $roles[] = 'ROLE_USER';
        }

        return array_unique($roles);
    }

    /**
     * Méthode permettant d'effacer les données sensibles.
     */
    public function eraseCredentials(): void
    {
        // $this->ut_password = null;
    }
}
