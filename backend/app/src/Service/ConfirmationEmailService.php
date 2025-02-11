<?php

namespace App\Service;

use App\Entity\Utilisateur;
use App\Entity\Validation;
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
        protected string $senderEmail,
        protected string $frontUrl
    ) {}

    /**
     * Envoie un e-mail de confirmation avec un token JWT stocké en base dans l'entité Validation
     */
    public function sendConfirmationEmail(Utilisateur $user): void
    {
        $existingValidation = $this->entityManager->getRepository(Validation::class)
            ->findOneBy([
                'utilisateur' => $user,
                'type_validation' => 'account_confirmation'
            ]);

        if ($existingValidation) {
            $this->entityManager->remove($existingValidation);
            $this->entityManager->flush();
        }

        // Générer le token via JWT avec une expiration de 24 heures
        $payload = [
            'ut_mail' => $user->getUtMail(),
            'exp'      => time() + 86400, // expiration dans 24 heures
            'action'   => 'account_confirmation',
        ];
        $token = $this->jwtEncoder->encode($payload);

        // Créer une nouvelle instance de Validation et la remplir
        $validation = new Validation();
        $validation->setValidationToken($token);
        $validation->setTypeValidation('account_confirmation');
        $validation->setDateExpirationToken((new \DateTime())->add(new \DateInterval('PT24H')));
        $validation->setUtilisateur($user);

        $this->entityManager->persist($validation);
        $this->entityManager->flush();

        $relativeUrl = $this->urlGenerator->generate(
            'account_confirmation',
            ['token' => $token]
        );
        $confirmationUrl = rtrim($this->frontUrl, '/') . $relativeUrl;

        // Construction et envoi de l'email
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
     * Valide le token de confirmation en vérifiant l'existence de l'enregistrement dans la table Validation,
     * active le compte de l'utilisateur, puis supprime l'enregistrement pour empêcher toute réutilisation.
     */
    public function confirmAccount(string $token): Utilisateur
    {
        $validation = $this->entityManager->getRepository(Validation::class)
            ->findOneBy([
                'validation_token' => $token,
                'type_validation'  => 'account_confirmation'
            ]);

        if (!$validation) {
            try {
                $payload = $this->jwtEncoder->decode($token);
                $user = $this->entityManager->getRepository(Utilisateur::class)
                    ->findOneBy(['ut_mail' => $payload['ut_mail']]);
                if ($user && $user->isUtActive()) {
                    return $user;
                }
            } catch (\Exception $e) {
                // Le token est invalide, on passe à l'exception ci-dessous.
            }
            throw new \Exception('Token invalide ou inexistant.');
        }

        $user = $validation->getUtilisateur();
        if (!$user) {
            throw new \Exception('Utilisateur non trouvé.');
        }
        $user->setUtActive(true);
        $this->entityManager->persist($user);
        $this->entityManager->remove($validation);
        $this->entityManager->flush();

        return $user;
    }
}
