<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeHistoriqueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['typehistorique:read']],
    denormalizationContext: ['groups' => ['typehistorique:write']]
)]
#[ORM\Entity(repositoryClass: TypeHistoriqueRepository::class)]
class TypeHistorique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "type_histo_id", type: "integer")]
    #[Groups(['typehistorique:read', 'historique:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['typehistorique:read', 'typehistorique:write', 'historique:read'])]
    private ?string $type_histo_libelle = null;

    /**
     * @var Collection<int, Historique>
     */
    #[ORM\OneToMany(mappedBy: "typeHistorique", targetEntity: Historique::class)]
    private Collection $historiques;

    public function __construct()
    {
        $this->historiques = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeHistoLibelle(): ?string
    {
        return $this->type_histo_libelle;
    }

    public function setTypeHistoLibelle(string $type_histo_libelle): static
    {
        $this->type_histo_libelle = $type_histo_libelle;

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
            $historique->setTypeHistorique($this);
        }

        return $this;
    }

    public function removeHistorique(Historique $historique): static
    {
        if ($this->historiques->removeElement($historique)) {
            // set the owning side to null (unless already changed)
            if ($historique->getTypeHistorique() === $this) {
                $historique->setTypeHistorique(null);
            }
        }

        return $this;
    }
}
