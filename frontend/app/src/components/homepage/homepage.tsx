import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" // Added ButtonSize import
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Brain,
  Smile,
  Activity,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowUpRight,
  ChevronDown,
  Users,
  Star,
  Clock,
  Heart,
  Zap,
  Shield,
  Trophy,
} from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    role: "Professionnelle en entreprise",
    text: "Cesizen a complètement changé ma façon de gérer le stress. Je me sens tellement plus sereine maintenant !",
  },
  {
    id: 2,
    name: "Thomas D.",
    role: "Entrepreneur",
    text: "Les exercices de respiration sont incroyables. Je les utilise tous les jours et je vois une réelle différence.",
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Enseignante",
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

// Added statistics data
const statistics = [
  { label: "Utilisateurs actifs", value: "10K+", icon: Users },
  { label: "Exercices disponibles", value: "50+", icon: Activity },
  { label: "Niveau de satisfaction", value: "4.9/5", icon: Star },
  { label: "Minutes de pratique", value: "1M+", icon: Clock },
]

// Added why choose us data
const whyChooseUs = [
  {
    icon: Shield,
    title: "Approche scientifique",
    description: "Méthodes basées sur des recherches scientifiques et validées par des experts",
  },
  {
    icon: Zap,
    title: "Résultats rapides",
    description: "Constatez les premiers effets positifs dès la première semaine d'utilisation",
  },
  {
    icon: Heart,
    title: "Suivi personnalisé",
    description: "Recommandations adaptées à votre profil et à vos objectifs",
  },
  {
    icon: Trophy,
    title: "Progression continue",
    description: "Système de récompenses et objectifs pour maintenir votre motivation",
  },
]

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Fonction pour le scroll smooth vers la section suivante
  const scrollToNextSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col">
      {/* Progress bar - Ajusté pour mobile */}

      <main className="overflow-hidden">
        {/* Hero Section - Optimisé pour mobile */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-leather-900 via-leather-800 to-leather-700"
          >
            <motion.div
              className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 mix-blend-overlay"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-leather-900/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
          </motion.div>

          <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl lg:px-8 py-4">
            <div className="flex flex-col items-center space-y-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-4"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-3 py-1 text-xs sm:px-4 sm:text-sm mb-4 sm:mb-6">
                    Nouveau : Exercices de respiration guidés 🎉
                  </Badge>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-tight">
                  Découvrez la Sérénité avec{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-leather-200 to-leather-100 block sm:inline">
                    Cesizen
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-leather-50 text-base sm:text-lg md:text-xl px-4 sm:px-0">
                  Votre compagnon personnel pour une meilleure santé mentale et une gestion efficace du stress.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
              >
                <Button
                  size={"lg"}
                  className="bg-white hover:bg-leather-50 text-leather-900 group transition-all duration-300 shadow-lg shadow-leather-900/20 w-full sm:w-auto"
                >
                  Commencer gratuitement
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  size={"lg"}
                  variant="outline"
                  className="text-white border-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
                >
                  En savoir plus
                </Button>
              </motion.div>

              {/* Statistics - Responsive grid */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 w-full max-w-4xl mt-8 sm:mt-12"
              >
                {statistics.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-3 sm:p-4 text-center group hover:bg-white/20 transition-all duration-300"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="mb-2 inline-block text-white"
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
                    </motion.div>
                    <div className="text-lg sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-leather-200">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Enhanced scroll indicator - Hidden on touch devices */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white cursor-pointer hidden md:block"
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            onClick={() => scrollToNextSection("why")}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-leather-200">Découvrir</span>
              <ChevronDown className="w-8 h-8" />
            </div>
          </motion.div>
        </section>
        {/* Why Choose Us Section - Responsive grid */}
        <section id="why" className="w-full py-16 sm:py-24 bg-gradient-to-b from-leather-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl lg:px-8 py-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-leather-900 mb-4">
                Pourquoi Choisir Cesizen ?
              </h2>
              <p className="text-leather-600 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Une approche unique et scientifique pour votre bien-être mental.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-leather-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-leather-600 to-leather-500 flex items-center justify-center mb-4 shadow-lg shadow-leather-500/20">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-leather-900 mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-leather-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Features Section - Responsive adjustments */}
        <section id="features" className="w-full py-16 sm:py-24 bg-leather-50/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl lg:px-8 py-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <Badge className="bg-leather-200 text-leather-700 mb-4 px-3 py-1 hover:bg-leather-200 text-xs sm:px-4 sm:text-sm">
                Fonctionnalités
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-leather-900 mb-4">
                Des Outils Puissants pour Votre Bien-être
              </h2>
              <p className="text-leather-600 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Une suite complète d'outils conçus pour vous accompagner dans votre parcours vers l'équilibre.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Brain,
                  title: "Diagnostics Intelligents",
                  description: "Évaluez votre niveau de stress avec nos outils de diagnostic basés sur l'IA.",
                  features: ["Analyse personnalisée", "Recommandations sur mesure", "Suivi de progression"],
                },
                {
                  icon: Activity,
                  title: "Exercices de Respiration",
                  description: "Des exercices guidés pour une meilleure gestion du stress.",
                  features: ["Cohérence cardiaque", "Respiration profonde", "Méditation guidée"],
                },
                {
                  icon: Smile,
                  title: "Tracker d'Émotions",
                  description: "Suivez et analysez vos émotions au quotidien.",
                  features: ["Visualisation intuitive", "Analyses détaillées", "Insights personnalisés"],
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="flex flex-col p-3 h-full rounded-3xl bg-white border border-leather-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group">
                    {/* En-tête */}
                    <div className="p-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-leather-600 to-leather-500 flex items-center justify-center mb-4 shadow-lg shadow-leather-500/20 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-leather-900 text-lg font-semibold">{feature.title}</h3>
                      </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-leather-600 mb-4">{feature.description}</p>
                      <ul className="flex-1 space-y-2">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-leather-700">
                            <Check className="w-4 h-4 text-leather-500" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {/* Bouton en bas */}
                      <div className="mt-auto pt-4">
                        <Button
                          size="sm"
                          className="w-full bg-leather-600 text-leather-50 hover:bg-leather-800"
                        >
                          En savoir plus
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>

                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* How it Works - Compact section */}
        <section className="w-full py-24 bg-leather-50/50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl sm:px-6 lg:px-8 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-leather-900 mb-4">
                Comment ça marche
              </h2>
              <p className="text-leather-600 text-lg max-w-2xl mx-auto">
                Trois étapes simples pour commencer votre voyage vers le bien-être.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: 1,
                  title: "Inscrivez-vous",
                  description: "Créez votre compte en quelques clics et personnalisez votre profil.",
                },
                {
                  step: 2,
                  title: "Explorez nos outils",
                  description: "Découvrez nos diagnostics, exercices de respiration et notre tracker d'émotions.",
                },
                {
                  step: 3,
                  title: "Améliorez votre bien-être",
                  description:
                    "Suivez vos progrès et bénéficiez de conseils personnalisés pour une meilleure santé mentale.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group"
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-leather-600 to-leather-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-leather-500/20 transition-transform duration-300 group-hover:scale-110"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-leather-900 mb-3">{item.title}</h3>
                  <p className="text-leather-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Breathing Exercise Section - Full height with interactive elements */}
        <section
          id="exercises"
          className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-white to-leather-100/50"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          <div className="container mx-auto px-4 md:px-6 max-w-7xl sm:px-6 lg:px-8 relative py-24">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-leather-900 mb-6">
                    Exercices de Respiration Interactifs
                  </h2>
                  <p className="text-leather-600 text-lg">
                    Découvrez la puissance de la cohérence cardiaque et d'autres techniques de respiration pour réduire
                    votre stress et améliorer votre bien-être.
                  </p>
                </div>

                {/* Added exercise types */}
                <div className="space-y-4">
                  {[
                    { name: "Cohérence cardiaque", duration: "5 min", level: "Débutant" },
                    { name: "Respiration carrée", duration: "10 min", level: "Intermédiaire" },
                    { name: "Respiration profonde", duration: "15 min", level: "Avancé" },
                  ].map((exercise, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-leather-100 flex items-center justify-center group-hover:bg-leather-200 transition-colors">
                        <Activity className="w-6 h-6 text-leather-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-leather-900">{exercise.name}</h3>
                        <p className="text-sm text-leather-500">
                          {exercise.duration} • {exercise.level}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-leather-400 group-hover:text-leather-600 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  ))}
                </div>

                <Button
                  size={"lg"}
                  className="bg-leather-600 hover:bg-leather-700 text-white group transition-all duration-300 w-full sm:w-auto"
                >
                  Découvrir tous les exercices
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              {/* Enhanced breathing animation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div className="relative w-[300px] h-[300px]">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-leather-200 to-leather-300 rounded-full opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-4 bg-gradient-to-br from-leather-500 to-leather-400 rounded-full shadow-xl backdrop-blur-sm"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-center"
                        animate={{
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="text-2xl font-bold text-white mb-2 block">Inspirez</span>
                        <span className="text-white/80 text-sm">4 secondes</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Emotions Section - Full height with enhanced visualization */}
        <section
          id="emotions"
          className="min-h-screen flex items-center bg-leather-900 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          <div className="container mx-auto px-4 md:px-6 max-w-7xl sm:px-6 lg:px-8relative py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                Visualisez Vos Émotions
              </h2>
              <p className="text-leather-100 text-lg max-w-2xl mx-auto">
                Suivez votre bien-être émotionnel et découvrez des tendances qui vous aideront à mieux vous comprendre.
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 space-y-8"
              >
                {/* Weekly emotions chart */}
                <Card className="bg-white/10 rounded-3xl backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Votre semaine en émotions</h3>
                    <div className="space-y-4">
                      {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day, index) => (
                        <motion.div
                          key={day}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-4"
                        >
                          <span className="w-20 text-sm text-leather-200">{day}</span>
                          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-leather-300 to-leather-200"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.random() * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Emotion categories */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Calme", value: 75, color: "from-green-400 to-green-300" },
                    { name: "Stress", value: 25, color: "from-red-400 to-red-300" },
                    { name: "Joie", value: 60, color: "from-yellow-400 to-yellow-300" },
                    { name: "Fatigue", value: 40, color: "from-blue-400 to-blue-300" },
                  ].map((emotion, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 rounded-3xl">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-leather-100">{emotion.name}</span>
                          <span className="text-leather-200">{emotion.value}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${emotion.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${emotion.value}%` }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">Tracker d'Émotions Avancé</h3>
                    <p className="text-leather-100 text-lg">
                      Suivez vos émotions au quotidien, identifiez les tendances et obtenez des insights précieux sur
                      votre bien-être émotionnel.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {[
                      {
                        title: "Suivi personnalisé",
                        description: "Enregistrez vos émotions et suivez leur évolution dans le temps",
                      },
                      {
                        title: "Analyses détaillées",
                        description: "Obtenez des insights sur vos schémas émotionnels",
                      },
                      {
                        title: "Recommandations adaptées",
                        description: "Recevez des conseils personnalisés basés sur vos données",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
                      >
                        <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                        <p className="text-leather-200">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  <Button size="lg" className="bg-white hover:bg-leather-50 text-leather-900 group w-full">
                    Commencer le suivi
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Testimonials Section - Compact but elegant */}
        <section className="w-full py-24 bg-gradient-to-br from-leather-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          <div className="container mx-auto px-4 md:px-6 max-w-7xl sm:px-6 lg:px-8 py-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-leather-900 mb-4">
                Ce que disent nos utilisateurs
              </h2>
              <p className="text-leather-600 text-lg max-w-2xl mx-auto">
                Découvrez comment Cesizen aide nos utilisateurs à améliorer leur bien-être au quotidien.
              </p>
            </motion.div>
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div className="relative min-h-[200px]">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      className="absolute w-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: index === currentTestimonial ? 1 : 0,
                        x: index === currentTestimonial ? 0 : index < currentTestimonial ? -100 : 100,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="bg-white border-leather-200 shadow-lg rounded-3xl">
                        <CardContent className="p-8 text-center">
                          <p className="text-xl text-leather-700 mb-4 italic">"{testimonial.text}"</p>
                          <div>
                            <p className="text-leather-900 font-medium">{testimonial.name}</p>
                            <p className="text-leather-500 text-sm">{testimonial.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="rounded-full border-leather-200 hover:bg-leather-100 transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5 text-leather-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="rounded-full border-leather-200 hover:bg-leather-100 transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5 text-leather-600" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section - Compact and focused */}
        <section className="w-full py-24 bg-leather-50/50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl sm:px-6 lg:px-8 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-leather-900 mb-4">
                Foire Aux Questions
              </h2>
              <p className="text-leather-600 text-lg max-w-2xl mx-auto">
                Trouvez les réponses à vos questions les plus fréquentes sur Cesizen.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqItems.map((item, index) => (
                  <Card className="border-leather-200 rounded-3xl">
                    <CardContent className="p-6">
                      <AccordionItem key={index} value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="text-leather-900 hover:text-leather-700 transition-colors text-bold text-md">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-leather-600">{item.answer}</AccordionContent>
                      </AccordionItem>
                    </CardContent>
                  </Card>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
        {/* CTA Section - Impactful closure */}
        <section className="w-full py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-leather-700 via-leather-600 to-leather-500">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 mix-blend-overlay" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-leather-900/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="relative container mx-auto px-4 md:px-6 max-w-7xl sm:px-6 lg:px-8 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Prêt à améliorer votre bien-être ?
                </h2>
                <p className="mx-auto max-w-[700px] text-leather-100 text-lg">
                  Rejoignez Cesizen aujourd'hui et commencez votre voyage vers une meilleure santé mentale.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size={"lg"}
                  className="bg-white hover:bg-leather-50 text-leather-900 group transition-all duration-300"
                >
                  S'inscrire gratuitement
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  size={"lg"}
                  variant="outline"
                  className="text-white border-white bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300"
                >
                  En savoir plus
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

