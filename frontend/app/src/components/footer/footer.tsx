"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Calendar,
  ThumbsUp,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    { name: "API", href: `${import.meta.env.VITE_API_URL}api/docs` },
  ],
  legal: [
    { name: "Confidentialité", href: "/privacy" },
    { name: "CGU", href: "/conditions" },
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

const newsletterBenefits = [
  {
    icon: Calendar,
    title: "Articles hebdomadaires",
    description: "Recevez chaque semaine des conseils exclusifs sur la gestion du stress et le bien-être mental.",
  },
  {
    icon: ThumbsUp,
    title: "Zéro spam",
    description: "Nous respectons votre boîte de réception. Uniquement du contenu de qualité, jamais de spam.",
  },
]

export function FooterComponents() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simuler une requête API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      setEmail("")

      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }, 1000)
  }

  return (
    <footer className="relative isolate overflow-hidden bg-leather-900 text-white">
      {/* Effet de dégradé en arrière-plan */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-leather-600 to-leather-800 opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Grille en arrière-plan */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      {/* Section Newsletter */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl lg:max-w-lg"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Rejoignez notre newsletter</h2>
            <p className="mt-4 text-lg text-leather-200">
              Recevez nos dernières actualités, conseils et offres exclusives directement dans votre boîte mail.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Votre email"
                className="min-w-0 flex-auto rounded-xl bg-white/10 px-4 py-3 text-white border-white/20 placeholder:text-leather-400 focus:ring-2 focus:ring-leather-500 focus:border-transparent"
              />
              <Button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className={`flex-none rounded-xl px-4 py-3 font-semibold shadow-sm transition-all duration-300 ${
                  isSubscribed ? "bg-green-600 hover:bg-green-700" : "bg-leather-600 hover:bg-leather-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Envoi...
                  </span>
                ) : isSubscribed ? (
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Inscrit !
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    S'inscrire
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2"
          >
            {newsletterBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="rounded-md bg-white/10 p-2 ring-1 ring-white/20">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 text-base font-semibold text-white">{benefit.title}</dt>
                <dd className="mt-2 text-base leading-7 text-leather-300">{benefit.description}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-white/10"></div>
      </div>

      {/* Liens et informations */}
      <div className="relative max-w-7xl container mx-auto px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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

        {/* Contact et réseaux sociaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-white/10">
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-leather-200">
                <Mail className="w-5 h-5" />
                <a href="mailto:contact@cesizen.com" className="hover:text-white transition-colors">
                  contact@cesizen.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-leather-200">
                <Phone className="w-5 h-5" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-center gap-3 text-leather-200">
                <MapPin className="w-5 h-5" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
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
        </div>

        {/* Copyright et bouton de retour en haut */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10">
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

