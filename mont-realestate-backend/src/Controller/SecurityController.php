<?php

/*namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api', name: 'api_')]
class SecurityController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(
        Request $request,
        JWTTokenManagerInterface $JWTManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['message' => 'Invalid credentials'], 400);
        }

        $user = $this->entityManager
            ->getRepository(Utilisateur::class)
            ->findOneBy(['email' => $data['email']]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['message' => 'Invalid credentials'], 401);
        }

        // Générer le JWT
        $jwt = $JWTManager->create($user);

        // Créer une réponse avec le JWT dans un cookie sécurisé
        $response = new JsonResponse(['message' => 'Login successful']);
        $response->headers->setCookie(
            new \Symfony\Component\HttpFoundation\Cookie(
                'auth_token',
                $jwt,
                time() + (14 * 24 * 60 * 60), // Expiration: 2 semaines
                '/',
                null,
                true,  // HTTPS uniquement
                true,  // HTTPOnly
                false,
                'Strict'
            )
        );

        return $response;
    }

    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): Response {
        $response = new JsonResponse(['message' => 'Logout successful']);
        $response->headers->clearCookie('auth_token', '/', null, true, true, 'Strict');
        return $response;
    }
}*/