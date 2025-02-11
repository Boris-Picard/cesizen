<?php

namespace App\Service;

use App\Entity\Utilisateur;
use App\Entity\Validation;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class PasswordResetService
{
    public function __construct(
        protected JWTEncoderInterface $jwtEncoder,
        protected UrlGeneratorInterface $urlGenerator,
        protected EntityManagerInterface $entityManager,
        protected MailerInterface $mailerInterface,
        protected string $senderEmail,
        protected string $frontUrl
    ) {}

    /**
     * Génère un token JWT pour la réinitialisation du mot de passe,
     * construit l’URL de réinitialisation et envoie un email à l’utilisateur.
     */
    public function sendPasswordResetEmail(Utilisateur $user): void
    {
        $existingValidation = $this->entityManager->getRepository(Validation::class)
            ->findOneBy([
                'utilisateur' => $user,
                'type_validation' => 'password_reset'
            ]);

        if ($existingValidation) {
            $this->entityManager->remove($existingValidation);
            $this->entityManager->flush();
        }

        $payload = [
            'ut_mail' => $user->getUtMail(),
            'exp'     => time() + 3600, // expiration dans 1 heure
            'action'  => 'password_reset',
        ];
        $token = $this->jwtEncoder->encode($payload);

        $validation = new Validation();
        $validation->setValidationToken($token);
        $validation->setTypeValidation('password_reset');
        $validation->setDateExpirationToken((new \DateTime())->add(new \DateInterval('PT1H')));
        $validation->setUtilisateur($user);

        $this->entityManager->persist($validation);
        $this->entityManager->flush();

        $relativeUrl = $this->urlGenerator->generate(
            'app_reset_password',
            ['token' => $token]
        );
        $resetUrl = rtrim($this->frontUrl, '/') . $relativeUrl;

        $email = (new Email())
            ->from($this->senderEmail)
            ->to($user->getUtMail())
            ->subject('Réinitialisation de votre mot de passe')
            ->html(
                "<p>Bonjour,</p>
                <p>Pour réinitialiser votre mot de passe, cliquez sur le lien suivant :</p>
                <p><a href=\"{$resetUrl}\">Réinitialiser mon mot de passe</a></p>"
            );

        $this->mailerInterface->send($email);
    }

    /**
     * Décode et valide le token de réinitialisation du mot de passe.
     *
     * @throws \Exception si le token est invalide ou expiré, ou si l’action ne correspond pas.
     */
    public function validatePasswordResetToken(string $token): Utilisateur
    {
        try {
            $payload = $this->jwtEncoder->decode($token);
        } catch (\Exception $e) {
            throw new \Exception('Token invalide ou expiré.');
        }

        if (!isset($payload['action']) || $payload['action'] !== 'password_reset') {
            throw new \Exception('Ce token n\'est pas valide pour la réinitialisation du mot de passe.');
        }

        $user = $this->entityManager->getRepository(Utilisateur::class)
            ->findOneBy(['ut_mail' => $payload['ut_mail']]);

        if (!$user) {
            throw new \Exception('Utilisateur non trouvé.');
        }

        return $user;
    }
}
