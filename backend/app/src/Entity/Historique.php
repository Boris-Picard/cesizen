<?php

namespace App\Entity;

use App\Repository\HistoriqueRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HistoriqueRepository::class)]
class Historique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $idObj = null;

    #[ORM\Column(length: 100)]
    private ?string $nomTable = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $ancienneValeur = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $nouvelleValeur = null;

    #[ORM\ManyToOne(inversedBy: 'historiques')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TypeHistorique $type = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdObj(): ?int
    {
        return $this->idObj;
    }

    public function setIdObj(int $idObj): static
    {
        $this->idObj = $idObj;

        return $this;
    }

    public function getNomTable(): ?string
    {
        return $this->nomTable;
    }

    public function setNomTable(string $nomTable): static
    {
        $this->nomTable = $nomTable;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getAncienneValeur(): ?string
    {
        return $this->ancienneValeur;
    }

    public function setAncienneValeur(string $ancienneValeur): static
    {
        $this->ancienneValeur = $ancienneValeur;

        return $this;
    }

    public function getNouvelleValeur(): ?string
    {
        return $this->nouvelleValeur;
    }

    public function setNouvelleValeur(string $nouvelleValeur): static
    {
        $this->nouvelleValeur = $nouvelleValeur;

        return $this;
    }

    public function getType(): ?TypeHistorique
    {
        return $this->type;
    }

    public function setType(?TypeHistorique $type): static
    {
        $this->type = $type;

        return $this;
    }
}
