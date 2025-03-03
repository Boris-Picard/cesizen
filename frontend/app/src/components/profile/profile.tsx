import { act, useState } from "react"
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
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { UserPayload } from "@/context/AuthContext"

interface ProfilePageProps {
  user: UserPayload | null;
  totalInteractions: number | undefined;
  exercices?: {
    id: number;
    ex_nom: string;
    ex_duration: number,
    inter_date_de_debut: Date | undefined,
    inter_date_de_fin?: Date | undefined
  }[];
  informations?: {
    id: number;
    info_titre: string,
    type_info_nom: string;
    inter_date_de_debut: Date | undefined,
    inter_date_de_fin?: Date | undefined
  }[];
}


const ProfilePage = ({ user, informations, exercices, totalInteractions }: ProfilePageProps) => {
  const [currentEmotion, setCurrentEmotion] = useState<number | null>(null);
  const navigate = useNavigate()

  const exercicesDone = exercices?.filter((inter) => inter.inter_date_de_fin !== undefined)
  const exercicesDoneTotal = exercicesDone?.length
  const exercicesDoneLevel = exercicesDoneTotal ?? 0 >= 1 ? "Débutant" : exercicesDoneTotal ?? 0 >= 40 ? "Intémédiaire" : exercicesDoneTotal ?? 0 >= 80 ? "Expert" : "Pas de niveau"
  const exercicesTotalDuration = exercices?.reduce((acc, cur) => acc + cur.ex_duration, 0) || 0

  const hours = Math.floor(exercicesTotalDuration / 60);
  const minutes = exercicesTotalDuration % 60;

  const formattedDuration =
    hours > 0
      ? `${hours} heure${hours > 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`
      : `${minutes} minute${minutes !== 1 ? "s" : ""}`;

  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const consecutiveDays = exercices?.reduce((acc: Record<string, number>, exercice) => {
    if (exercice.inter_date_de_fin) {
      const dayIndex = new Date(exercice.inter_date_de_fin).getDay();
      const dayName = daysOfWeek[dayIndex];
      acc[dayName] = (acc[dayName] || 0) + 1;
    }
    return acc;
  }, {});

  const exerciseIcons = [Lungs, Timer, Flame];
  const infoIcons = [Heart, Star, Smile, NutIcon];

  const color = ["bg-pink-50", "bg-green-50", "bg-yellow-50", "bg-red-50", "bg-blue-50", "bg-purple-50"]

  const randomColor = (color: string[]) => color[Math.floor(Math.random() * color.length)]
  const randomIcon = (icons: any[]) => icons[Math.floor(Math.random() * icons.length)];

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
    const dateA = a.dateFin ? a.dateFin.getTime() : a.dateDebut ? a.dateDebut.getTime() : 0;
    const dateB = b.dateFin ? b.dateFin.getTime() : b.dateDebut ? b.dateDebut.getTime() : 0;
    return dateB - dateA;
  });

  const emotions = [
    { name: "Joie", color: "#FDE68A", icon: "😊" },
    { name: "Tristesse", color: "#93C5FD", icon: "😢" },
    { name: "Colère", color: "#FCA5A5", icon: "😠" },
    { name: "Peur", color: "#D1D5DB", icon: "😨" },
    { name: "Dégoût", color: "#6EE7B7", icon: "🤢" },
    { name: "Surprise", color: "#C4B5FD", icon: "😲" },
  ];

  return (
    <div className="min-h-screen bg-leather-200 py-12">
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
                <p className="text-sm text-leather-600 mb-4">{user?.ut_mail_anonymized ? user?.ut_mail_anonymized : user?.username}</p>
                <Button
                  className="w-full mb-6 bg-leather-600 hover:bg-leather-700 text-white text-sm py-2 px-4 rounded-md transition-all duration-300"
                  onClick={() => navigate("/profile/edit")}
                >
                  <Edit className="mr-2 h-4 w-4" /> Modifier le profil
                </Button>
                <div className="w-full mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-leather-700">Niveau</span>
                    <Badge className="bg-leather-200 text-leather-800 hover:bg-leather-800 hover:text-white text-xs px-2 py-1">{exercicesDoneLevel}</Badge>
                  </div>
                  <Progress value={exercicesDoneTotal} className="h-2 bg-leather-200" />
                </div>
                <div className="w-full space-y-3">
                  <div className="flex justify-between items-center bg-leather-50 p-2 rounded-3xl">
                    <span className="text-sm font-medium text-leather-700">Sessions complétées</span>
                    <span className="text-base font-semibold text-leather-800">{exercicesDoneTotal}</span>
                  </div>
                  <div className="flex justify-between items-center bg-leather-50 p-2 rounded-3xl">
                    <span className="text-sm font-medium text-leather-700">Temps total de pratique</span>
                    <span className="text-base font-semibold text-leather-800">{formattedDuration}</span>
                  </div>
                  <div className="flex justify-between items-center bg-leather-50 p-2 rounded-3xl">
                    <span className="text-sm font-medium text-leather-700">Nombre d'exercices du jour</span>
                    {Object.entries(consecutiveDays || {}).map(([day, count]) => (
                      <span className="text-sm font-medium text-leather-700" key={day}>
                        {day} : {count} exercice{count > 1 ? "s" : ""}
                      </span>
                    ))}
                  </div>
                  {/* ))} */}
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
              <Card className="rounded-3xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1 bg-indigo-50">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-full">
                      <BarChart className="h-8 w-8 text-leather-600" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-leather-700">Total d'interactions</p>
                      <p className="text-xl font-bold text-leather-900">
                        {totalInteractions ?? 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations consultées */}
              <Card className="rounded-3xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1 bg-pink-50">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-full">
                      <Heart className="h-8 w-8 text-leather-600" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-leather-700">Informations consultées</p>
                      <p className="text-xl font-bold text-leather-900">
                        {informations?.length ?? 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercices réalisés */}
              <Card className="rounded-3xl shadow-md transition transform hover:shadow-lg hover:-translate-y-1 bg-blue-50">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-full">
                      <Timer className="h-8 w-8 text-leather-600" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-leather-700">Exercices réalisés</p>
                      <p className="text-xl font-bold text-leather-900">
                        {exercicesDoneTotal ?? 0}
                      </p>
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
              <Card className="rounded-3xl shadow-lg overflow-hidden bg-white border-2 border-leather-200">
                <CardHeader className="p-6 bg-leather-100">
                  <CardTitle className="text-xl font-bold text-leather-800">
                    Tracker d'émotions
                  </CardTitle>
                  <CardDescription className="text-leather-600 text-base">
                    Comment vous sentez-vous aujourd'hui ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                    {emotions.map((emotion, index) => (
                      <motion.button
                        key={emotion.name}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center transition-colors ${currentEmotion === index ? "ring-2 ring-leather-500" : ""
                          }`}
                        style={{ backgroundColor: emotion.color }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentEmotion(index)}
                      >
                        <span className="text-4xl mb-2">{emotion.icon}</span>
                        <span className="text-sm font-medium text-leather-800">
                          {emotion.name}
                        </span>
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
                        className="mt-4"
                      >
                        <p className="text-leather-700 mb-2 text-base">
                          Vous avez sélectionné : {emotions[currentEmotion].name}
                        </p>
                        <div className="flex gap-3">
                          <Button className="bg-leather-600 hover:bg-leather-700 text-white transition-colors duration-300 text-base py-2 px-4 rounded-full">
                            Enregistrer dans le journal
                          </Button>
                          <Button
                            variant="outline"
                            className="text-leather-600 border-leather-300 hover:bg-leather-100 text-base py-2 px-4 rounded-full"
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
                <Card className="rounded-3xl shadow-lg overflow-hidden bg-white border-2 border-leather-200">
                  <CardHeader className="p-6 bg-leather-100">
                    <CardTitle className="text-xl font-bold text-leather-800">Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {activities.map((item, index) => (
                        <li
                          onClick={() => navigate(`${item.type ? `/informations/${item.id}` : `/exercices/${item.id}`}`)} key={index}
                          className={`flex items-center text-leather-700 p-3 rounded-full cursor-pointer ${item.color} group-hover:shadow-md transition-all hover:scale-105`}>
                          <div className="p-2 bg-white rounded-full mr-3">
                            <item.icon className="h-6 w-6 text-leather-600" />
                          </div>
                          <span className="flex-1 text-base line-clamp-2">{item.activity}</span>
                          <Badge variant="secondary" className="bg-white text-leather-700 text-sm">
                            {item.duration ? item.duration : item.type}
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

