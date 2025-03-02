<?php
// src/Service/AnonymizationService.php
namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class AnonymizationService
{

    public function __construct(protected EntityManagerInterface $entityManager) {}

    public function anonymizeUser(int $userId): void
    {
        $conn = $this->entityManager->getConnection();
        $sql = 'SELECT anonymize_utilisateur(:p_ut_id)';
        $conn->executeQuery($sql, ['p_ut_id' => $userId]);
    }
}
