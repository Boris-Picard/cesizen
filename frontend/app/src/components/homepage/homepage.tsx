import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Leaf, Brain, Smile, Activity, ChevronLeft, ChevronRight } from "lucide-react"
import { Check } from "lucide-react" 
import { Link } from "react-router-dom"

const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    text: "Cesizen a complètement changé ma façon de gérer le stress. Je me sens tellement plus sereine maintenant !",
  },
  {
    id: 2,
    name: "Thomas D.",
    text: "Les exercices de respiration sont incroyables. Je les utilise tous les jours et je vois une réelle différence.",
  },
  {
    id: 3,
    name: "Sophie M.",
    text: "Le tracker d'émotions m'a aidé à mieux comprendre mes schémas émotionnels. C'est un outil puissant.",
  },
]

const faqItems = [
  {
    question: "Qu'est-ce que Cesizen ?",
    answer:
      "Cesizen est une plateforme dédiée à l'amélioration de votre santé mentale et à la gestion du stress. Nous proposons des outils de diagnostic, des exercices de respiration et un tracker d'émotions.",
  },
  {
    question: "Comment fonctionne le tracker d'émotions ?",
    answer:
      "Le tracker d'émotions vous permet d'enregistrer quotidiennement vos émotions. Vous pouvez ensuite visualiser ces données pour identifier des tendances et mieux comprendre votre bien-être émotionnel.",
  },
  {
    question: "Les exercices de respiration sont-ils efficaces ?",
    answer:
      "Oui, nos exercices de respiration sont basés sur des techniques éprouvées comme la cohérence cardiaque. Avec une pratique régulière, vous pouvez réduire significativement votre niveau de stress.",
  },
]

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <div className="flex flex-col">
      <main>
        <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center xl:py-48 bg-gradient-to-r from-green-400 to-blue-500">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Découvrez la Sérénité avec Cesizen
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Votre compagnon personnel pour une meilleure santé mentale et une gestion efficace du stress.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-x-4"
              >
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                  Commencer gratuitement
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  En savoir plus
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Nos Fonctionnalités
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full">
                  <CardHeader>
                    <Brain className="w-12 h-12 text-green-600 mb-2" />
                    <CardTitle>Diagnostics Intelligents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Évaluez votre niveau de stress avec nos outils de diagnostic basés sur l'IA, personnalisés selon
                      votre profil et votre historique.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full">
                  <CardHeader>
                    <Activity className="w-12 h-12 text-green-600 mb-2" />
                    <CardTitle>Exercices de Respiration Guidés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Pratiquez la cohérence cardiaque et d'autres techniques de respiration avec notre guide interactif
                      et nos sessions audio immersives.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full">
                  <CardHeader>
                    <Smile className="w-12 h-12 text-green-600 mb-2" />
                    <CardTitle>Tracker d'Émotions Avancé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Suivez vos émotions au fil du temps avec notre tracker intuitif. Visualisez vos tendances et
                      recevez des insights personnalisés pour améliorer votre bien-être.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center bg-green-50">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Comment ça marche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Inscrivez-vous</h3>
                <p>Créez votre compte en quelques clics et personnalisez votre profil.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Explorez nos outils</h3>
                <p>Découvrez nos diagnostics, exercices de respiration et notre tracker d'émotions.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Améliorez votre bien-être</h3>
                <p>Suivez vos progrès et bénéficiez de conseils personnalisés pour une meilleure santé mentale.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="exercises" className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Exercices de Respiration Interactifs
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Découvrez la puissance de la cohérence cardiaque et d'autres techniques de respiration pour réduire
                  votre stress et améliorer votre bien-être.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Essayer maintenant <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[300px]">
                  <div className="absolute inset-0 bg-green-200 rounded-full"></div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-4 bg-green-300 rounded-full flex items-center justify-center"
                  >
                    <span className="text-2xl font-bold text-green-800">Inspirez</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="emotions" className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center bg-blue-50">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Visualisez Vos Émotions
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Votre semaine en émotions</h3>
                    <div className="space-y-2">
                      {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day, index) => (
                        <div key={day} className="flex items-center">
                          <span className="w-20 text-sm">{day}</span>
                          <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.random() * 100}%`,
                                backgroundColor: ["#FDE68A", "#93C5FD", "#6EE7B7", "#FCA5A5", "#C4B5FD"][
                                  Math.floor(Math.random() * 5)
                                ],
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold">Tracker d'Émotions Avancé</h3>
                <p className="text-gray-500 md:text-xl">
                  Suivez vos émotions au quotidien, identifiez les tendances et obtenez des insights précieux sur votre
                  bien-être émotionnel.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Enregistrement quotidien des émotions
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Visualisations interactives
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Analyses personnalisées
                  </li>
                </ul>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Commencer le suivi <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Ce que disent nos utilisateurs
            </h2>
            <div className="relative">
              <div className="flex overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="w-full flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentTestimonial ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <blockquote className="text-center">
                      <p className="text-lg font-medium mb-4">"{testimonial.text}"</p>
                      <cite className="text-sm text-gray-600">- {testimonial.name}</cite>
                    </blockquote>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronLeft className="h-8 w-8 text-gray-400 hover:text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronRight className="h-8 w-8 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center bg-green-600 text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Prêt à améliorer votre bien-être ?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Rejoignez Cesizen aujourd'hui et commencez votre voyage vers une meilleure santé mentale.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" variant="secondary">
                  S'inscrire gratuitement
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 min-h-screen flex flex-col justify-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Foire Aux Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-2">À propos</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="#" className="hover:underline">
                    Notre histoire
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Équipe
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Carrières
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ressources</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="#" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Légal</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="#" className="hover:underline">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Suivez-nous</h3>
              <div className="flex space-x-4">
                <Link to="#" className="hover:text-green-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link to="#" className="hover:text-green-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link to="#" className="hover:text-green-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 flex items-center justify-between">
            <p className="text-sm">© 2024 Cesizen. Tous droits réservés.</p>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6" />
              <span className="font-bold">Cesizen</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

