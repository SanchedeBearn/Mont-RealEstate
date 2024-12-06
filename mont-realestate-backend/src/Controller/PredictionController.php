<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api', name: 'api_')]
class PredictionController extends AbstractController
{
    private HttpClientInterface $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }
    
    #[Route('/predict', name: 'predict', methods: ['POST'])]
    public function predict(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['address'], $data['postalCode'], $data['bathrooms'], $data['bedrooms'], $data['surface'])) {
            return new JsonResponse(['error' => 'Invalid input data'], 400);
        }

        try {
            // Appeler le serveur Python
            $response = $this->httpClient->request('POST', 'http://localhost:5000/predict', [
                'json' => $data,
            ]);

            $responseData = $response->toArray();

            return new JsonResponse($responseData, $response->getStatusCode());
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Error communicating with prediction server: ' . $e->getMessage()], 500);
        }
    }
}