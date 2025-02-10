<?php

namespace App\Service;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ConfirmationEmailService
{

    public function __construct(
        protected JWTEncoderInterface $jwtEncoder,
        protected UrlGeneratorInterface $urlGenerator,
        protected EntityManagerInterface $entityManager,
        protected MailerInterface $mailerInterface,
        protected string $senderEmail
    ) {}

    /**
     * Envoie un e-mail de confirmation avec un token JWT
     */
    public function sendConfirmationEmail(Utilisateur $user): void
    {
        $payload = [
            'ut_mail' => $user->getUtMail(),
            'exp'      => time() + 86400,             // expiration dans 24 heures
            'action'   => 'account_confirmation',
        ];

        $token = $this->jwtEncoder->encode($payload);

        $confirmationUrl = $this->urlGenerator->generate(
            'account_confirmation',
            ['token' => $token],
            UrlGeneratorInterface::ABSOLUTE_URL
        );

        $email = (new Email())
            ->from($this->senderEmail)
            ->to($user->getUtMail())
            ->subject('Confirmation de votre inscription')
            ->text("Merci de confirmer votre inscription en visitant le lien suivant: {$confirmationUrl}")
            ->html("<p>Bonjour " . $user->getUtPrenom() . ",</p>
                <p>Pour confirmer votre inscription, cliquez sur le lien suivant :</p>
                <p><a href=\"{$confirmationUrl}\">Confirmer mon compte</a></p>");

        try {
            $this->mailerInterface->send($email);
        } catch (\Exception $error) {
            throw new \Exception($error->getMessage());
        }
    }

    /**
     * Valide le token de confirmation et active le compte de l'utilisateur
     */
    public function confirmAccount(string $token): Utilisateur
    {
        try {
            $payload = $this->jwtEncoder->decode($token);
        } catch (\Exception $e) {
            throw new \Exception('Token invalide ou expiré.');
        }

        if (!isset($payload['action']) || $payload['action'] !== 'account_confirmation') {
            throw new \Exception('Ce token n\'est pas valide pour la confirmation de compte.');
        }

        $user = $this->entityManager->getRepository(Utilisateur::class)
            ->findOneBy(['ut_mail' => $payload['ut_mail']]);

        if (!$user) {
            throw new \Exception('Utilisateur non trouvé.');
        }

        $user->setUtActive(true);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }
}
