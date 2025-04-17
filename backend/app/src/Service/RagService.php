<?php

namespace App\Service;

class RagService
{
    private array $docs;

    public function __construct(string $projectDir)
    {
        $filePath = $projectDir . '/json/cesizen_rag.json';
        $json = file_get_contents($filePath);
        $this->docs = json_decode($json, true) ?? [];
    }

    public function findContext(string $message): ?string
    {
        $message = strtolower($message);

        foreach ($this->docs as $doc) {
            foreach ($doc['keywords'] as $keyword) {
                if (str_contains($message, strtolower($keyword))) {
                    return $doc['content'];
                }
            }
        }

        return null;
    }
}
