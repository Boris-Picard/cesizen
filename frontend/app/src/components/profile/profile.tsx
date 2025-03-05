"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  TreesIcon as Lungs,
  BarChart,
  Activity,
  Heart,
  Smile,
  Timer,
  Edit,
  Calendar,
  Star,
  Flame,
  NutIcon,
  ChevronRight,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { UserPayload } from "@/context/AuthContext"

interface ProfilePageProps {
  user: UserPayload | null
  totalInteractions: number | undefined
  exercices?: {
    id: number
    ex_nom: string
    ex_duration: number
    inter_date_de_debut: Date | undefined
    inter_date_de_fin?: Date | undefined
  }[]
  informations?: {
    id: number
    info_titre: string
    type_info_nom: string
    inter_date_de_debut: Date | undefined
    inter_date_de_fin?: Date | undefined
  }[]
}

const ProfilePage = ({ user, informations, exercices, totalInteractions }: ProfilePageProps) => {
  const [currentEmotion, setCurrentEmotion] = useState<number | null>(null)
  const navigate = useNavigate()

  const exercicesDone = exercices?.filter((inter) => inter.inter_date_de_fin !== undefined)
  const exercicesDoneTotal = exercicesDone?.length
  const exercicesDoneLevel =
    (exercicesDoneTotal ?? 0 >= 1)
      ? "Débutant"
      : (exercicesDoneTotal ?? 0 >= 40)
        ? "Intermédiaire"
        : (exercicesDoneTotal ?? 0 >= 80)
          ? "Expert"
          : "Pas de niveau"
  const exercicesTotalDuration = exercices?.reduce((acc, cur) => acc + cur.ex_duration, 0) || 0

  const hours = Math.floor(exercicesTotalDuration / 60)
  const minutes = exercicesTotalDuration % 60

  const formattedDuration =
    hours > 0
      ? `${hours} heure${hours > 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`
      : `${minutes} minute${minutes !== 1 ? "s" : ""}`

  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
  const consecutiveDays = exercices?.reduce((acc: Record<string, number>, exercice) => {
    if (exercice.inter_date_de_fin) {
      const dayIndex = new Date(exercice.inter_date_de_fin).getDay()
      const dayName = daysOfWeek[dayIndex]
      acc[dayName] = (acc[dayName] || 0) + 1
    }
    return acc
  }, {})

  const exerciseIcons = [Lungs, Timer, Flame]
  const infoIcons = [Heart, Star, Smile, NutIcon]

  const color = [
    "bg-leather-50",
    "bg-leather-100/70",
    "bg-leather-50/80",
    "bg-leather-100/50",
    "bg-leather-50/60",
    "bg-leather-100/40",
  ]

  const randomColor = (color: string[]) => color[Math.floor(Math.random() * color.length)]
  const randomIcon = (icons: any[]) => icons[Math.floor(Math.random() * icons.length)]

  const activities = [
    ...exercicesDone!.map((ex) => ({
      id: ex.id,
      activity: ex.ex_nom,
      type: "",
      duration: `${ex.ex_duration} min`,
      dateDebut: ex.inter_date_de_debut,
      dateFin: ex.inter_date_de_fin,
      icon: randomIcon(exerciseIcons),
      color: randomColor(color),
    })),
    ...informations!.map((info) => ({
      id: info.id,
      activity: info.info_titre,
      type: info.type_info_nom,
      duration: "",
      dateDebut: info.inter_date_de_debut,
      dateFin: info.inter_date_de_fin,
      icon: randomIcon(infoIcons),
      color: randomColor(color),
    })),
  ].slice(0, 4)

  activities.sort((a, b) => {
    const dateA = a.dateFin ? a.dateFin.getTime() : a.dateDebut ? a.dateDebut.getTime() : 0
    const dateB = b.dateFin ? b.dateFin.getTime() : b.dateDebut ? b.dateDebut.getTime() : 0
    return dateB - dateA
  })

  const emotions = [
    { name: "Joie", color: "#FDE68A", icon: "😊" },
    { name: "Tristesse", color: "#93C5FD", icon: "😢" },
    { name: "Colère", color: "#FCA5A5", icon: "😠" },
    { name: "Peur", color: "#D1D5DB", icon: "😨" },
    { name: "Dégoût", color: "#6EE7B7", icon: "🤢" },
    { name: "Surprise", color: "#C4B5FD", icon: "😲" },
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
          {" "}
          {/* Update 1: Increased vertical padding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              Votre Espace Bien-être
            </h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Suivez votre progression et découvrez des recommandations personnalisées pour votre parcours de bien-être.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6 relative z-10">
        {" "}
        {/* Update 1: Changed negative top margin */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info and Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="rounded-3xl shadow-xl overflow-hidden sticky top-20 bg-white border-leather-100">
              <div className="h-24 bg-gradient-to-r from-leather-600 to-leather-500 relative">
                {" "}
                {/* Update 2: Adjusted avatar positioning */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  {" "}
                  {/* Update 2: Adjusted avatar positioning */}
                  <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                    {" "}
                    {/* Update 2: Adjusted avatar size */}
                    <AvatarFallback className="bg-leather-700 text-white text-xl">
                      {" "}
                      {/* Update 2: Adjusted avatar text size */}
                      {user?.firstname[0]}
                      {user?.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <CardContent className="pt-14 p-6 flex flex-col items-center text-center">
                {" "}
                {/* Update 2: Adjusted padding */}
                <h2 className="text-2xl font-bold text-leather-900 mb-1">
                  {user?.firstname} {user?.lastname}
                </h2>
                <p className="text-sm text-leather-600 mb-6">
                  {user?.ut_mail_anonymized ? user?.ut_mail_anonymized : user?.username}
                </p>
                <Button
                  className="w-full mb-8 bg-leather-600 hover:bg-leather-700 text-white rounded-full transition-all duration-300 flex items-center justify-center"
                  onClick={() => navigate("/profile/edit")}
                >
                  <Edit className="mr-2 h-4 w-4" /> Modifier le profil
                </Button>
                <div className="w-full mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-leather-700 flex items-center">
                      <Award className="h-4 w-4 mr-1 text-leather-600" /> Niveau
                    </span>
                    <Badge
                      className={`${
                        exercicesDoneLevel === "Débutant"
                          ? "bg-leather-100 text-leather-800"
                          : exercicesDoneLevel === "Intermédiaire"
                            ? "bg-leather-200 text-leather-900"
                            : "bg-leather-300 text-leather-950"
                      } border-none`}
                    >
                      {exercicesDoneLevel}
                    </Badge>
                  </div>
                  <Progress
                    value={exercicesDoneTotal ? Math.min(exercicesDoneTotal / 0.8, 100) : 0}
                    className="h-2 bg-leather-100"
                  />
                  <p className="text-xs text-leather-500 mt-1 text-right">
                    {exercicesDoneTotal} / 80 exercices pour le niveau Expert
                  </p>
                </div>
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between p-4 bg-leather-50 rounded-xl hover:bg-leather-100/50 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                        <Activity className="h-5 w-5 text-leather-600" />
                      </div>
                      <span className="text-sm font-medium text-leather-700">Sessions complétées</span>
                    </div>
                    <span className="text-lg font-bold text-leather-800">{exercicesDoneTotal}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-leather-50 rounded-xl hover:bg-leather-100/50 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                        <Clock className="h-5 w-5 text-leather-600" />
                      </div>
                      <span className="text-sm font-medium text-leather-700">Temps de pratique</span>
                    </div>
                    <span className="text-lg font-bold text-leather-800">{formattedDuration}</span>
                  </div>

                  <div className="p-4 bg-leather-50 rounded-xl hover:bg-leather-100/50 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                        <Calendar className="h-5 w-5 text-leather-600" />
                      </div>
                      <span className="text-sm font-medium text-leather-700">Activité hebdomadaire</span>
                    </div>

                    <div className="flex justify-between items-center">
                      {daysOfWeek.map((day) => {
                        const count = consecutiveDays?.[day] || 0
                        return (
                          <div key={day} className="flex flex-col items-center">
                            <span className="text-xs text-leather-600 mb-1">{day}</span>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                count > 0 ? "bg-leather-600 text-white" : "bg-leather-100 text-leather-400"
                              }`}
                            >
                              {count}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {/* Total d'interactions */}
              <Card className="rounded-3xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1 border-leather-100 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-leather-500 to-leather-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-leather-50 rounded-full">
                      <BarChart className="h-6 w-6 text-leather-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-leather-600">Total d'interactions</p>
                      <p className="text-2xl font-bold text-leather-900">{totalInteractions ?? 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations consultées */}
              <Card className="rounded-3xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1 border-leather-100 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-leather-600 to-leather-700"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-leather-50 rounded-full">
                      <BookOpen className="h-6 w-6 text-leather-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-leather-600">Informations consultées</p>
                      <p className="text-2xl font-bold text-leather-900">{informations?.length ?? 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercices réalisés */}
              <Card className="rounded-3xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1 border-leather-100 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-leather-700 to-leather-800"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-leather-50 rounded-full">
                      <Timer className="h-6 w-6 text-leather-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-leather-600">Exercices réalisés</p>
                      <p className="text-2xl font-bold text-leather-900">{exercicesDoneTotal ?? 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emotion Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="rounded-3xl shadow-lg overflow-hidden border-leather-100">
                <CardHeader className="p-6 bg-gradient-to-r from-leather-600 to-leather-500">
                  <CardTitle className="text-xl font-bold text-white">Tracker d'émotions</CardTitle>
                  <CardDescription className="text-leather-100 text-base">
                    Comment vous sentez-vous aujourd'hui ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                    {emotions.map((emotion, index) => (
                      <motion.button
                        key={emotion.name}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                          currentEmotion === index ? "ring-2 ring-leather-600 shadow-md" : "hover:shadow-md"
                        }`}
                        style={{ backgroundColor: emotion.color }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentEmotion(index)}
                      >
                        <span className="text-4xl mb-2">{emotion.icon}</span>
                        <span className="text-sm font-medium text-leather-800">{emotion.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Boutons d'action qui apparaissent lors de la sélection */}
                  <AnimatePresence>
                    {currentEmotion !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 bg-leather-50 rounded-xl"
                      >
                        <p className="text-leather-700 mb-4 text-base">
                          Vous avez sélectionné : <span className="font-bold">{emotions[currentEmotion].name}</span>
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button className="bg-leather-600 hover:bg-leather-700 text-white transition-colors duration-300 rounded-full">
                            Enregistrer dans le journal
                          </Button>
                          <Button
                            variant="outline"
                            className="text-leather-600 border-leather-300 hover:bg-leather-100 rounded-full"
                            onClick={() => setCurrentEmotion(null)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity and Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <Card className="rounded-3xl shadow-lg overflow-hidden border-leather-100">
                  <CardHeader className="p-6 bg-gradient-to-r from-leather-500 to-leather-600">
                    <CardTitle className="text-xl font-bold text-white">Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {activities.map((item, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ x: 5 }}
                          onClick={() =>
                            navigate(`${item.type ? `/informations/${item.id}` : `/exercices/${item.id}`}`)
                          }
                          className={`flex items-center p-3 rounded-xl cursor-pointer ${item.color} hover:shadow-md transition-all duration-300`}
                        >
                          <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                            <item.icon className="h-5 w-5 text-leather-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-leather-800 font-medium truncate">{item.activity}</p>
                            <p className="text-xs text-leather-600">
                              {new Date(item.dateFin || item.dateDebut || "").toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-white text-leather-700 text-xs whitespace-nowrap">
                            {item.duration ? item.duration : item.type}
                          </Badge>
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      variant="ghost"
                      className="w-full mt-4 text-leather-600 hover:text-leather-700 hover:bg-leather-50"
                      onClick={() => navigate("/history")}
                    >
                      Voir toute l'activité
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="rounded-3xl shadow-lg overflow-hidden border-leather-100">
                  <CardHeader className="p-6 bg-gradient-to-r from-leather-600 to-leather-700">
                    <CardTitle className="text-xl font-bold text-white">Recommandations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {[
                        {
                          title: "Yoga doux",
                          description: "Essayez notre nouvelle séance relaxante",
                          icon: Activity,
                          color: "bg-leather-50",
                          path: "/exercices/1",
                        },
                        {
                          title: "Cohérence cardiaque",
                          description: "Découvrez ses bienfaits sur votre bien-être",
                          icon: Heart,
                          color: "bg-leather-100/50",
                          path: "/exercices/2",
                        },
                        {
                          title: "Défi gratitude",
                          description: "Participez à 'Une semaine de gratitude'",
                          icon: Calendar,
                          color: "bg-leather-50/80",
                          path: "/challenges",
                        },
                      ].map((recommendation, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ x: 5 }}
                          className="cursor-pointer"
                          onClick={() => navigate(recommendation.path)}
                        >
                          <div
                            className={`p-4 rounded-xl ${recommendation.color} hover:shadow-md transition-all duration-300`}
                          >
                            <div className="flex items-start">
                              <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                                <recommendation.icon className="h-5 w-5 text-leather-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-leather-800">{recommendation.title}</h4>
                                <p className="text-sm text-leather-600">{recommendation.description}</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-leather-400 self-center" />
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      variant="ghost"
                      className="w-full mt-4 text-leather-600 hover:text-leather-700 hover:bg-leather-50"
                      onClick={() => navigate("/recommendations")}
                    >
                      Voir plus de recommandations
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 relative isolate overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-leather-700 via-leather-600 to-leather-500"></div>
          <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-10"></div>

          <div className="p-8 sm:p-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Votre parcours bien-être</h2>
              <p className="text-leather-100 max-w-2xl mx-auto mb-8">
                Continuez à prendre soin de votre santé mentale avec nos exercices personnalisés et découvrez de
                nouvelles façons d'améliorer votre bien-être quotidien.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  className="bg-white text-leather-700 hover:bg-leather-100 rounded-full transition-all duration-300 group"
                  onClick={() => navigate("/exercices")}
                >
                  <Lungs className="mr-2 h-5 w-5" />
                  Découvrir les exercices
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 rounded-full transition-all duration-300 group"
                  onClick={() => navigate("/informations")}
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Suivre ma progression
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default ProfilePage

