import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wind, Search, Play, Heart, Brain, Moon, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { ExerciceType } from "../admin-dashboard/exercices/column"
import { useCreateInteraction } from "@/hooks/api/useCreateInteractions"
import { TypeInteraction } from "../admin-dashboard/type-interactions/columns"
import { UserPayload } from "@/context/AuthContext"

type Difficulty = "débutant" | "intermédiaire" | "avancé";

const difficultyColors: Record<Difficulty, string> = {
  débutant: "bg-leather-200 text-leather-800 hover:text-white",
  intermédiaire: "bg-leather-300 text-leather-900 hover:text-white",
  avancé: "bg-leather-400 text-white hover:text-white",
};


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
  exercices: ExerciceType[];
  interaction: TypeInteraction | undefined
  user: UserPayload | null
}

export default function ExercisesPage({ exercices, interaction, user }: ExerciceProps) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { createInteraction } = useCreateInteraction()

  const filteredExercises = exercices?.filter((exercice) =>
    (activeTab === "all" || exercice.ex_difficulty.toLowerCase() === activeTab) &&
    (exercice.ex_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercice.ex_description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-leather-200">
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
            <h1 className="text-5xl font-extrabold text-white mb-4">Exercices de respiration</h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Découvrez votre équilibre intérieur et explorez nos exercices de respiration pour trouver celui qui vous
              convient le mieux.
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
              placeholder="Rechercher un exercice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-white border-leather-300 focus:ring-leather-500 focus:border-leather-500 rounded-full"
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-leather-100 p-1 rounded-full shadow-md">
              <TabsTrigger
                value="all"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-leather-600 data-[state=active]:text-white"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger
                value="débutant"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-leather-400 data-[state=active]:text-white"
              >
                Débutant
              </TabsTrigger>
              <TabsTrigger
                value="intermédiaire"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-leather-500 data-[state=active]:text-white"
              >
                Intermédiaire
              </TabsTrigger>
              <TabsTrigger
                value="avancé"
                className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-leather-600 data-[state=active]:text-white"
              >
                Avancé
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredExercises?.map((exercise: ExerciceType) => (
              <motion.div
                key={exercise.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`${exercise.id}`} onClick={() => createInteraction({
                  inter_date_de_debut: new Date().toISOString(),
                  utilisateur: `/api/utilisateurs/${user?.id}`,
                  exercice: `/api/exercices/${exercise.id}`,
                  typeInteraction: `/api/type_interactions/${interaction?.id}`,
                })}>
                  <Card className="flex flex-col h-full cursor-pointer rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group bg-white">
                    <CardContent className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <Badge className={`${difficultyColors[exercise.ex_difficulty.toLowerCase() as Difficulty]} px-3 py-1 rounded-full`}>
                            {exercise.ex_difficulty}
                          </Badge>
                          {/* Si vous n'avez pas de stats dans l'API, supprimez cette partie */}
                        </div>
                        <h2 className="text-2xl font-bold text-leather-900 mb-2">{exercise.ex_nom}</h2>
                        <p className="text-leather-600 mb-4">{exercise.ex_description}</p>
                        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-leather-50 rounded-3xl">
                          <div className="text-center">
                            <p className="text-sm font-medium text-leather-600">Inspiration</p>
                            <p className="text-2xl font-bold text-leather-800">{exercise.ex_inspiration}s</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-leather-600">Apnée</p>
                            <p className="text-2xl font-bold text-leather-800">{exercise.ex_apnee}s</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-leather-600">Expiration</p>
                            <p className="text-2xl font-bold text-leather-800">{exercise.ex_expiration}s</p>
                          </div>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-leather-900 mb-2">Bienfaits</h3>
                          <ul className="space-y-2">
                            {exercise.ex_benefits?.map((benefit, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Wind className="h-5 w-5 text-leather-500" />
                                <span className="text-leather-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Button className="w-full bg-leather-600 hover:bg-leather-700 text-white font-semibold py-3 rounded-full transition-colors duration-300">
                        <Play className="mr-2 h-5 w-5" />
                        Commencer ({exercise.ex_duration} minutes)
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
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
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Conseils pratiques</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {practicalTips.map((tip, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center bg-leather-600 p-6 rounded-3xl"
                >
                  <div className="mb-4 p-4 bg-leather-500 rounded-full">
                    <tip.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{tip.title}</h3>
                  <p className="text-leather-50">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main >
    </div >
  )
}

