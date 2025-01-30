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
    private ?int $idObject = null;

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
    private ?TypeHistorique $typeHistorique = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getIdObject(): ?int
    {
        return $this->idObject;
    }

    public function setIdObject(int $idObject): static
    {
        $this->idObject = $idObject;

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
