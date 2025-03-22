<?php

namespace App\Controller;

use App\Service\ChatService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ChatbotController extends AbstractController
{
    #[Route("/api/chatbot", name: "api_chatbot", methods: "POST")]
    public function index(Request $request, ChatService $chatService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $message = $data['message'] ?? '';

        if (empty($message)) {
            return new JsonResponse(['error' => 'Message is required'], 400);
        }

        $reply = $chatService->ask($message);

        if (str_starts_with($reply, 'Erreur')) {
            return new JsonResponse(['error' => $reply], 500);
        }

        return new JsonResponse(['reply' => $reply]);
    }
}
