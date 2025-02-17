import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  TreesIcon as Lungs,
  Wind,
  BarChart,
  Activity,
  Heart,
  Smile,
  Timer,
  Edit,
  TrendingUp,
  Calendar,
  Moon,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const ProfilePage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("")
  const navigate = useNavigate()
  const { user } = useAuth()

  const EmotionCard = ({ emotion, icon: Icon }: { emotion: string; icon: React.ElementType }) => (
    <Card
      className={`cursor-pointer transition-all duration-300 rounded-3xl ${selectedEmotion === emotion
        ? "bg-leather-300 border-leather-500 shadow-lg scale-105"
        : "bg-leather-50 hover:bg-leather-100"
        }`}
      onClick={() => setSelectedEmotion(emotion)}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <Icon className={`w-8 h-8 ${selectedEmotion === emotion ? "text-leather-800" : "text-leather-600"} mb-2`} />
        <p className={`text-sm font-medium ${selectedEmotion === emotion ? "text-leather-900" : "text-leather-700"}`}>
          {emotion}
        </p>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-leather-50 to-leather-100 bg-opacity-50 py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-leather-900 mb-8 text-center">Votre Espace Bien-être</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info and Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="rounded-3xl shadow-md overflow-hidden sticky top-20 bg-white border border-leather-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-leather-300">
                  <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                </Avatar>
                <h2 className="text-3xl font-semibold text-leather-800 mb-1">{user?.firstname} {user?.lastname}</h2>
                <p className="text-sm text-leather-600 mb-4">{user?.username}</p>
                <Button
                  className="w-full mb-6 bg-leather-600 hover:bg-leather-700 text-white text-sm py-2 px-4 rounded-md transition-all duration-300"
                  onClick={() => navigate("/profile/edit")}
                >
                  <Edit className="mr-2 h-4 w-4" /> Modifier le profil
                </Button>
                <div className="w-full mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-leather-700">Niveau de bien-être</span>
                    <Badge className="bg-leather-200 text-leather-800 text-xs px-2 py-1">Intermédiaire</Badge>
                  </div>
                  <Progress value={66} className="h-2 bg-leather-200" />
                </div>
                <div className="w-full space-y-3">
                  {[
                    { label: "Sessions complétées", value: "28" },
                    { label: "Temps total de pratique", value: "5h 30min" },
                    { label: "Jours consécutifs", value: "7" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-leather-50 p-2 rounded-3xl">
                      <span className="text-sm font-medium text-leather-700">{item.label}</span>
                      <span className="text-base font-semibold text-leather-800">{item.value}</span>
                    </div>
                  ))}
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
              {[
                { title: "Niveau de stress", value: "35%", icon: BarChart, trend: "down", color: "bg-green-50" },
                { title: "Qualité du sommeil", value: "Bonne", icon: Moon, trend: "up", color: "bg-blue-50" },
                { title: "Humeur moyenne", value: "Positive", icon: Smile, trend: "stable", color: "bg-yellow-50" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className={`rounded-3xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1 ${stat.color}`}
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white rounded-full">
                        <stat.icon className="h-8 w-8 text-leather-600" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-leather-700">{stat.title}</p>
                        <p className="text-xl font-bold text-leather-900">{stat.value}</p>
                      </div>
                    </div>
                    <TrendingUp
                      className={`h-6 w-6 ${stat.trend === "up"
                        ? "text-green-500"
                        : stat.trend === "down"
                          ? "text-red-500"
                          : "text-yellow-500"
                        }`}
                    />
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Emotion Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="rounded-3xl shadow-lg overflow-hidden bg-white border-2 border-leather-200">
                <CardHeader className="p-6 bg-leather-100">
                  <CardTitle className="text-xl font-bold text-leather-800">Tracker d'émotions</CardTitle>
                  <CardDescription className="text-leather-600 text-base">
                    Comment vous sentez-vous aujourd'hui ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                    <EmotionCard emotion="Joie" icon={Smile} />
                    <EmotionCard emotion="Calme" icon={Heart} />
                    <EmotionCard emotion="Fatigue" icon={Timer} />
                    <EmotionCard emotion="Stress" icon={BarChart} />
                    <EmotionCard emotion="Tristesse" icon={Activity} />
                    <EmotionCard emotion="Colère" icon={Wind} />
                  </div>
                  <AnimatePresence>
                    {selectedEmotion && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-4"
                      >
                        <p className="text-leather-700 mb-2 text-base">Vous avez sélectionné : {selectedEmotion}</p>
                        <div className="flex gap-3">
                          <Button className="bg-leather-600 hover:bg-leather-700 text-white transition-colors duration-300 text-base py-2 px-4 rounded-full">
                            Enregistrer dans le journal
                          </Button>
                          <Button
                            variant="outline"
                            className="text-leather-600 border-leather-300 hover:bg-leather-100 text-base py-2 px-4 rounded-full"
                            onClick={() => setSelectedEmotion("")}
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
                <Card className="rounded-3xl shadow-lg overflow-hidden bg-white border-2 border-leather-200">
                  <CardHeader className="p-6 bg-leather-100">
                    <CardTitle className="text-xl font-bold text-leather-800">Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {[
                        { activity: "Méditation guidée", duration: "15 min", icon: Heart, color: "bg-pink-50" },
                        { activity: "Exercice de respiration", duration: "10 min", icon: Lungs, color: "bg-blue-50" },
                        {
                          activity: "Marche en pleine conscience",
                          duration: "20 min",
                          icon: Timer,
                          color: "bg-green-50",
                        },
                      ].map((item, index) => (
                        <li key={index} className={`flex items-center text-leather-700 p-3 rounded-full ${item.color}`}>
                          <div className="p-2 bg-white rounded-full mr-3">
                            <item.icon className="h-6 w-6 text-leather-600" />
                          </div>
                          <span className="flex-1 text-base">{item.activity}</span>
                          <Badge variant="secondary" className="bg-white text-leather-700 text-sm">
                            {item.duration}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="rounded-3xl shadow-lg cursor-pointer overflow-hidden bg-white border-2 border-leather-200">
                  <CardHeader className="p-6 bg-leather-100">
                    <CardTitle className="text-xl font-bold text-leather-800">Recommandations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {[
                        {
                          title: "Yoga doux",
                          description: "Essayez notre nouvelle séance relaxante",
                          icon: Activity,
                          color: "bg-purple-50",
                        },
                        {
                          title: "Cohérence cardiaque",
                          description: "Découvrez ses bienfaits sur votre bien-être",
                          icon: Heart,
                          color: "bg-red-50",
                        },
                        {
                          title: "Défi gratitude",
                          description: "Participez à 'Une semaine de gratitude'",
                          icon: Calendar,
                          color: "bg-yellow-50",
                        },
                      ].map((recommendation, index) => (
                        <li key={index} className="group">
                          <Card
                            className={`transition-all rounded-3xl duration-300 group-hover:shadow-md ${recommendation.color} hover:scale-105`}
                          >
                            <CardContent className="p-4 flex items-start">
                              <div className="p-2 bg-white rounded-full mr-3">
                                <recommendation.icon className="h-6 w-6 text-leather-700" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-leather-800 text-base">{recommendation.title}</h4>
                                <p className="text-leather-600 text-base">{recommendation.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </li>
                      ))}
                    </ul>
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
          className="mt-12 text-center bg-gradient-to-r from-leather-500 to-leather-600 p-12 rounded-3xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Votre parcours bien-être</h2>
          <p className="text-leather-100 text-base mb-6">
            Continuez à prendre soin de votre santé mentale avec nos exercices personnalisés.
          </p>
          <Button
            className="bg-white text-leather-700 hover:bg-leather-100 py-3 px-6 text-base transition-colors duration-300 ease-out rounded-full transform hover:scale-105"
            onClick={() => navigate("/exercices")}
          >
            <Lungs className="mr-2 h-5 w-5" /> Découvrez nos exercices de respiration
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

export default ProfilePage

