<?php 

namespace App\Service;

use App\Entity\Utilisateur;
use App\Entity\Validation;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Resend\Resend;
use Resend\Resources\Emails;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ConfirmationEmailService
{
    private Emails $emailClient;

    public function __construct(
        protected JWTEncoderInterface $jwtEncoder,
        protected UrlGeneratorInterface $urlGenerator,
        protected EntityManagerInterface $entityManager,
        string $resendApiKey,
        protected string $senderEmail,
        protected string $frontUrl
    ) {
        $resend = Resend::client($resendApiKey);
        $this->emailClient = new Emails($resend);
    }

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

        $payload = [
            'ut_mail' => $user->getUtMail(),
            'exp'      => time() + 86400,
            'action'   => 'account_confirmation',
        ];
        $token = $this->jwtEncoder->encode($payload);

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

        $subject = 'Confirmation de votre inscription';
        $html = "<p>Bonjour " . $user->getUtPrenom() . ",</p>
                <p>Pour confirmer votre inscription, cliquez sur le lien suivant :</p>
                <p><a href=\"{$confirmationUrl}\">Confirmer mon compte</a></p>";

        try {
            $this->emailClient->send([
                'from' => $this->senderEmail,
                'to' => $user->getUtMail(),
                'subject' => $subject,
                'html' => $html,
            ]);
        } catch (\Exception $e) {
            throw new \Exception('Erreur lors de l’envoi de l’e-mail : ' . $e->getMessage());
        }
    }

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
            } catch (\Exception $e) {}
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
