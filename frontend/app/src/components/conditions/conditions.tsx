import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

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
    return (
        <div className="min-h-screen bg-leather-50">
            {/* Header */}
            <div className="relative bg-gradient-to-b from-leather-800 to-leather-700 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
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
                        <h1 className="text-5xl font-extrabold text-white mb-4">
                            Conditions Générales d'Utilisation
                        </h1>
                        <p className="text-xl text-leather-200 max-w-2xl mx-auto">
                            Dernière mise à jour : {new Date().toLocaleDateString()}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
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
                                <h2 className="text-xl sm:text-2xl font-bold text-leather-900 mb-4">{section.title}</h2>
                                <div className="prose prose-leather max-w-none">
                                    {section.content.split("\n").map((paragraph, i) => (
                                        <p key={i} className="text-leather-600 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
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
                                <h2 className="text-2xl font-bold">Des questions ?</h2>
                                <p className="text-leather-100">
                                    Notre équipe est là pour vous aider à comprendre nos conditions d'utilisation.
                                </p>
                                <Button
                                    className="bg-white text-leather-900 hover:bg-leather-100"
                                    onClick={() => (window.location.href = "/contact")}
                                >
                                    Contactez-nous
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

