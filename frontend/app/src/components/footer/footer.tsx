import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
    product: [
        { name: "Exercices", href: "/exercices" },
        { name: "Tracker d'émotions", href: "/emotions" },
        { name: "Diagnostics", href: "/diagnostics" },
        { name: "Tarifs", href: "/pricing" },
    ],
    company: [
        { name: "À propos", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Carrières", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    resources: [
        { name: "Centre d'aide", href: "/help" },
        { name: "Documentation", href: "/docs" },
        { name: "Guides", href: "/guides" },
        { name: "API", href: "/api" },
    ],
    legal: [
        { name: "Confidentialité", href: "/privacy" },
        { name: "CGU", href: "/terms" },
        { name: "Mentions légales", href: "/legal" },
        { name: "Cookies", href: "/cookies" },
    ],
}

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
]

const contactInfo = [
    { icon: Mail, text: "contact@cesizen.com" },
    { icon: Phone, text: "+33 1 23 45 67 89" },
    { icon: MapPin, text: "Paris, France" },
]

export function FooterComponents() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="bg-leather-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl lg:px-8 py-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 border-b border-white/10">
                    {/* Newsletter Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl sm:text-3xl font-bold">Rejoignez notre newsletter</h3>
                        <p className="text-leather-200 max-w-md">
                            Recevez nos dernières actualités, conseils et offres exclusives directement dans votre boîte mail.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 placeholder:text-leather-400 focus:outline-none focus:ring-2 focus:ring-leather-500"
                            />
                            <div className="flex items-center">
                                <Button className="bg-white text-leather-900 hover:bg-leather-100 transition-all duration-300">
                                    S'inscrire
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                        {/* Social Links */}
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Suivez-nous</h4>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Contact</h4>
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-center gap-3 text-leather-200">
                                        <info.icon className="w-5 h-5" />
                                        <span>{info.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="space-y-6">
                            <h4 className="text-lg font-semibold capitalize">{category}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <motion.a
                                            href={link.href}
                                            className="text-leather-200 hover:text-white transition-colors duration-300 block"
                                            whileHover={{ x: 3 }}
                                        >
                                            {link.name}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-leather-200 text-sm text-center sm:text-left">
                        © {new Date().getFullYear()} Cesizen. Tous droits réservés.
                    </p>
                    <motion.button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </footer>
    )
}

