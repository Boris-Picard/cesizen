"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowLeft, FileText, HelpCircle, Calendar, ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "1. Introduction",
    content: `
      Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités 
      de mise à disposition du site et des services par Cesizen et de définir les conditions d'accès et d'utilisation des 
      services par l'Utilisateur. Les présentes CGU sont accessibles sur le site à la rubrique "CGU".
    `,
  },
  {
    title: "2. Mentions légales",
    content: `
      L'édition et la direction de la publication du site Cesizen est assurée par [Nom], domicilié [Adresse]. 
      Adresse e-mail : contact@cesizen.com. L'hébergeur du site Cesizen est la société Vercel Inc., 
      340 S Lemon Ave #4133 Walnut, CA 91789.
    `,
  },
  {
    title: "3. Accès au site",
    content: `
      Le site Cesizen permet à l'Utilisateur un accès gratuit aux services suivants :
      - Consultation des exercices de respiration
      - Création d'un compte utilisateur
      - Suivi des émotions
      - Accès aux contenus informatifs

      Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. 
      Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, 
      connexion Internet, etc.) sont à sa charge.
    `,
  },
  {
    title: "4. Collecte des données",
    content: `
      Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect 
      de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers 
      et aux libertés. Pour toute information concernant la protection des données personnelles, 
      veuillez consulter notre Politique de Confidentialité.
    `,
  },
  {
    title: "5. Propriété intellectuelle",
    content: `
      Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son...) font l'objet 
      d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur. 
      L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, 
      copie des différents contenus.
    `,
  },
  {
    title: "6. Responsabilité",
    content: `
      Les sources des informations diffusées sur le site Cesizen sont réputées fiables mais le site 
      ne garantit pas qu'il soit exempt de défauts, d'erreurs ou d'omissions. Les informations communiquées 
      sont présentées à titre indicatif et général sans valeur contractuelle.
    `,
  },
  {
    title: "7. Liens hypertextes",
    content: `
      Des liens hypertextes peuvent être présents sur le site. L'Utilisateur est informé qu'en cliquant sur ces 
      liens, il sortira du site Cesizen. Ce dernier n'a pas de contrôle sur les pages web sur lesquelles 
      aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
    `,
  },
  {
    title: "8. Cookies",
    content: `
      L'Utilisateur est informé que lors de ses visites sur le site, un cookie peut s'installer automatiquement 
      sur son logiciel de navigation. Les cookies sont de petits fichiers stockés temporairement sur le disque 
      dur de l'ordinateur de l'Utilisateur par votre navigateur et qui sont nécessaires à l'utilisation du 
      site Cesizen.
    `,
  },
  {
    title: "9. Droit applicable et juridiction compétente",
    content: `
      La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un 
      litige né entre les parties, les tribunaux français seront seuls compétents. Pour toute question relative 
      à l'application des présentes CGU, vous pouvez joindre l'éditeur aux coordonnées inscrites à l'ARTICLE 1.
    `,
  },
]

export function ConditionsComponents() {
  const navigate = useNavigate()
  const formattedDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-leather-50 to-leather-100/50">
      {/* Header */}
      <div className="relative isolate overflow-hidden bg-leather-900">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[url('/grid.svg')] bg-center opacity-20"></div>
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

        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-7xl lg:px-8">
          <div className="flex items-center justify-start mb-6">
            <Button
              variant="ghost"
              className="text-white hover:text-leather-800 transition-all duration-300 hover:bg-leather-100 rounded-full group"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Retour</span>
              <span className="sm:hidden">Retour</span>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-full"
              >
                <FileText className="h-10 w-10 text-white" />
              </motion.div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              Conditions Générales d'Utilisation
            </h1>

            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge className="bg-leather-700/30 text-leather-100 border-leather-600/30 rounded-full px-4 py-1.5 text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                Dernière mise à jour : {formattedDate}
              </Badge>
            </div>

            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Veuillez lire attentivement ces conditions avant d'utiliser notre plateforme.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 sm:p-8 bg-white shadow-lg rounded-3xl border border-leather-100 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5 text-leather-600" />
              <h2 className="text-xl font-bold text-leather-900">Sommaire</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sections.map((section, index) => (
                <motion.a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="flex items-center p-3 rounded-xl hover:bg-leather-50 transition-all duration-200 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-leather-100 text-leather-700 font-medium mr-3 group-hover:bg-leather-200 transition-colors">
                    {index + 1}
                  </span>
                  <span className="text-leather-700 group-hover:text-leather-900 transition-colors">
                    {section.title.split(". ")[1]}
                  </span>
                </motion.a>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Content Sections */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              id={`section-${index + 1}`}
              variants={itemVariants}
              viewport={{ once: true }}
              className="scroll-mt-24"
            >
              <Card className="p-6 sm:p-8 bg-white shadow-md hover:shadow-xl transition-all duration-500 rounded-3xl border border-leather-100 overflow-hidden">
                <div className="relative">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-leather-50 rounded-full -translate-x-10 -translate-y-10 opacity-50"></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-leather-100 text-leather-700 font-bold">
                        {index + 1}
                      </div>
                      <h2 className="text-2xl font-bold text-leather-900">{section.title.split(". ")[1]}</h2>
                    </div>

                    <div className="prose prose-leather max-w-none">
                      {section.content.split("\n").map((paragraph, i) => {
                        // Check if paragraph contains list items
                        if (paragraph.trim().startsWith("-")) {
                          const items = paragraph.split("-").filter((item) => item.trim().length > 0)
                          return (
                            <ul key={i} className="list-disc pl-5 space-y-1 text-leather-600">
                              {items.map((item, j) => (
                                <li key={j} className="text-leather-600">
                                  {item.trim()}
                                </li>
                              ))}
                            </ul>
                          )
                        }
                        return (
                          <p key={i} className="text-leather-600 leading-relaxed">
                            {paragraph.trim()}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div variants={itemVariants} viewport={{ once: true }} className="mt-12">
            <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-leather-800 to-leather-700 text-white rounded-3xl border border-leather-600/20 shadow-xl">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

              <div className="relative text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                    <HelpCircle className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold">Des questions sur nos conditions ?</h2>
                <p className="text-leather-100 max-w-2xl mx-auto">
                  Notre équipe est là pour vous aider à comprendre nos conditions d'utilisation et répondre à toutes vos
                  questions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <Button
                    className="bg-white text-leather-900 hover:bg-leather-100 rounded-full group transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Contactez-nous
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    variant="outline"
                    className="border-white text-white bg-inherit hover:bg-white/20 rounded-full transition-all duration-300"
                    onClick={() => (window.location.href = "/confidentialite")}
                  >
                    Politique de confidentialité
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Back to top button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center mt-10"
          >
            <Button
              variant="outline"
              className="rounded-full border-leather-300 text-leather-700  transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Retour en haut
              <ArrowLeft className="ml-2 h-4 w-4 rotate-90" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

