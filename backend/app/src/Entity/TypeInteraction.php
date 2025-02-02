<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeInteractionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['typeinteraction:read']],
    denormalizationContext: ['groups' => ['typeinteraction:write']]
)]
#[ORM\Entity(repositoryClass: TypeInteractionRepository::class)]
class TypeInteraction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "type_inter_id", type: "integer")]
    #[Groups(['typeinteraction:read', 'interaction:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['typeinteraction:read', 'typeinteraction:write', 'interaction:read'])]
    private ?string $type_inter_libelle = null;

    /**
     * @var Collection<int, Interaction>
     */
    #[ORM\OneToMany(targetEntity: Interaction::class, mappedBy: 'typeInteraction')]
    private Collection $interactions;

    public function __construct()
    {
        $this->interactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeInterLibelle(): ?string
    {
        return $this->type_inter_libelle;
    }

    public function setTypeInterLibelle(string $type_inter_libelle): static
    {
        $this->type_inter_libelle = $type_inter_libelle;

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
            $interaction->setTypeInteraction($this);
        }

        return $this;
    }

    public function removeInteraction(Interaction $interaction): static
    {
        if ($this->interactions->removeElement($interaction)) {
            // set the owning side to null (unless already changed)
            if ($interaction->getTypeInteraction() === $this) {
                $interaction->setTypeInteraction(null);
            }
        }

        return $this;
    }
}
