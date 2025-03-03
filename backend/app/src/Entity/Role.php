<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

#[ApiResource(
    normalizationContext: ['groups' => ['role:read']],
    denormalizationContext: ['groups' => ['role:write']],
    operations: [
        new Get(),
        new GetCollection(),
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
#[ORM\Entity(repositoryClass: RoleRepository::class)]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "role_id", type: "integer")]
    #[Groups(['role:read', 'utilisateur:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['role:read', 'role:write', 'utilisateur:read'])]
    private ?string $role_nom = null;

    #[ORM\OneToMany(mappedBy: "role", targetEntity: Utilisateur::class)]
    #[Groups(['role:read'])]
    #[MaxDepth(1)]
    private Collection $utilisateurs;

    public function __construct()
    {
        $this->utilisateurs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRoleNom(): ?string
    {
        return $this->role_nom;
    }

    public function setRoleNom(string $role_nom): self
    {
        $this->role_nom = $role_nom;
        return $this;
    }

    /**
     * Retourne la collection des utilisateurs liés à ce rôle.
     */
    public function getUtilisateurs(): Collection
    {
        return $this->utilisateurs;
    }

    /**
     * Définit la collection complète des utilisateurs (optionnel, à utiliser avec précaution).
     */
    public function setUtilisateurs(Collection $utilisateurs): self
    {
        $this->utilisateurs = $utilisateurs;
        return $this;
    }

    public function addUtilisateur(Utilisateur $utilisateur): self
    {
        if (!$this->utilisateurs->contains($utilisateur)) {
            $this->utilisateurs->add($utilisateur);
            $utilisateur->setRole($this);
        }
        return $this;
    }

    public function removeUtilisateur(Utilisateur $utilisateur): self
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            // Si le rôle de l'utilisateur est ce rôle, on le remet à null
            if ($utilisateur->getRole() === $this) {
                $utilisateur->setRole(null);
            }
        }
        return $this;
    }
}
