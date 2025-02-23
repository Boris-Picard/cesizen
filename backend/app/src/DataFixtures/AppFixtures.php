<?php

namespace App\DataFixtures;

use App\Entity\Exercice;
use App\Entity\Role;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Exercice 1 : Respiration carrée (Intermédiaire)
        $ex1 = new Exercice();
        $ex1->setExNom('Respiration carrée');
        $ex1->setExDescription('Un exercice simple pour améliorer la cohérence cardiaque et réduire le stress.');
        $ex1->setExDifficulty('Intermédiaire');
        $ex1->setExDuration(5); // durée en minutes
        $ex1->setExBenefits([
            'Régule le rythme cardiaque',
            'Améliore le sommeil'
        ]);
        $ex1->setExInspiration(4);
        $ex1->setExApnee(4);
        $ex1->setExExpiration(4);
        $ex1->setExActive(true);
        $manager->persist($ex1);

        // Exercice 2 : Respiration profonde (Débutant)
        $ex2 = new Exercice();
        $ex2->setExNom('Respiration profonde');
        $ex2->setExDescription('Un exercice de respiration pour débutants, visant à calmer l’esprit et améliorer l’oxygénation.');
        $ex2->setExDifficulty('Débutant');
        $ex2->setExDuration(3);
        $ex2->setExBenefits([
            'Calme l\'esprit',
            'Réduit l\'anxiété'
        ]);
        $ex2->setExInspiration(5);
        $ex2->setExApnee(0);
        $ex2->setExExpiration(5);
        $ex2->setExActive(true);
        $manager->persist($ex2);

        // Exercice 3 : Respiration Wim Hof (Avancé)
        $ex3 = new Exercice();
        $ex3->setExNom('Respiration Wim Hof');
        $ex3->setExDescription('Une technique avancée pour stimuler l\'endurance, renforcer le système immunitaire et améliorer la résilience.');
        $ex3->setExDifficulty('Avancé');
        $ex3->setExDuration(10);
        $ex3->setExBenefits([
            'Renforce le système immunitaire',
            'Augmente l\'énergie',
            'Améliore la récupération'
        ]);
        $ex3->setExInspiration(30);
        $ex3->setExApnee(15);
        $ex3->setExExpiration(15);
        $ex3->setExActive(true);
        $manager->persist($ex3);

        // Exercice 4 : Respiration alternée (Intermédiaire)
        $ex4 = new Exercice();
        $ex4->setExNom('Respiration alternée');
        $ex4->setExDescription('Un exercice qui consiste à alterner la respiration entre les narines pour équilibrer l\'énergie et favoriser la concentration.');
        $ex4->setExDifficulty('Intermédiaire');
        $ex4->setExDuration(7);
        $ex4->setExBenefits([
            'Améliore la concentration',
            'Équilibre l\'énergie'
        ]);
        $ex4->setExInspiration(6);
        $ex4->setExApnee(4);
        $ex4->setExExpiration(6);
        $ex4->setExActive(true);
        $manager->persist($ex4);

        // Exercice 5 : Respiration guidée (Débutant)
        $ex5 = new Exercice();
        $ex5->setExNom('Respiration guidée');
        $ex5->setExDescription('Un exercice doux et accessible pour apprendre à respirer profondément, guidé par une voix ou un visuel.');
        $ex5->setExDifficulty('Débutant');
        $ex5->setExDuration(4);
        $ex5->setExBenefits([
            'Réduit le stress',
            'Favorise la détente'
        ]);
        $ex5->setExInspiration(5);
        $ex5->setExApnee(2);
        $ex5->setExExpiration(5);
        $ex5->setExActive(true);
        $manager->persist($ex5);

        // Exercice 6 : Respiration rythmée (Avancé)
        $ex6 = new Exercice();
        $ex6->setExNom('Respiration rythmée');
        $ex6->setExDescription('Un exercice avancé qui synchronise mouvements et respiration pour améliorer la performance physique et mentale.');
        $ex6->setExDifficulty('Avancé');
        $ex6->setExDuration(8);
        $ex6->setExBenefits([
            'Améliore la performance',
            'Renforce la coordination',
            'Favorise la concentration'
        ]);
        $ex6->setExInspiration(7);
        $ex6->setExApnee(3);
        $ex6->setExExpiration(7);
        $ex6->setExActive(true);
        $manager->persist($ex6);

        // Exercice 7 : Respiration en cohérence (Intermédiaire)
        $ex7 = new Exercice();
        $ex7->setExNom('Respiration en cohérence');
        $ex7->setExDescription('Un exercice pour synchroniser votre rythme respiratoire avec votre fréquence cardiaque et améliorer la cohérence cardiaque.');
        $ex7->setExDifficulty('Intermédiaire');
        $ex7->setExDuration(6);
        $ex7->setExBenefits([
            'Synchronise le rythme cardiaque',
            'Réduit le stress'
        ]);
        $ex7->setExInspiration(6);
        $ex7->setExApnee(3);
        $ex7->setExExpiration(6);
        $ex7->setExActive(true);
        $manager->persist($ex7);

        // Exercice 8 : Respiration consciente (Débutant)
        $ex8 = new Exercice();
        $ex8->setExNom('Respiration consciente');
        $ex8->setExDescription('Un exercice pour apprendre à prendre conscience de sa respiration et à se recentrer.');
        $ex8->setExDifficulty('Débutant');
        $ex8->setExDuration(4);
        $ex8->setExBenefits([
            'Favorise la pleine conscience',
            'Aide à la concentration'
        ]);
        $ex8->setExInspiration(5);
        $ex8->setExApnee(1);
        $ex8->setExExpiration(5);
        $ex8->setExActive(true);
        $manager->persist($ex8);

        // Exercice 9 : Respiration relaxante (Intermédiaire)
        $ex9 = new Exercice();
        $ex9->setExNom('Respiration relaxante');
        $ex9->setExDescription('Un exercice conçu pour réduire la tension et induire un état de relaxation profonde.');
        $ex9->setExDifficulty('Intermédiaire');
        $ex9->setExDuration(5);
        $ex9->setExBenefits([
            'Induit la relaxation',
            'Diminue la tension musculaire'
        ]);
        $ex9->setExInspiration(4);
        $ex9->setExApnee(3);
        $ex9->setExExpiration(4);
        $ex9->setExActive(true);
        $manager->persist($ex9);

        // Exercice 10 : Respiration dynamique (Avancé)
        $ex10 = new Exercice();
        $ex10->setExNom('Respiration dynamique');
        $ex10->setExDescription('Un exercice dynamique pour renforcer la capacité pulmonaire et stimuler la vitalité.');
        $ex10->setExDifficulty('Avancé');
        $ex10->setExDuration(9);
        $ex10->setExBenefits([
            'Augmente la capacité pulmonaire',
            'Stimule la vitalité',
            'Améliore la circulation'
        ]);
        $ex10->setExInspiration(8);
        $ex10->setExApnee(4);
        $ex10->setExExpiration(8);
        $ex10->setExActive(true);
        $manager->persist($ex10);

        // Création de rôles (si nécessaire pour vos utilisateurs)
        $r1 = new Role();
        $r1->setRoleNom('ROLE_USER');
        $manager->persist($r1);

        $r2 = new Role();
        $r2->setRoleNom('ROLE_ADMIN');
        $manager->persist($r2);

        $manager->flush();
    }
}
