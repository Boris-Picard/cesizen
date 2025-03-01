<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeInformationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['typeinformation:read']],
    denormalizationContext: ['groups' => ['typeinformation:write']]
)]
#[ORM\Entity(repositoryClass: TypeInformationRepository::class)]
class TypeInformation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "type_info_id", type: "integer")]
    #[Groups(['typeinformation:read', 'information:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['typeinformation:read', 'typeinformation:write', 'information:read', 'utilisateur:read'])]
    private ?string $type_info_nom = null;

    /**
     * @var Collection<int, Information>
     */
    #[ORM\OneToMany(targetEntity: Information::class, mappedBy: 'typeInformation')]
    private Collection $informations;

    public function __construct()
    {
        $this->informations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeInfoNom(): ?string
    {
        return $this->type_info_nom;
    }

    public function setTypeInfoNom(string $type_info_nom): static
    {
        $this->type_info_nom = $type_info_nom;

        return $this;
    }

    /**
     * @return Collection<int, Information>
     */
    public function getInformation(): Collection
    {
        return $this->informations;
    }

    public function addInformation(Information $typeInformation): static
    {
        if (!$this->informations->contains($typeInformation)) {
            $this->informations->add($typeInformation);
            $typeInformation->setTypeInformation($this);
        }

        return $this;
    }

    public function removeInformation(Information $typeInformation): static
    {
        if ($this->informations->removeElement($typeInformation)) {
            // set the owning side to null (unless already changed)
            if ($typeInformation->getTypeInformation() === $this) {
                $typeInformation->setTypeInformation(null);
            }
        }

        return $this;
    }
}
