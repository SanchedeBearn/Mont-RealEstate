<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Repository\UtilisateurRepository;

#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
class Utilisateur implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    /**
     * @var Collection<int, Archive>
     */
    #[ORM\OneToMany(mappedBy: 'Utilisateur', targetEntity: Archive::class)]
    private Collection $archive;

    public function __construct()
    {
        $this->archive = new ArrayCollection();
    }

    // Getters and setters
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    // Required methods for UserInterface
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function eraseCredentials(): void
    {
        // Clear sensitive temporary data if needed
    }

    // Required method for PasswordAuthenticatedUserInterface
    public function getSalt(): ?string
    {
        // Not needed for modern algorithms like bcrypt
        return null;
    }

    // Archive relationships
    /**
     * @return Collection<int, Archive>
     */
    public function getArchive(): Collection
    {
        return $this->archive;
    }

    public function addArchive(Archive $archive): self
    {
        if (!$this->archive->contains($archive)) {
            $this->archive->add($archive);
            $archive->setUtilisateur($this);
        }

        return $this;
    }

    public function removeArchive(Archive $archive): self
    {
        if ($this->archive->removeElement($archive)) {
            // Set the owning side to null (unless already changed)
            if ($archive->getUtilisateur() === $this) {
                $archive->setUtilisateur(null);
            }
        }

        return $this;
    }
}
