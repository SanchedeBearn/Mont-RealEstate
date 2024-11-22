<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
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

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->logger = $logger;
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $this->logger->info('Register endpoint accessed.', ['data' => $data]);

        if (!isset($data['email'], $data['password'])) {
            $this->logger->error('Invalid data provided for registration.', ['data' => $data]);
            return new JsonResponse(['message' => 'Invalid data'], 400);
        }

        try {
            $user = new Utilisateur();
            $user->setEmail($data['email']);
            $user->setPassword($this->passwordHasher->hashPassword($user, $data['password']));

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            $this->logger->info('User successfully created.', ['email' => $data['email']]);
            return new JsonResponse(['message' => 'User created'], 201);
        } catch (\Exception $e) {
            $this->logger->error('Error during user registration.', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);
            return new JsonResponse(['message' => 'An error occurred while creating the user.'], 500);
        }
    }


    #[Route('/users', name: 'list_users', methods: ['GET'])]
    public function listUsers(): JsonResponse
    {
        $users = $this->entityManager->getRepository(Utilisateur::class)->findAll();
        $usersData = array_map(fn(Utilisateur $user) => ['email' => $user->getEmail()], $users);

        $this->logger->info('Users listed.', ['count' => count($usersData)]);

        return new JsonResponse($usersData);
    }

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $this->logger->info('Login endpoint accessed.', ['data' => $data]);

        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['message' => 'Invalid data'], 400);
        }

        $user = $this->entityManager->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);

        if (!$user) {
            $this->logger->warning('Login failed: User not found.', ['email' => $data['email']]);
            return new JsonResponse(['message' => 'Utilisateur introuvable.'], 404);
        }

        if (!$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            $this->logger->warning('Login failed: Incorrect password.', ['email' => $data['email']]);
            return new JsonResponse(['message' => 'Mot de passe incorrect.'], 401);
        }

        // Simuler un token JWT pour cet exemple
        $token = base64_encode(json_encode(['email' => $user->getEmail(), 'exp' => time() + 3600]));

        $this->logger->info('Login successful.', ['email' => $data['email']]);
        return new JsonResponse(['token' => $token], 200);
    }

}
