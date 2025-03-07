"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DOMPurify from "isomorphic-dompurify"
import type { Information } from "@/components/admin-dashboard/informations/column"
import { toast } from "@/hooks/useToast"
import { useNavigate } from "react-router-dom"
import { useCreateInteraction } from "@/hooks/api/useCreateInteractions"
import type { TypeInteraction } from "@/components/admin-dashboard/type-interactions/columns"
import type { UserPayload } from "@/context/AuthContext"

interface InfoDetailProps {
  information: Information | null
  articles: Information[]
  interaction: TypeInteraction | undefined
  user: UserPayload | null
  isAuthenticated: boolean | undefined
}

export function InformationsDetailPageComponents({ information, articles, interaction, user, isAuthenticated }: InfoDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { createInteraction } = useCreateInteraction()
  const navigate = useNavigate()

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
        })
      }
    }
  }

  const currentIndex = articles.findIndex((article) => article.id === information?.id)
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  const goToArticle = (articleId: number) => {
    navigate(`/informations/${articleId}`)
  }

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-leather-50">
      {/* Hero Section */}
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

        {/* Navigation et actions */}
        <div className="relative container mx-auto px-4 sm:px-6 py-6 max-w-7xl lg:px-8">
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
            <div className="flex gap-2">
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

                {
                  isAuthenticated
                  &&
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
                }
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Contenu du header */}
        <div className="relative container mx-auto px-4 sm:px-6 pb-16 pt-6 max-w-4xl lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-center">
              <Badge
                variant="secondary"
                className="bg-leather-700/30 text-leather-100 border-leather-600/30 mb-4 px-4 py-1.5 rounded-full"
              >
                {information?.typeInformation.type_info_nom}
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {information?.info_titre}
              </h1>

              <div className="flex flex-wrap justify-center gap-4 mb-8 text-leather-200 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>
                    {information?.createdBy
                      ? `${information.createdBy.ut_prenom} ${information.createdBy.ut_nom}`
                      : "Inconnu"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(information?.createdAt)}</span>
                </div>
              </div>

              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div
                  className="text-base sm:text-lg text-leather-100 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(information?.info_description ?? ""),
                  }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl lg:px-8 -mt-8">
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
            {previousArticle ? (
              <Button
                variant="outline"
                className="rounded-2xl p-4 h-auto text-left flex items-center justify-start border-leather-200 hover:bg-leather-50 group"
                onClick={() => {
                  goToArticle(previousArticle.id)
                  createInteraction({
                    inter_date_de_debut: new Date().toISOString(),
                    inter_date_de_fin: new Date().toISOString(),
                    utilisateur: `/api/utilisateurs/${user?.id}`,
                    information: `/api/information/${previousArticle.id}`,
                    typeInteraction: `/api/type_interactions/${interaction?.id}`,
                  })
                }}
              >
                <ChevronLeft className="h-5 w-5 mr-2 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="line-clamp-3">
                  <div className="text-sm text-leather-500">Article précédent</div>
                  <div className="font-medium text-leather-800 line-clamp-1">{previousArticle.info_titre}</div>
                </div>
              </Button>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Button
                variant="outline"
                className="rounded-2xl p-4 h-auto text-right flex items-center justify-end border-leather-200 hover:bg-leather-50 group"
                onClick={() => {
                  goToArticle(nextArticle.id)
                  createInteraction({
                    inter_date_de_debut: new Date().toISOString(),
                    inter_date_de_fin: new Date().toISOString(),
                    utilisateur: `/api/utilisateurs/${user?.id}`,
                    information: `/api/information/${nextArticle.id}`,
                    typeInteraction: `/api/type_interactions/${interaction?.id}`,
                  })
                }}
              >
                <div className="line-clamp-3">
                  <div className="text-sm text-leather-500">Article suivant</div>
                  <div className="font-medium text-leather-800">{nextArticle.info_titre}</div>
                </div>
                <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <div />
            )}
          </div>

          {/* Articles connexes */}
          {articles.length > 1 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-leather-800 mb-6">Articles connexes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles
                  .filter((article) => article.id !== information?.id)
                  .slice(0, 3)
                  .map((article) => (
                    <Card
                      key={article.id}
                      className="rounded-xl overflow-hidden border-leather-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      onClick={() => {
                        goToArticle(article.id)
                        createInteraction({
                          inter_date_de_debut: new Date().toISOString(),
                          inter_date_de_fin: new Date().toISOString(),
                          utilisateur: `/api/utilisateurs/${user?.id}`,
                          information: `/api/information/${article.id}`,
                          typeInteraction: `/api/type_interactions/${interaction?.id}`,
                        })
                      }}
                    >
                      <div className="p-5">
                        <Badge className="mb-3 bg-leather-100 text-leather-800 border-none">
                          {article.typeInformation.type_info_nom}
                        </Badge>
                        <h3 className="text-lg font-semibold text-leather-900 mb-2 line-clamp-2">
                          {article.info_titre}
                        </h3>
                        <div className="flex items-center text-sm text-leather-500 mb-3">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{formatDate(article.createdAt).split("à")[0]}</span>
                        </div>
                        <div
                          className="text-leather-600 text-sm line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(article.info_description ?? ""),
                          }}
                        ></div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

