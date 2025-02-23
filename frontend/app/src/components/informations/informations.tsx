import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Brain, Leaf, Wind, Search, ArrowLeft } from "lucide-react"
import informationsImg from "@/assets/informations.avif"
import { useNavigate } from "react-router-dom"

type Article = {
  id: number
  type: "sante" | "stress" | "respiration"
  title: string
  content: string
  icon: React.ElementType
  color: string
  textColor: string
}

const fakeData: Article[] = [
  {
    id: 1,
    type: "sante",
    title: "Comprendre la Santé Mentale",
    content:
      "La santé mentale englobe notre bien-être émotionnel, psychologique et social. Découvrez comment prendre soin de vous et cultiver un esprit sain.",
    icon: Brain,
    color: "bg-leather-200",
    textColor: "text-leather-900",
  },
  {
    id: 2,
    type: "stress",
    title: "Gestion du Stress",
    content:
      "Le stress est une réaction naturelle face aux défis. Apprenez des techniques efficaces pour gérer votre stress au quotidien.",
    icon: Leaf,
    color: "bg-leather-300",
    textColor: "text-leather-950",
  },
  {
    id: 3,
    type: "respiration",
    title: "Exercices de Respiration",
    content:
      "Les exercices de respiration, comme la cohérence cardiaque, permettent de réduire le stress et d'améliorer la concentration.",
    icon: Wind,
    color: "bg-leather-400",
    textColor: "text-white",
  },
]

const categories = [
  { label: "Tous", value: "all", icon: Book },
  { label: "Santé mentale", value: "sante", icon: Brain },
  { label: "Gestion du stress", value: "stress", icon: Leaf },
  { label: "Exercices de respiration", value: "respiration", icon: Wind },
]

const InformationsPage = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setArticles(fakeData)
  }, [])

  const filteredArticles = articles.filter(
    (article) =>
      (filter === "all" || article.type === filter) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-leather-50">
      <div className="relative bg-gradient-to-b from-leather-800 to-leather-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 animate-pulse-slow" />
        <div className="relative container mx-auto px-4 sm:px-6 py-12 max-w-7xl lg:px-8">
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
            <h1 className="text-5xl font-extrabold text-white mb-4">Santé Mentale & Bien-être</h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Explorez nos ressources pour améliorer votre bien-être mental et émotionnel. Trouvez l'équilibre intérieur
              qui vous convient.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-leather-400" />
            <Input
              type="search"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-white border-leather-200 focus:ring-leather-500 focus:border-leather-500 rounded-full"
            />
          </div>
          <Tabs value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
            <TabsList className="bg-leather-100 p-1 rounded-full">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-leather-600 data-[state=active]:text-white"
                >
                  <cat.icon className="mr-2 h-4 w-4" />
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`flex flex-col h-full cursor-pointer rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group ${article.color}`}
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="h-48 relative overflow-hidden">
                    <article.icon
                      className={`absolute inset-0 m-auto h-24 w-24 ${article.textColor} transition-transform group-hover:scale-110`}
                    />
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <Badge className={`mb-2 bg-white/20 ${article.textColor}`}>{article.type}</Badge>
                      <h2
                        className={`text-2xl font-bold ${article.textColor} mb-2 transition-transform group-hover:translate-y-[-4px]`}
                      >
                        {article.title}
                      </h2>
                      <p className={`${article.textColor} mb-4 line-clamp-3 opacity-90`}>{article.content}</p>
                    </div>
                    <Button
                      variant="outline"
                      className={`w-full py-2 border-current ${article.textColor} hover:bg-white/20 transition-colors`}
                    >
                      Lire la suite
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-24 bg-leather-700 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="p-8 sm:p-12 flex flex-col sm:flex-row items-center">
            <div className="flex-1 text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Prenez soin de vous</h2>
              <p className="text-leather-200 text-lg mb-6">
                N'oubliez pas, prendre soin de votre santé mentale est un voyage continu.
              </p>
              <Button
                className="bg-white text-leather-800 hover:bg-leather-100 py-3 px-6 text-lg transition-colors duration-300 ease-out"
                onClick={() => navigate("/exercices")}
              >
                Découvrez nos exercices de respiration
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={informationsImg}
                alt="Illustration bien-être"
                width={500}
                height={500}
                className="rounded-3xl"
              />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`${selectedArticle.color} rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-6">
                <selectedArticle.icon className={`h-16 w-16 ${selectedArticle.textColor} mr-4`} />
                <div>
                  <h2 className={`text-3xl font-bold ${selectedArticle.textColor} mb-2`}>{selectedArticle.title}</h2>
                  <Badge className={`bg-white/20 ${selectedArticle.textColor}`}>{selectedArticle.type}</Badge>
                </div>
              </div>
              <p className={`${selectedArticle.textColor} mb-6 opacity-90`}>{selectedArticle.content}</p>
              <Button
                className={`w-full bg-white/20 hover:bg-white/30 ${selectedArticle.textColor}`}
                onClick={() => setSelectedArticle(null)}
              >
                Fermer
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InformationsPage

