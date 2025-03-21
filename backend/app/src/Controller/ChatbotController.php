<?php

namespace App\Controller;

use App\Service\ChatGPTService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ChatbotController extends AbstractController
{
    #[Route("/api/chatbot", name: "api_chatbot", methods: "POST")]
    public function index(Request $request, ChatGPTService $chatGPTService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $message = $data['message'] ?? '';

        if (empty($message)) {
            return new JsonResponse(['error' => 'Message is required'], 400);
        }

        $reply = $chatGPTService->ask($message);

        return new JsonResponse(['reply' => $reply]);
    }
}
