import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Smile,
  Activity,
  Check,
  ArrowUpRight,
  Users,
  Star,
  Clock,
  Zap,
  Shield,
  Cloud,
  Lock,
  RefreshCw,
  Database,
  ArrowRight,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import cta2 from "@/assets/cta2.webp"
import exerciceVideo from "@/assets/exercice.mp4"
import perf from "@/assets/perf.png"
import secure from "@/assets/secure.webp"
import data from "@/assets/data.png"
import profile from "@/assets/profile.png"


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

const statistics = [
  { label: "Utilisateurs actifs", value: "10K+", icon: Users },
  { label: "Exercices disponibles", value: "50+", icon: Activity },
  { label: "Niveau de satisfaction", value: "4.9/5", icon: Star },
  { label: "Minutes de pratique", value: "1M+", icon: Clock },
]

const features = [
  {
    icon: Cloud,
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
  {
    icon: Lock,
    title: "Sécurité des Données",
    description: "Vos données personnelles sont protégées avec les plus hauts standards de sécurité.",
    features: ["Chiffrement de bout en bout", "Conformité RGPD", "Contrôle total de vos données"],
  },
]

export default function Home() {
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.pageYOffset / totalHeight) * 100
      setProgress(currentProgress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToNextSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-leather-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-leather-600 to-leather-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative isolate px-6 pt-14 lg:px-8 min-h-[100vh] flex items-center">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-leather-500 to-leather-700 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>

          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-full px-3 py-1 text-sm leading-6 text-leather-600 ring-1 ring-leather-900/10 hover:ring-leather-900/20"
              >
                Nouveau : Exercices de respiration guidés{" "}
                <Link to={`${isAuthenticated ? "/exercices" : "/register"}`} className="font-semibold text-leather-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  En savoir plus <span aria-hidden="true">&rarr;</span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                Découvrez la Sérénité avec <span className="text-leather-600">Cesizen</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Votre compagnon personnel pour une meilleure santé mentale et une gestion efficace du stress.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {
                  !isAuthenticated
                  &&
                  <Button
                    className="rounded-md bg-leather-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-leather-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leather-600"
                    onClick={() => navigate("/register")}>
                    Commencer gratuitement
                  </Button>
                }
                <Button
                  variant="ghost"
                  className="text-sm font-semibold bg-white/20 border border-leather-600 leading-6 text-gray-900"
                  onClick={() => scrollToNextSection("features")}
                >
                  En savoir plus <span aria-hidden="true">→</span>
                </Button>
              </div>
            </motion.div>
          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-leather-500 to-leather-700 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-leather-600">Améliorez votre bien-être</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tout ce dont vous avez besoin pour gérer votre stress
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Une suite complète d'outils conçus pour vous accompagner dans votre parcours vers l'équilibre mental et
                émotionnel.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative pl-16"
                  >
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-leather-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                      <ul className="mt-4 space-y-2">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-600">
                            <Check className="w-4 h-4 text-leather-500" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-leather-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              <svg
                viewBox="0 0 1024 1024"
                className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                aria-hidden="true"
              >
                <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                <defs>
                  <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                    <stop stopColor="#A47864" />
                    <stop offset="1" stopColor="#8D5F52" />
                  </radialGradient>
                </defs>
              </svg>

              <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Améliorez votre bien-être.
                  <br />
                  Commencez à utiliser Cesizen dès aujourd'hui.
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Rejoignez des milliers d'utilisateurs qui ont transformé leur relation au stress et amélioré leur
                  santé mentale grâce à nos outils.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  {
                    !isAuthenticated
                    &&
                    <Button
                      onClick={() => navigate("/register")}
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-leather-900 shadow-sm hover:bg-gray-100">
                      Commencer gratuitement
                    </Button>
                  }
                  <Button variant="ghost" className="text-sm bg-white/20 font-semibold leading-6 text-white">
                    En savoir plus <span aria-hidden="true">→</span>
                  </Button>
                </div>
              </div>

              <div className="relative mt-16 h-80 lg:mt-8">
                <img
                  className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                  src={cta2}
                  alt="Capture d'écran de l'application Cesizen"
                  width="1824"
                  height="1080"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-leather-600">Fonctionnalités avancées</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tout ce dont vous avez besoin pour votre bien-être
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              {/* Mobile friendly */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative lg:row-span-2 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-leather-100 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-leather-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Exercices de respiration</h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      Des exercices guidés pour une meilleure gestion du stress, accessibles partout, même en
                      déplacement.
                    </p>
                  </div>

                  <div className="relative flex-grow mt-4">
                    <div className="relative mx-auto w-64 h-96 rounded-3xl border-8 border-gray-800 bg-gray-800 shadow-xl">
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <video autoPlay loop muted className="w-full h-full object-cover">
                          <source src={exerciceVideo} type="video/mp4" />
                          Votre navigateur ne supporte pas la vidéo.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-leather-100 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-leather-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Performance</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Une application rapide et fluide pour une expérience utilisateur optimale, même avec une connexion
                  limitée.
                </p>
                <div className="flex justify-center">
                  <img src={perf} alt="Graphique de performance" className="max-w-full h-auto" />
                </div>
              </motion.div>

              {/* Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-leather-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-leather-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Sécurité</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Vos données sont protégées avec les plus hauts standards de sécurité et de confidentialité.
                </p>
                <div className="flex justify-center">
                  <img src={secure} alt="Bouclier de sécurité" className=" w-auto" />
                </div>
              </motion.div>

              {/* API */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative lg:row-span-2 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-leather-100 flex items-center justify-center">
                    <Database className="h-5 w-5 text-leather-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Données personnalisées</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Visualisez et analysez vos données pour mieux comprendre vos schémas émotionnels et votre progression.
                </p>
                <div className="relative mt-6 flex-grow">
                  <div className="rounded-lg bg-gray-900 p-4 shadow-lg">
                    <div className="flex bg-gray-800/40 border-b border-white/10">
                      <img src={data} alt="data" className="rounded-lg" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section >

        {/* Testimonials Section */}
        <section className="relative isolate overflow-hidden bg-leather-900 py-24 sm:py-32" >
          <img
            src="/meditation-bg.jpg"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-20"
          />

          <div
            className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-leather-600 to-leather-500 opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ce que disent nos utilisateurs
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Découvrez comment Cesizen aide nos utilisateurs à améliorer leur bien-être au quotidien.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                <a href="#exercises">
                  Exercices de respiration <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="#emotions">
                  Tracker d'émotions <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="#features">
                  Nos fonctionnalités <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="#faq">
                  Questions fréquentes <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {statistics.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col-reverse gap-y-1"
                  >
                    <dt className="text-base leading-7 text-gray-300">{stat.label}</dt>
                    <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section >

        {/* Detailed Section */}
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0" >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                  width="200"
                  height="200"
                  x="50%"
                  y="-1"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth="0"
                />
              </svg>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
            </svg>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-leather-600">Respirez mieux</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Une meilleure approche du bien-être
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    Cesizen vous accompagne dans votre parcours vers l'équilibre émotionnel avec des outils
                    scientifiquement prouvés et une approche personnalisée.
                  </p>
                </div>
              </div>
            </div>

            <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <img
                className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={profile}
                alt="Capture d'écran profile"
              />
            </div>

            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p>
                    Cesizen combine les dernières avancées en neurosciences et en psychologie pour vous offrir des
                    outils efficaces de gestion du stress et d'amélioration du bien-être mental.
                  </p>
                  <ul role="list" className="mt-8 space-y-8 text-gray-600">
                    <li className="flex gap-x-3">
                      <Cloud className="mt-1 h-5 w-5 flex-none text-leather-600" />
                      <span>
                        <strong className="font-semibold text-gray-900">Exercices de respiration guidés.</strong> Des
                        techniques de respiration scientifiquement prouvées pour réduire votre niveau de stress et
                        améliorer votre concentration.
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <Smile className="mt-1 h-5 w-5 flex-none text-leather-600" />
                      <span>
                        <strong className="font-semibold text-gray-900">Tracker d'émotions intelligent.</strong> Suivez
                        vos émotions au quotidien et identifiez les tendances pour mieux comprendre votre bien-être
                        émotionnel.
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <RefreshCw className="mt-1 h-5 w-5 flex-none text-leather-600" />
                      <span>
                        <strong className="font-semibold text-gray-900">Suivi de progression.</strong> Visualisez votre
                        progression et recevez des recommandations personnalisées pour améliorer votre bien-être.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-8">
                    Notre approche holistique du bien-être mental vous permet de développer des compétences durables
                    pour gérer le stress et l'anxiété au quotidien, améliorant ainsi votre qualité de vie.
                  </p>
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                    Accessible partout, à tout moment
                  </h2>
                  <p className="mt-6">
                    Que vous soyez chez vous, au bureau ou en déplacement, Cesizen est disponible sur tous vos appareils
                    pour vous accompagner dans votre pratique quotidienne. Quelques minutes par jour suffisent pour
                    constater des améliorations significatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* FAQ Section */}
        <section id="faq" className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32" >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern id="faq-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth="0"
                />
              </svg>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#faq-pattern)" />
            </svg>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-leather-600">Questions fréquentes</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tout ce que vous devez savoir sur Cesizen
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Trouvez les réponses à vos questions les plus fréquentes sur notre plateforme de bien-être mental.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 mb-6"
                >
                  <div className="absolute inset-0 -z-10 bg-leather-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${index}`} className="border-none">
                      <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:text-leather-700 transition-colors py-2 flex items-center">
                        <div className="flex items-center">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-leather-100 group-hover:bg-leather-200 transition-colors">
                            <span className="text-leather-600 font-bold">{index + 1}</span>
                          </div>
                          {item.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pl-14 pr-4 text-lg">{item.answer}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-leather-600 hover:text-leather-800 transition-colors"
              >
                <span className="text-base font-semibold">Vous avez d'autres questions ?</span>
                <Button variant="ghost" className="font-semibold">
                  Contactez-nous <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section >

        {/* CTA Section - Final */}
        <section className="relative isolate overflow-hidden bg-leather-900 py-24 sm:py-32" >
          <img
            src="/meditation-bg.jpg"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-10"
          />

          <div
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-leather-600 to-leather-500 opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
              >
                Prêt à améliorer votre bien-être ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-lg font-medium text-gray-300 sm:text-xl/8"
              >
                Rejoignez Cesizen aujourd'hui et commencez votre voyage vers une meilleure santé mentale. Nos outils
                scientifiquement prouvés vous aideront à gérer votre stress et à améliorer votre équilibre émotionnel.
              </motion.p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10"
              >
                <a href="#features" className="flex items-center group">
                  <span>Découvrir nos fonctionnalités</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#exercises" className="flex items-center group">
                  <span>Explorer les exercices</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#emotions" className="flex items-center group">
                  <span>Tracker d'émotions</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#faq" className="flex items-center group">
                  <span>Questions fréquentes</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

              <div className="mt-16 flex flex-col sm:flex-row gap-6">

                {
                  !isAuthenticated
                  &&
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={() => navigate("/register")}
                      size="lg"
                      className="w-full bg-white hover:bg-leather-50 text-leather-900 group transition-all duration-300 rounded-xl py-6 text-lg"
                    >
                      S'inscrire gratuitement
                      <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </motion.div>
                }

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-white border-white hover:bg-white/20 bg-inherit transition-all duration-300 rounded-xl py-6 text-lg"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section >
      </main >
    </div >
  )
}

