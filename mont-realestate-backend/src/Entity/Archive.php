<?php

namespace App\Entity;

use App\Repository\ArchiveRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArchiveRepository::class)]
class Archive
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Adresse = null;

    #[ORM\Column]
    private ?int $SalleBain = null;

    #[ORM\Column]
    private ?int $Chambre = null;

    #[ORM\Column]
    private ?int $Surface = null;

    #[ORM\Column]
    private ?float $PrixPred = null;

    #[ORM\Column(nullable: true)]
    private ?array $Images = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Lieu $Lieu = null;

    #[ORM\ManyToOne(inversedBy: 'archive')]
    private ?Utilisateur $Utilisateur = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $DateCreation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdresse(): ?string
    {
        return $this->Adresse;
    }

    public function setAdresse(string $Adresse): static
    {
        $this->Adresse = $Adresse;

        return $this;
    }

    public function getSalleBain(): ?int
    {
        return $this->SalleBain;
    }

    public function setSalleBain(int $SalleBain): static
    {
        $this->SalleBain = $SalleBain;

        return $this;
    }

    public function getChambre(): ?int
    {
        return $this->Chambre;
    }

    public function setChambre(int $Chambre): static
    {
        $this->Chambre = $Chambre;

        return $this;
    }

    public function getSurface(): ?int
    {
        return $this->Surface;
    }

    public function setSurface(int $Surface): static
    {
        $this->Surface = $Surface;

        return $this;
    }

    public function getPrixPred(): ?float
    {
        return $this->PrixPred;
    }

    public function setPrixPred(float $PrixPred): static
    {
        $this->PrixPred = $PrixPred;

        return $this;
    }

    public function getImages(): ?array
    {
        return $this->Images;
    }

    public function setImages(?array $Images): static
    {
        $this->Images = $Images;

        return $this;
    }

    public function getLieu(): ?Lieu
    {
        return $this->Lieu;
    }

    public function setLieu(?Lieu $Lieu): static
    {
        $this->Lieu = $Lieu;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->Utilisateur;
    }

    public function setUtilisateur(?Utilisateur $Utilisateur): static
    {
        $this->Utilisateur = $Utilisateur;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->DateCreation;
    }

    public function setDateCreation(\DateTimeInterface $DateCreation): static
    {
        $this->DateCreation = $DateCreation;

        return $this;
    }
}
