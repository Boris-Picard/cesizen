import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DOMPurify from "isomorphic-dompurify"
import { Information } from "@/components/admin-dashboard/informations/column"
import { toast } from "@/hooks/useToast"

interface InfoDetailProps {
  information: Information | null
}

export function InformationsDetailPageComponents({ information }: InfoDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  console.log(information?.info_contenu);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: information?.info_titre,
          text: information?.info_description,
          url: window.location.href,
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Une erreur est survenue",
          description: "Impossible de partager l'article",
        });
      }
    }
  }

  return (
    <div className=" bg-leather-50">
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
                    {information?.typeInformation.type_info_nom}
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {information?.info_titre}
                </motion.h1>

                <motion.div
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="text-base sm:text-lg text-leather-100 leading-relaxed text-ellipsis" dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(information?.info_description ?? ""),
                  }}></div>
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
                  __html: DOMPurify.sanitize(information?.info_contenu ?? ""),
                }}
              />
            </div>
          </Card>

          {/* Navigation entre articles */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="rounded-2xl p-4 h-auto text-left flex items-center justify-start border-leather-200 hover:bg-leather-50 group"
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

