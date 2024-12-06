<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Psr\Log\LoggerInterface;

/**
 * Contrôleur pour les opérations utilisateur.
 */
#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    private LoggerInterface $logger;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        LoggerInterface $logger
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->logger = $logger;
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['message' => 'Invalid data'], 400);
        }

        $existingUser = $this->entityManager->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['message' => 'Email already exists'], 400);
        }

        try {
            $user = new Utilisateur();
            $user->setEmail($data['email']);
            $user->setPassword($this->passwordHasher->hashPassword($user, $data['password']));

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'User created'], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'An error occurred while creating the user.'], 500);
        }
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

        $user = $this->entityManager->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['message' => 'Invalid email or password'], 401);
        }

        // Générer le JWT
        $token = $JWTManager->create($user);

        // Envoyer le token dans un cookie sécurisé
        $response = new JsonResponse(['message' => 'Login successful']);
        $response->headers->setCookie(
            new Cookie(
                'auth_token',
                $token,
                time() + (14 * 24 * 60 * 60),
                '/',
                null,
                false,  // HTTPS uniquement (mettre false en local)
                true,   // HTTPOnly
                false,
                Cookie::SAMESITE_STRICT
            )
        );
        error_log('Cookie auth_token set: ' . $token);
        return $response;
    }

    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        $response = new JsonResponse(['message' => 'Logout successful']);
        $response->headers->clearCookie('auth_token', '/', null, true, true, 'Strict');
        return $response;
    }

    #[Route('/me', name: 'me', methods: ['GET'])]
    public function me(Request $request): JsonResponse
    {
        $cookies = $request->cookies->all();
        // Log les cookies pour vérifier s'ils sont bien reçus
        $this->logger->info('Cookies reçus : ', $cookies);

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Unauthorized'], 401);
        }

        return new JsonResponse([
            'email' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
        ]);
    }
}