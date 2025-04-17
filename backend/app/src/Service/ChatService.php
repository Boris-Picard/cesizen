<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class ChatService
{
    public function __construct(
        protected HttpClientInterface $client,
        protected string $apiKey
    ) {}

    public function ask(string $message): ?string
    {
        try {
            $url = 'https://api.cohere.com/v2/chat';
            $headers = [
                'Content-Type'  => 'application/json',
                'Authorization' => 'Bearer ' . $this->apiKey,
            ];

            $payload = [
                'model'    => 'command-r',
                'messages' => [
                    ['role' => 'user', 'content' => $message],
                ],
                'temperature' => 0.3,
                'max_tokens' => 500,
                'frequency_penalty' => 0.4,
                'presence_penalty' => 0.2,
                'p' => 0.9
            ];

            $response = $this->client->request('POST', $url, [
                'headers' => $headers,
                'json'    => $payload,
            ]);

            $data = $response->toArray();

            return $data['message']['content'][0]['text'] ?? null;
        } catch (\Exception $e) {
            return 'Erreur lors de la requête à l\'API : ' . $e->getMessage();
        }
    }
}
