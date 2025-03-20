<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class ChatGPTService
{

    public function __construct(protected HttpClientInterface $client, protected string $apiKey) {}

    public function ask(string $message): ?string
    {
        $url = 'https://api.openai.com/v1/chat/completions';
        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->apiKey,
        ];

        $payload = [
            'model' => 'gpt-4o',
            'messages' => [
                ['role' => 'user', 'content' => $message],
            ],
        ];

        $response = $this->client->request('POST', $url, [
            'headers' => $headers,
            'json' => $payload,
        ]);

        $data = $response->toArray();

        return $data['choices'][0]['message']['content'] ?? null;
    }
}
