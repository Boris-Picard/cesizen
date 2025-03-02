<?php

namespace App\EventListener;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTCreatedListener
{
    public function __construct(
        protected RequestStack $requestStack,
        protected UtilisateurRepository $userRepository
    ) {}

    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $payload = $event->getData();

        if (!isset($payload['username'])) {
            return;
        }
        $user = $this->userRepository->findOneBy(['ut_mail' => $payload['username']]);

        if (!$user instanceof Utilisateur) {
            return;
        }

        $payload['id'] = $user->getId();
        $payload['firstname'] = $user->getUtPrenom();
        $payload['lastname'] = $user->getUtNom();
        $payload['ut_mail_anonymized'] = $user->getUtMailAnonymized();

        $event->setData($payload);
    }
}
