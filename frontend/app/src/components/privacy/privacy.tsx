"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import {
    ArrowLeft,
    Shield,
    Lock,
    Eye,
    Database,
    Bell,
    Key,
    UserCheck,
    Mail,
    BookOpen,
    Calendar,
    ExternalLink,
    CheckCircle,
    ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

const sections = [
    {
        title: "1. Collecte des données personnelles",
        icon: Database,
        content: `
      Nous collectons les données personnelles suivantes :
      - Nom et prénom
      - Adresse email
      - Données de connexion et d'utilisation
      - Données relatives à votre utilisation des exercices
      - Informations sur votre état émotionnel (via le tracker d'émotions)

      Ces informations sont collectées lorsque vous :
      - Créez un compte
      - Utilisez nos services
      - Remplissez des formulaires
      - Interagissez avec notre plateforme
    `,
    },
    {
        title: "2. Utilisation des données",
        icon: Eye,
        content: `
      Vos données personnelles sont collectées et traitées pour les finalités suivantes :
      - Fourniture de nos services personnalisés
      - Amélioration de nos services et de votre expérience utilisateur
      - Envoi de communications relatives à nos services
      - Analyse statistique anonymisée
      - Respect de nos obligations légales

      Nous ne traitons vos données que dans la mesure nécessaire aux finalités pour lesquelles elles ont été collectées.
    `,
    },
    {
        title: "3. Protection des données",
        icon: Shield,
        content: `
      Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles, notamment :
      - Chiffrement des données sensibles
      - Protocoles de sécurité avancés
      - Accès restreint aux données personnelles
      - Formation régulière de notre personnel à la sécurité des données
      - Audits de sécurité réguliers

      Nous nous engageons à protéger vos données contre toute forme de traitement non autorisé ou illégal.
    `,
    },
    {
        title: "4. Vos droits",
        icon: Key,
        content: `
      Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
      - Droit d'accès à vos données
      - Droit de rectification de vos données
      - Droit à l'effacement de vos données
      - Droit à la limitation du traitement
      - Droit à la portabilité de vos données
      - Droit d'opposition au traitement
      - Droit de retirer votre consentement

      Pour exercer ces droits, vous pouvez nous contacter à privacy@cesizen.com
    `,
    },
    {
        title: "5. Cookies et traceurs",
        icon: Lock,
        content: `
      Notre site utilise des cookies et autres traceurs pour :
      - Assurer le bon fonctionnement du site
      - Améliorer votre expérience de navigation
      - Analyser l'utilisation du site
      - Personnaliser le contenu et les fonctionnalités

      Vous pouvez configurer vos préférences concernant les cookies via notre bandeau de cookies ou les paramètres de votre navigateur.
    `,
    },
    {
        title: "6. Partage des données",
        icon: UserCheck,
        content: `
      Nous ne partageons vos données personnelles qu'avec :
      - Nos sous-traitants techniques (hébergement, maintenance)
      - Nos partenaires de service (uniquement avec votre consentement)
      - Les autorités compétentes en cas d'obligation légale

      Nous nous assurons que tous nos partenaires respectent les mêmes standards de protection des données que nous.
    `,
    },
    {
        title: "7. Conservation des données",
        icon: Database,
        content: `
      Nous conservons vos données personnelles :
      - Pendant la durée de votre utilisation active de nos services
      - Selon les obligations légales applicables
      - Pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées

      Après cette période, vos données sont soit supprimées, soit anonymisées.
    `,
    },
    {
        title: "8. Notifications et communications",
        icon: Bell,
        content: `
      Vous pouvez recevoir différents types de communications :
      - Emails de service essentiels
      - Newsletters (avec votre consentement)
      - Notifications de l'application
      - Alertes de sécurité

      Vous pouvez gérer vos préférences de communication à tout moment dans les paramètres de votre compte.
    `,
    },
    {
        title: "9. Contact et réclamations",
        icon: Mail,
        content: `
      Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits :
      - Email : privacy@cesizen.com
      - Adresse postale : [Adresse de l'entreprise]
      - DPO : [Nom du DPO]

      Vous avez également le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).
    `,
    },
]

export function PrivacyComponents() {
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

    // Function to parse and format content with proper list items
    const formatContent = (content: string) => {
        return content.split("\n").map((paragraph, i) => {
            if (paragraph.trim().startsWith("-")) {
                const items = paragraph.split("-").filter((item) => item.trim().length > 0)
                return (
                    <ul key={i} className="list-disc pl-5 space-y-1 my-3 text-leather-600">
                        {items.map((item, j) => (
                            <li key={j} className="text-leather-600">
                                {item.trim()}
                            </li>
                        ))}
                    </ul>
                )
            }
            return (
                <p key={i} className="text-leather-600 leading-relaxed my-2">
                    {paragraph.trim()}
                </p>
            )
        })
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
                                <ShieldCheck className="h-10 w-10 text-white" />
                            </motion.div>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
                            Politique de Confidentialité
                        </h1>

                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Badge className="bg-leather-700/30 text-leather-100 border-leather-600/30 rounded-full px-4 py-1.5 text-sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Dernière mise à jour : {formattedDate}
                            </Badge>
                        </div>

                        <p className="text-xl text-leather-200 max-w-2xl mx-auto">
                            Protection de vos données personnelles et respect de votre vie privée
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
                {/* Introduction Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card className="p-6 sm:p-8 bg-white shadow-lg rounded-3xl border border-leather-100 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-leather-100 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-leather-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-leather-900 mb-3">Notre engagement envers votre vie privée</h2>
                                <p className="text-leather-600 leading-relaxed">
                                    Chez Cesizen, nous accordons une importance primordiale à la protection de vos données personnelles.
                                    Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos
                                    informations lorsque vous utilisez nos services. En utilisant Cesizen, vous acceptez les pratiques
                                    décrites dans cette politique.
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Table of Contents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
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
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-leather-100 text-leather-600 mr-3 group-hover:bg-leather-200 transition-colors">
                                        <section.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-leather-700 group-hover:text-leather-900 transition-colors">
                                        {section.title.split(". ")[1]}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Main Content */}
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
                                        <div className="flex items-start gap-5 mb-5">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-leather-100 to-leather-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <section.icon className="w-7 h-7 text-leather-700" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-leather-900 mb-1">{section.title}</h2>
                                                <div className="h-1 w-16 bg-gradient-to-r from-leather-300 to-leather-200 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div className="prose prose-leather max-w-none pl-0 sm:pl-[4.5rem]">
                                            {formatContent(section.content)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {/* RGPD Compliance Badge */}
                    <motion.div variants={itemVariants} viewport={{ once: true }} className="flex justify-center my-12">
                        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md border border-leather-200 flex items-center gap-3">
                            <div className="bg-leather-100 p-2 rounded-full">
                                <CheckCircle className="h-5 w-5 text-leather-600" />
                            </div>
                            <span className="text-leather-700 font-medium">
                                Conforme au RGPD (Règlement Général sur la Protection des Données)
                            </span>
                        </div>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div variants={itemVariants} viewport={{ once: true }} className="mt-12">
                        <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-leather-800 to-leather-700 text-white rounded-3xl border border-leather-600/20 shadow-xl">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

                            <div className="relative text-center space-y-6">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                                        <Mail className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold">Protection de vos données</h2>
                                <p className="text-leather-100 max-w-2xl mx-auto">
                                    Pour toute question concernant vos données personnelles ou pour exercer vos droits RGPD, notre équipe
                                    est à votre disposition.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                                    <Button
                                        className="bg-white text-leather-900 hover:bg-leather-100 rounded-full group transition-all duration-300 shadow-lg hover:shadow-xl"
                                        onClick={() => (window.location.href = "mailto:privacy@cesizen.com")}
                                    >
                                        <Mail className="mr-2 h-4 w-4" />
                                        Contacter le DPO
                                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="border-white text-white hover:bg-white/20 bg-inherit rounded-full transition-all duration-300"
                                        onClick={() => navigate("/contact")}
                                    >
                                        En savoir plus
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

