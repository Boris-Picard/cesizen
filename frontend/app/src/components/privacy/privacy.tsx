import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Shield, Lock, Eye, Database, Bell, Key, UserCheck, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const sections = [
    {
        title: "1. Collecte des données personnelles",
        icon: Database,
        content: `
      Nous collectons les données personnelles suivantes :
      - Nom et prénom
      - Adresse e-mail
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
    return (
        <div className="min-h-screen bg-leather-50">
            {/* Header */}
            <div className="relative bg-gradient-to-b from-leather-800 to-leather-700 overflow-hidden">
                <div className="relative container mx-auto px-4 sm:px-6 py-12 max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <Button
                            variant="ghost"
                            className="text-white hover:text-leather-800 transition-all duration-300 hover:bg-leather-100 rounded-full"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="hidden sm:inline">Retour</span>
                        </Button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-extrabold text-white mb-4">Politique de Confidentialité</h1>
                        <p className="text-xl text-leather-200 max-w-2xl mx-auto">
                            Protection de vos données personnelles • Dernière mise à jour : {new Date().toLocaleDateString()}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Introduction Card */}
            <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="p-6 sm:p-8 bg-white shadow-md mb-8 rounded-3xl">
                        <p className="text-leather-600 leading-relaxed">
                            Chez Cesizen, nous accordons une importance primordiale à la protection de vos données personnelles. Cette
                            politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations
                            lorsque vous utilisez nos services. En utilisant Cesizen, vous acceptez les pratiques décrites dans cette
                            politique.
                        </p>
                    </Card>
                </motion.div>

                {/* Main Content */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 sm:p-8 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-3xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-leather-100 flex items-center justify-center flex-shrink-0">
                                        <section.icon className="w-6 h-6 text-leather-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl sm:text-2xl font-bold text-leather-900 mb-4">{section.title}</h2>
                                        <div className="prose prose-leather max-w-none">
                                            {section.content.split("\n").map((paragraph, i) => (
                                                <p key={i} className="text-leather-600 leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <Card className="p-8 bg-leather-800 text-white rounded-3xl">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-bold">Protection de vos données</h2>
                                <p className="text-leather-100">
                                    Pour toute question concernant vos données personnelles ou pour exercer vos droits RGPD, notre équipe
                                    est à votre disposition.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        className="bg-white text-leather-900 hover:bg-leather-100"
                                        onClick={() => "mailto:privacy@cesizen.com"}
                                    >
                                        <Mail className="mr-2 h-4 w-4" />
                                        Contacter le DPO
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-white text-white bg-white/10 backdrop-blur hover:bg-inherit"
                                        onClick={() => (navigate("/contact"))}
                                    >
                                        En savoir plus
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
