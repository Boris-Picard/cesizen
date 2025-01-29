<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeHistoriqueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TypeHistoriqueRepository::class)]
#[ApiResource]
class TypeHistorique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $libelle = null;

    /**
     * @var Collection<int, Historique>
     */
    #[ORM\OneToMany(targetEntity: Historique::class, mappedBy: 'type')]
    private Collection $historiques;

    public function __construct()
    {
        $this->historiques = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): static
    {
        $this->libelle = $libelle;

        return $this;
    }

    /**
     * @return Collection<int, Historique>
     */
    public function getHistoriques(): Collection
    {
        return $this->historiques;
    }

    public function addHistorique(Historique $historique): static
    {
        if (!$this->historiques->contains($historique)) {
            $this->historiques->add($historique);
            $historique->setType($this);
        }

        return $this;
    }

    public function removeHistorique(Historique $historique): static
    {
        if ($this->historiques->removeElement($historique)) {
            // set the owning side to null (unless already changed)
            if ($historique->getType() === $this) {
                $historique->setType(null);
            }
        }

        return $this;
    }
}
