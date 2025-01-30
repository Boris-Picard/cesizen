<?php

namespace App\Entity;

use App\Repository\TypeInformationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TypeInformationRepository::class)]
class TypeInformation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nom = null;

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
            $information->setTypeInformation($this);
        }

        return $this;
    }

    public function removeInformation(Information $information): static
    {
        if ($this->informations->removeElement($information)) {
            // set the owning side to null (unless already changed)
            if ($information->getTypeInformation() === $this) {
                $information->setTypeInformation(null);
            }
        }

        return $this;
    }
}
