<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InformationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(
    normalizationContext: ['groups' => ['information:read']],
    denormalizationContext: ['groups' => ['information:write']]
)]
#[ORM\Entity(repositoryClass: InformationRepository::class)]
class Information
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "info_id", type: "integer")]
    #[Groups(['information:read', 'utilisateur:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['information:read', 'utilisateur:read'])]
    private ?string $info_titre = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['information:read', 'utilisateur:read'])]
    private ?string $info_description = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['information:read', 'utilisateur:read'])]
    private ?string $info_contenu = null;

    #[ORM\Column]
    #[Groups(['information:read', 'utilisateur:read'])]
    private ?bool $info_active = null;

    /**
     * @var Collection<int, Utilisateur>
     */
    #[ORM\ManyToMany(targetEntity: Utilisateur::class, mappedBy: 'informations')]
    #[Groups(['information:read'])]
    #[MaxDepth(1)]
    private Collection $utilisateurs;

    #[ORM\ManyToOne(targetEntity: TypeInformation::class, inversedBy: "informations")]
    #[ORM\JoinColumn(name: "type_info_id", referencedColumnName: "type_info_id", nullable: false)]
    #[Groups(['information:read', 'information:write'])]
    #[MaxDepth(1)]
    private ?TypeInformation $typeInformation = null;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'information')]
    private Collection $interactions;

    public function __construct()
    {
        $this->utilisateurs = new ArrayCollection();
        $this->interactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInfoTitre(): ?string
    {
        return $this->info_titre;
    }

    public function setInfoTitre(string $info_titre): static
    {
        $this->info_titre = $info_titre;

        return $this;
    }

    public function getInfoDescription(): ?string
    {
        return $this->info_description;
    }

    public function setInfoDescription(string $info_description): static
    {
        $this->info_description = $info_description;

        return $this;
    }

    public function getInfoContenu(): ?string
    {
        return $this->info_contenu;
    }

    public function setInfoContenu(string $info_contenu): static
    {
        $this->info_contenu = $info_contenu;

        return $this;
    }

    public function isInfoActive(): ?bool
    {
        return $this->info_active;
    }

    public function setInfoActive(bool $info_active): static
    {
        $this->info_active = $info_active;

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
            $utilisateur->addInformation($this);
        }

        return $this;
    }

    public function removeUtilisateur(Utilisateur $utilisateur): static
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            $utilisateur->removeInformation($this);
        }

        return $this;
    }

    public function getTypeInformation(): ?TypeInformation
    {
        return $this->typeInformation;
    }

    public function setTypeInformation(?TypeInformation $typeInformation): static
    {
        $this->typeInformation = $typeInformation;

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
}
