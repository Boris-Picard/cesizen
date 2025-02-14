"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Brain, Heart, Lightbulb, Wind, Zap, Smile, Moon, Coffee, Book, Users } from "lucide-react"

const InformationsComponents = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>

        <h1 className="text-4xl font-bold text-green-800 mb-8">Santé Mentale et Bien-être</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section principale sur la santé mentale */}
          <Card className="md:col-span-2 row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Brain className="mr-2 h-6 w-6 text-green-600" />
                Comprendre la Santé Mentale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] md:h-[600px]">
                <div className="space-y-4">
                  <p>
                    La santé mentale est un aspect fondamental de notre bien-être global. Elle englobe notre bien-être
                    émotionnel, psychologique et social, influençant la façon dont nous pensons, ressentons et agissons
                    dans notre vie quotidienne.
                  </p>
                  <h3 className="text-xl font-semibold text-green-700 mt-4">Pourquoi est-ce important ?</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-800">
                    <li>Améliore la qualité de vie</li>
                    <li>Renforce les relations interpersonnelles</li>
                    <li>Augmente la productivité et la créativité</li>
                    <li>Aide à faire face aux défis de la vie</li>
                    <li>Contribue à une meilleure santé physique</li>
                  </ul>
                  <h3 className="text-xl font-semibold text-green-700 mt-4">
                    Comment prendre soin de sa santé mentale ?
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-green-800">
                    <li>Pratiquer régulièrement des exercices de respiration et de méditation</li>
                    <li>Maintenir une activité physique régulière</li>
                    <li>Cultiver des relations sociales positives</li>
                    <li>Adopter une alimentation équilibrée</li>
                    <li>Assurer un sommeil de qualité</li>
                    <li>Apprendre à gérer le stress efficacement</li>
                    <li>Chercher de l&apos;aide professionnelle si nécessaire</li>
                  </ol>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Carte sur la gestion du stress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-green-600" />
                Gestion du Stress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Le stress est une réaction naturelle du corps face aux défis, mais un stress chronique peut avoir des
                effets néfastes sur la santé.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Identifiez vos sources de stress</li>
                <li>Pratiquez des techniques de relaxation</li>
                <li>Établissez des limites saines</li>
                <li>Adoptez un mode de vie équilibré</li>
              </ul>
            </CardContent>
          </Card>

          {/* Carte sur les bienfaits des exercices de respiration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wind className="mr-2 h-5 w-5 text-green-600" />
                Bienfaits de la Respiration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Les exercices de respiration sont un outil puissant pour améliorer la santé mentale et physique.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Réduit l&apos;anxiété et le stress</li>
                <li>Améliore la concentration</li>
                <li>Régule la pression artérielle</li>
                <li>Favorise un meilleur sommeil</li>
                <li>Renforce le système immunitaire</li>
              </ul>
            </CardContent>
          </Card>

          {/* Carte sur l'importance du sommeil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Moon className="mr-2 h-5 w-5 text-green-600" />
                L&apos;Importance du Sommeil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Un sommeil de qualité est essentiel pour maintenir une bonne santé mentale et physique.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Aide à la récupération mentale et physique</li>
                <li>Améliore la mémoire et l&apos;apprentissage</li>
                <li>Régule les émotions</li>
                <li>Renforce le système immunitaire</li>
              </ul>
            </CardContent>
          </Card>

          {/* Carte sur l'alimentation et la santé mentale */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coffee className="mr-2 h-5 w-5 text-green-600" />
                Alimentation et Santé Mentale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Une alimentation équilibrée joue un rôle crucial dans le maintien d&apos;une bonne santé mentale.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Privilégiez les aliments riches en oméga-3</li>
                <li>Consommez des fruits et légumes variés</li>
                <li>Limitez la consommation de sucres raffinés</li>
                <li>Hydratez-vous régulièrement</li>
              </ul>
            </CardContent>
          </Card>

          {/* Carte sur l'exercice physique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-green-600" />
                Exercice Physique et Bien-être
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                L&apos;activité physique régulière a de nombreux bienfaits sur la santé mentale.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Réduit les symptômes de dépression et d&apos;anxiété</li>
                <li>Améliore l&apos;estime de soi</li>
                <li>Favorise un meilleur sommeil</li>
                <li>Augmente l&apos;énergie et réduit la fatigue</li>
              </ul>
            </CardContent>
          </Card>

          {/* Carte sur la pleine conscience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-green-600" />
                Pleine Conscience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                La pratique de la pleine conscience peut grandement améliorer votre bien-être mental.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Réduit le stress et l&apos;anxiété</li>
                <li>Améliore la concentration</li>
                <li>Favorise l&apos;équilibre émotionnel</li>
                <li>Augmente la conscience de soi</li>
              </ul>
            </CardContent>
          </Card>

          {/* Carte sur les relations sociales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600" />
                Relations Sociales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Entretenir des relations sociales positives est crucial pour notre santé mentale.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Offre un soutien émotionnel</li>
                <li>Réduit le sentiment de solitude</li>
                <li>Améliore l&apos;estime de soi</li>
                <li>Favorise un sentiment d&apos;appartenance</li>
              </ul>
            </CardContent>
          </Card>

          {/* Carte sur l'apprentissage continu */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-green-600" />
                Apprentissage Continu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                L&apos;apprentissage tout au long de la vie contribue à maintenir une bonne santé mentale.
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Stimule le cerveau</li>
                <li>Améliore la confiance en soi</li>
                <li>Offre un sentiment d&apos;accomplissement</li>
                <li>Aide à rester engagé et curieux</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-green-700 mb-4">
            N&apos;oubliez pas, prendre soin de votre santé mentale est un voyage continu. Soyez patient et bienveillant
            envers vous-même.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate("/exercices")}
          >
            <Smile className="mr-2 h-4 w-4" /> Découvrez nos exercices de respiration
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InformationsComponents

