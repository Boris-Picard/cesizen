<?php

namespace App\Controller;

use App\Service\ChatService;
use App\Service\RagService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ChatbotController extends AbstractController
{
    public function __construct(protected EntityManagerInterface $entityManager,  protected Security $security, protected RagService $ragService) {}

    #[Route("/api/chatbot", name: "api_chatbot", methods: "POST")]
    public function index(Request $request, ChatService $chatService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $existingUser = $this->security->getUser();

        if (!$existingUser) {
            return new JsonResponse(['error' => 'Vous devez être connecté'], 401);
        }

        $message = $data['message'] ?? '';

        if (empty($message)) {
            return new JsonResponse(['error' => 'Message is required'], 400);
        }

        $context = $this->ragService->findContext($message);

        $finalPrompt = '';

        if (!$context) {
            $context = "Ce site s'appelle CESIZen. Il est dédié à la santé mentale et propose des outils comme le diagnostic de stress, la respiration, un tracker d’émotions, etc.";
        }

        $finalPrompt .= "### CONTEXTE ###\n" . $context . "\n\n";
        $finalPrompt .= "### QUESTION UTILISATEUR ###\n" . $message;

        $reply = $chatService->ask($finalPrompt);

        if (str_starts_with($reply, 'Erreur')) {
            return new JsonResponse(['error' => $reply], 500);
        }

        return new JsonResponse(['reply' => $reply]);
    }
}
