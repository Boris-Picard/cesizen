<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\HistoriqueRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    paginationItemsPerPage: 100,
    normalizationContext: ['groups' => ['historique:read']],
    denormalizationContext: ['groups' => ['historique:write']],
    operations: [
        new Get(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Post(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN')"
        ),
    ]
)]
#[ORM\Entity(repositoryClass: HistoriqueRepository::class)]
class Historique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "histo_id", type: "integer")]
    #[Groups(['historique:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['historique:read', 'historique:write'])]
    private ?int $histo_id_obj = null;

    #[ORM\Column(length: 100)]
    #[Groups(['historique:read', 'historique:write'])]
    private ?string $histo_nom_table = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['historique:read', 'historique:write'])]
    private ?\DateTimeInterface $histo_date = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['historique:read', 'historique:write'])]
    private ?string $histo_ancienne_valeur = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['historique:read', 'historique:write'])]
    private ?string $histo_nouvelle_valeur = null;

    #[ORM\ManyToOne(targetEntity: TypeHistorique::class, inversedBy: "historiques")]
    #[ORM\JoinColumn(name: "type_histo_id", referencedColumnName: "type_histo_id", nullable: false)]
    #[Groups(['historique:read', 'historique:write'])]
    private ?TypeHistorique $typeHistorique = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHistoIdObj(): ?int
    {
        return $this->histo_id_obj;
    }

    public function setHistoIdObj(int $histo_id_obj): static
    {
        $this->histo_id_obj = $histo_id_obj;

        return $this;
    }

    public function getHistoNomTable(): ?string
    {
        return $this->histo_nom_table;
    }

    public function setHistoNomTable(string $histo_nom_table): static
    {
        $this->histo_nom_table = $histo_nom_table;

        return $this;
    }

    public function getHistoDate(): ?\DateTimeInterface
    {
        return $this->histo_date;
    }

    public function setHistoDate(\DateTimeInterface $histo_date): static
    {
        $this->histo_date = $histo_date;

        return $this;
    }

    public function getHistoAncienneValeur(): ?string
    {
        return $this->histo_ancienne_valeur;
    }

    public function setHistoAncienneValeur(string $histo_ancienne_valeur): static
    {
        $this->histo_ancienne_valeur = $histo_ancienne_valeur;

        return $this;
    }

    public function getHistoNouvelleValeur(): ?string
    {
        return $this->histo_nouvelle_valeur;
    }

    public function setHistoNouvelleValeur(string $histo_nouvelle_valeur): static
    {
        $this->histo_nouvelle_valeur = $histo_nouvelle_valeur;

        return $this;
    }

    public function getTypeHistorique(): ?TypeHistorique
    {
        return $this->typeHistorique;
    }

    public function setTypeHistorique(?TypeHistorique $typeHistorique): static
    {
        $this->typeHistorique = $typeHistorique;

        return $this;
    }
}
