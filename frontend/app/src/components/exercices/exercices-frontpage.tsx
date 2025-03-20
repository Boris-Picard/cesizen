import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Wind, Search, Play, Heart, Brain, Moon, ArrowLeft, Clock, Filter, ChevronRight, Activity } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import type { ExerciceType } from "../admin-dashboard/exercices/column"
import { useCreateInteraction } from "@/hooks/api/useCreateInteractions"
import type { TypeInteraction } from "../admin-dashboard/type-interactions/columns"
import type { UserPayload } from "@/context/AuthContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Difficulty = "débutant" | "intermédiaire" | "avancé"

const difficultyColors: Record<Difficulty, { bg: string; text: string; border: string; gradient: string }> = {
  débutant: {
    bg: "bg-leather-100 hover:bg-inherit",
    text: "text-leather-800",
    border: "border-leather-200",
    gradient: "from-leather-200 to-leather-100",
  },
  intermédiaire: {
    bg: "bg-leather-200 hover:bg-inherit",
    text: "text-leather-900",
    border: "border-leather-300",
    gradient: "from-leather-300 to-leather-200",
  },
  avancé: {
    bg: "bg-leather-300 hover:bg-inherit",
    text: "text-leather-950",
    border: "border-leather-400",
    gradient: "from-leather-400 to-leather-300",
  },
}

const difficultyIcons: Record<Difficulty, React.ReactNode> = {
  débutant: <Activity className="h-4 w-4 mr-2" />,
  intermédiaire: <Activity className="h-4 w-4 mr-2" />,
  avancé: <Activity className="h-4 w-4 mr-2" />,
}

const practicalTips = [
  {
    icon: Wind,
    title: "Position",
    description: "Asseyez-vous confortablement, le dos droit mais détendu",
  },
  {
    icon: Heart,
    title: "Régularité",
    description: "Pratiquez quotidiennement, idéalement au même moment",
  },
  {
    icon: Brain,
    title: "Concentration",
    description: "Focalisez-vous uniquement sur votre respiration",
  },
  {
    icon: Moon,
    title: "Moment idéal",
    description: "Privilégiez le matin au réveil ou le soir avant le coucher",
  },
]

interface ExerciceProps {
  exercices: ExerciceType[]
  interaction: TypeInteraction | undefined
  user: UserPayload | null
}

export default function ExercisesPage({ exercices, interaction, user }: ExerciceProps) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { createInteraction } = useCreateInteraction()

  const filteredExercises = exercices?.filter(
    (exercice) =>
      (activeTab === "all" || exercice.ex_difficulty.toLowerCase() === activeTab) &&
      (exercice.ex_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercice.ex_description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleFilterChange = (value: string) => {
    setActiveTab(value)
  }

  const filterOptions = [
    { label: "Tous", value: "all" },
    { label: "Débutant", value: "débutant" },
    { label: "Intermédiaire", value: "intermédiaire" },
    { label: "Avancé", value: "avancé" },
  ]

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
              Exercices de respiration
            </h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Découvrez votre équilibre intérieur et explorez nos exercices de respiration pour trouver celui qui vous
              convient le mieux.
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
                placeholder="Rechercher un exercice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 bg-white border-leather-200 focus:ring-leather-500 focus:border-leather-500 rounded-full"
              />
            </div>

            {/* Desktop Filter Buttons */}
            <div className="hidden sm:flex items-center space-x-2 bg-leather-100 p-1 rounded-full">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={activeTab === option.value ? "default" : "ghost"}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeTab === option.value
                      ? "bg-leather-600 text-white"
                      : "text-leather-700 hover:text-leather-900 hover:bg-leather-200"
                  }`}
                  onClick={() => handleFilterChange(option.value)}
                >
                  {option.value !== "all" && difficultyIcons[option.value as Difficulty]}
                  {option.label}
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
                      <span>Niveau: {filterOptions.find((o) => o.value === activeTab)?.label || "Tous"}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {filterOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={`flex items-center ${activeTab === option.value ? "bg-leather-100" : ""}`}
                      onClick={() => handleFilterChange(option.value)}
                    >
                      {option.value !== "all" && difficultyIcons[option.value as Difficulty]}
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredExercises && filteredExercises.length > 0 ? (
              filteredExercises.map((exercise: ExerciceType) => {
                const difficultyKey = exercise.ex_difficulty.toLowerCase() as Difficulty
                const difficultyStyle = difficultyColors[difficultyKey] || difficultyColors.débutant

                return (
                  <motion.div
                    key={exercise.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link
                      to={`${exercise.id}`}
                      onClick={() =>
                        createInteraction({
                          inter_date_de_debut: new Date().toISOString(),
                          utilisateur: `/api/utilisateurs/${user?.id}`,
                          exercice: `/api/exercices/${exercise.id}`,
                          typeInteraction: `/api/type_interactions/${interaction?.id}`,
                        })
                      }
                    >
                      <Card className="h-full overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-leather-100">
                        <div className={`h-3 w-full bg-gradient-to-r ${difficultyStyle.gradient}`}></div>
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <Badge className={`${difficultyStyle.bg} ${difficultyStyle.text} border-none`}>
                              {exercise.ex_difficulty}
                            </Badge>
                            <div className="flex items-center text-leather-600 text-sm font-medium">
                              <Clock className="w-4 h-4 mr-1" />
                              {exercise.ex_duration} min
                            </div>
                          </div>

                          <h2 className="text-xl font-bold text-leather-900 mb-3 group-hover:text-leather-700 transition-colors">
                            {exercise.ex_nom}
                          </h2>

                          <p className="text-leather-600 mb-5 line-clamp-2">{exercise.ex_description}</p>

                          {/* Timing Parameters */}
                          <div className="grid grid-cols-3 gap-2 mb-5 p-4 bg-leather-50 rounded-xl">
                            <div className="text-center">
                              <p className="text-xs font-medium text-leather-600 mb-1">Inspiration</p>
                              <p className="text-xl font-bold text-leather-800">{exercise.ex_inspiration}s</p>
                            </div>
                            <div className="text-center border-x border-leather-100">
                              <p className="text-xs font-medium text-leather-600 mb-1">Apnée</p>
                              <p className="text-xl font-bold text-leather-800">{exercise.ex_apnee}s</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs font-medium text-leather-600 mb-1">Expiration</p>
                              <p className="text-xl font-bold text-leather-800">{exercise.ex_expiration}s</p>
                            </div>
                          </div>

                          {/* Benefits */}
                          <div className="mb-6 flex-grow">
                            <h3 className="text-sm font-semibold text-leather-900 mb-2 flex items-center">
                              <Heart className="h-4 w-4 text-leather-500 mr-1" />
                              Bienfaits
                            </h3>
                            <ul className="space-y-1">
                              {exercise.ex_benefits?.slice(0, 3).map((benefit, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                  <span className="text-leather-500 mt-1">•</span>
                                  <span className="text-leather-700">{benefit}</span>
                                </li>
                              ))}
                              {exercise.ex_benefits && exercise.ex_benefits.length > 3 && (
                                <li className="text-sm text-leather-500 italic">
                                  + {exercise.ex_benefits.length - 3} autres bienfaits
                                </li>
                              )}
                            </ul>
                          </div>

                          <Button className="w-full bg-leather-600 hover:bg-leather-700 text-white font-medium py-2 rounded-full transition-colors duration-300 group-hover:shadow-md flex items-center justify-center">
                            <Play className="mr-2 h-4 w-4" />
                            Commencer l'exercice
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <Search className="h-12 w-12 text-leather-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-leather-800 mb-2">Aucun exercice trouvé</h3>
                <p className="text-leather-600">Essayez de modifier vos critères de recherche</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 relative isolate overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-leather-700 via-leather-600 to-leather-500"></div>
          <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-10"></div>

          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Conseils pratiques</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {practicalTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white/20 rounded-full mr-4">
                      <tip.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-white">{tip.title}</h3>
                  </div>
                  <p className="text-leather-100">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

