"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DOMPurify from "isomorphic-dompurify"

interface InfoType {
  info_id: number
  info_titre: string
  info_description: string
  info_contenu: string
  type_info_id: number
}

interface InfoDetailProps {
  params: {
    id: string
  }
}

// Exemple de données avec du contenu WYSIWYG plus simple
const mockInfo = {
  info_id: 1,
  info_titre: "La respiration carrée",
  info_description:
    "Découvrez les bienfaits de la respiration carrée pour la gestion du stress et l'anxiété. Cette technique ancestrale, également connue sous le nom de respiration en boîte, est utilisée depuis des siècles pour ses effets apaisants sur le corps et l'esprit.",
  info_contenu: `
    <h2>Qu'est-ce que la respiration carrée ?</h2>
    <p>La respiration carrée, ou respiration en boîte, est une technique de respiration profonde qui peut aider à calmer l'esprit et réduire le stress. Cette technique suit un schéma simple en quatre étapes égales, comme les quatre côtés d'un carré.</p>

    <h3>Les quatre phases de la respiration carrée :</h3>
    <ul>
      <li>Inspirez lentement et profondément pendant 4 secondes</li>
      <li>Retenez votre respiration pendant 4 secondes</li>
      <li>Expirez doucement pendant 4 secondes</li>
      <li>Retenez votre souffle pendant 4 secondes</li>
    </ul>

    <h2>Bienfaits</h2>
    <p>Cette technique de respiration offre de nombreux avantages pour votre bien-être physique et mental :</p>
    <ul>
      <li>Réduit le stress et l'anxiété</li>
      <li>Améliore la concentration</li>
      <li>Aide à gérer les émotions fortes</li>
      <li>Favorise un sommeil réparateur</li>
    </ul>

    <h2>Comment pratiquer ?</h2>
    <p>Trouvez un endroit calme et une position confortable. Vous pouvez pratiquer cette technique assis ou allongé. Commencez par quelques respirations normales pour vous détendre, puis suivez le rythme de la respiration carrée.</p>

    <blockquote>La respiration est le pont entre le corps et l'esprit. Pratiquez régulièrement pour en ressentir tous les bienfaits.</blockquote>

    <h3>Conseils pour une pratique optimale</h3>
    <ul>
      <li>Pratiquez dans un environnement calme</li>
      <li>Maintenez une posture droite mais détendue</li>
      <li>Commencez par des sessions courtes</li>
      <li>Augmentez progressivement la durée</li>
    </ul>
  `,
  type_info_id: 1,
}

const typeInfos = [
  { id: 1, name: "Techniques de respiration" },
  { id: 2, name: "Méditation" },
  { id: 3, name: "Bien-être" },
]

export function InformationsDetailPageComponents({ params }: InfoDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockInfo.info_titre,
          text: mockInfo.info_description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Erreur de partage:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-leather-50">
      {/* Header amélioré */}
      <div className="relative bg-gradient-to-b from-leather-800 to-leather-700">
        <motion.div
          className="absolute inset-0 bg-center opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        />

        {/* Navigation et actions */}
        <motion.div
          className="relative container mx-auto px-4 sm:px-6 py-6 max-w-4xl lg:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-white hover:text-leather-800 transition-all duration-300 hover:bg-leather-100 rounded-full group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Retour aux informations</span>
              <span className="sm:hidden">Retour</span>
            </Button>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-leather-800 hover:bg-leather-100 rounded-full"
                      onClick={handleShare}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Partager</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-leather-800 hover:bg-leather-100 rounded-full"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <motion.div animate={isBookmarked ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                        {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </motion.div>

        {/* Contenu du header */}
        <div className="relative container mx-auto px-4 sm:px-6 pb-12 pt-6 max-w-4xl lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-leather-700/30 text-leather-100 border-leather-600/30 mb-4 px-4 py-1"
                  >
                    {typeInfos.find((t) => t.id === mockInfo.type_info_id)?.name}
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {mockInfo.info_titre}
                </motion.h1>

                <motion.div
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <p className="text-base sm:text-lg text-leather-100 leading-relaxed">{mockInfo.info_description}</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-white overflow-hidden rounded-3xl shadow-xl border-leather-100">
            <div className="p-6 sm:p-8 lg:p-10">
              <div
                className="prose prose-leather max-w-none prose-headings:text-leather-900 prose-p:text-leather-700 
                prose-strong:text-leather-900 prose-ul:text-leather-700 prose-li:marker:text-leather-400
                prose-blockquote:border-leather-200 prose-blockquote:text-leather-600 prose-blockquote:bg-leather-50/50
                prose-blockquote:p-4 prose-blockquote:rounded-lg prose-blockquote:not-italic
                prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-8 prose-h3:mt-6
                prose-ul:mt-4 prose-li:mt-2 prose-p:mt-4 first:prose-p:mt-0
                prose-blockquote:my-8"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(mockInfo.info_contenu),
                }}
              />
            </div>
          </Card>

          {/* Navigation entre articles */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="rounded-2xl p-4 h-auto text-left flex items-center border-leather-200 hover:bg-leather-50 group"
            >
              <ChevronLeft className="h-5 w-5 mr-2 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-sm text-leather-500">Article précédent</div>
                <div className="font-medium text-leather-800">La méditation guidée</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl p-4 h-auto text-right flex items-center justify-end border-leather-200 hover:bg-leather-50 group"
            >
              <div>
                <div className="text-sm text-leather-500">Article suivant</div>
                <div className="font-medium text-leather-800">Le yoga respiratoire</div>
              </div>
              <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

