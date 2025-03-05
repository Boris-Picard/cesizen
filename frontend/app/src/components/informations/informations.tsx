"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Book, Brain, Leaf, Wind, Search, ArrowLeft, Filter, ChevronRight } from "lucide-react"
import informationsImg from "@/assets/informations.avif"
import { Link, useNavigate } from "react-router-dom"
import type { Information } from "../admin-dashboard/informations/column"
import DOMPurify from "isomorphic-dompurify"
import { useCreateInteraction } from "@/hooks/api/useCreateInteractions"
import type { TypeInteraction } from "../admin-dashboard/type-interactions/columns"
import type { UserPayload } from "@/context/AuthContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  { label: "Tous", value: "all", icon: Book },
  { label: "Santé mentale", value: "Santé mentale", icon: Brain },
  { label: "Gestion du stress", value: "Gestion du stress", icon: Leaf },
  { label: "Exercices de relaxation", value: "Exercices de relaxation", icon: Wind },
]

type TypeInfoKey = "Santé mentale" | "Gestion du stress" | "Exercices de relaxation"

const colorMapping: Record<TypeInfoKey, { color: string; textColor: string; gradient: string }> = {
  "Santé mentale": {
    color: "bg-leather-100",
    textColor: "text-leather-900",
    gradient: "from-leather-200 to-leather-100",
  },
  "Gestion du stress": {
    color: "bg-leather-200",
    textColor: "text-leather-900",
    gradient: "from-leather-300 to-leather-200",
  },
  "Exercices de relaxation": {
    color: "bg-leather-300",
    textColor: "text-leather-950",
    gradient: "from-leather-400 to-leather-300",
  },
}

const iconMapping: Record<TypeInfoKey, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "Santé mentale": Brain,
  "Gestion du stress": Leaf,
  "Exercices de relaxation": Wind,
}

interface InformationsComponentsInterface {
  informationsData: Information[]
  interaction: TypeInteraction | undefined
  user: UserPayload | null
}

export const InformationsComponents = ({ informationsData, interaction, user }: InformationsComponentsInterface) => {
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { createInteraction } = useCreateInteraction()
  const navigate = useNavigate()

  const addedData = informationsData.map((article) => {
    const key = article.typeInformation.type_info_nom as TypeInfoKey
    const IconComponent = iconMapping[key]
    const iconClasses = "h-8 w-8 text-leather-600"
    return {
      ...article,
      color: colorMapping[key],
      Icon: IconComponent,
      iconClasses,
    }
  })

  const filterArticles = addedData.filter(
    (article) =>
      (filter === "all" || article.typeInformation.type_info_nom === filter) &&
      (article.info_titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.info_contenu.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleCategoryClick = (value: string) => {
    setFilter(value)
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

        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-7xl lg:px-8">
          <div className="flex items-center justify-start mb-6">
            <Button
              variant="ghost"
              className="text-white hover:text-leather-800 transition-all duration-300 hover:bg-leather-100 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              Santé Mentale & Bien-être
            </h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Explorez nos ressources pour améliorer votre bien-être mental et émotionnel. Trouvez l'équilibre intérieur
              qui vous convient.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-leather-400" />
              <Input
                type="search"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 bg-white border-leather-200 focus:ring-leather-500 focus:border-leather-500 rounded-full"
              />
            </div>

            {/* Desktop Filter Buttons */}
            <div className="hidden sm:flex items-center space-x-2 bg-leather-100 p-1 rounded-full">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={filter === cat.value ? "default" : "ghost"}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${filter === cat.value
                      ? "bg-leather-600 text-white"
                      : "text-leather-700 hover:text-leather-900 hover:bg-leather-200"
                    }`}
                  onClick={() => handleCategoryClick(cat.value)}
                >
                  <cat.icon className="mr-2 h-4 w-4" />
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <div className="sm:hidden w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Filtrer: {categories.find((c) => c.value === filter)?.label || "Tous"}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {categories.map((cat) => (
                    <DropdownMenuItem
                      key={cat.value}
                      className={`flex items-center ${filter === cat.value ? "bg-leather-100" : ""}`}
                      onClick={() => handleCategoryClick(cat.value)}
                    >
                      <cat.icon className="mr-2 h-4 w-4" />
                      {cat.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filterArticles.length > 0 ? (
              filterArticles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to={`/informations/${article.id}`}
                    onClick={() =>
                      createInteraction({
                        inter_date_de_debut: new Date().toISOString(),
                        inter_date_de_fin: new Date().toISOString(),
                        utilisateur: `/api/utilisateurs/${user?.id}`,
                        information: `/api/information/${article.id}`,
                        typeInteraction: `/api/type_interactions/${interaction?.id}`,
                      })
                    }
                  >
                    <Card className="h-full overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-leather-100">
                      <div className={`h-3 w-full bg-gradient-to-r ${article.color.gradient}`}></div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className={`${article.color.color} ${article.color.textColor} border-none`}>
                            {article.typeInformation.type_info_nom}
                          </Badge>
                          <article.Icon className={article.iconClasses} />
                        </div>

                        <h2 className="text-xl font-bold text-leather-900 mb-2 group-hover:text-leather-700 transition-colors">
                          {article.info_titre}
                        </h2>

                        <div className="flex items-center justify-between text-sm text-leather-500 mb-4">
                          <span>
                            Par{" "}
                            {article.createdBy
                              ? `${article.createdBy.ut_prenom} ${article.createdBy.ut_nom}`
                              : "Inconnu"}
                          </span>
                          <span>
                            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div
                          className="prose prose-sm prose-leather mb-6 line-clamp-3 flex-grow"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(article?.info_contenu),
                          }}
                        ></div>

                        <Button
                          variant="outline"
                          className="mt-auto w-full justify-between border-leather-200 text-leather-700 hover:bg-leather-50 hover:text-leather-900 group-hover:border-leather-400 transition-colors"
                        >
                          <span>Lire la suite</span>
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <Search className="h-12 w-12 text-leather-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-leather-800 mb-2">Aucun article trouvé</h3>
                <p className="text-leather-600">Essayez de modifier vos critères de recherche</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 relative isolate overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-leather-700 via-leather-600 to-leather-500"></div>
          <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-10"></div>

          <div className="p-8 sm:p-12 flex flex-col sm:flex-row items-center">
            <div className="flex-1 text-center sm:text-left mb-8 sm:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Prenez soin de vous</h2>
              <p className="text-leather-200 text-lg mb-6 max-w-md">
                N'oubliez pas, prendre soin de votre santé mentale est un voyage continu. Nos exercices peuvent vous
                aider à maintenir votre équilibre.
              </p>
              <Button
                className="bg-white text-leather-800 hover:bg-leather-100 py-3 px-6 text-lg transition-colors duration-300 ease-out rounded-full group"
                onClick={() => navigate("/exercices")}
              >
                Découvrez nos exercices
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={informationsImg || "/placeholder.svg"}
                alt="Illustration bien-être"
                width={400}
                height={400}
                className="rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

