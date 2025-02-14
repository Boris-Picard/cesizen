import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, Heart, type LucideIcon, Smile, Timer } from "lucide-react"
import { useNavigate } from "react-router-dom"

const UserDashboard = () => {
    const [selectedEmotion, setSelectedEmotion] = useState("")
    const navigate = useNavigate()

    const EmotionCard = ({ emotion, icon: Icon }: { emotion: string; icon: LucideIcon }) => (
        <Card
            className={`cursor-pointer hover:bg-green-100 transition-colors ${selectedEmotion === emotion ? "bg-green-100" : ""}`}
            onClick={() => setSelectedEmotion(emotion)}
        >
            <CardContent className="flex flex-col items-center justify-center p-6">
                <Icon className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm font-medium text-green-800">{emotion}</p>
            </CardContent>
        </Card>
    )

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl px-4 md:px-8 mx-auto space-y-8">
        {/* En-tête avec Avatar et informations utilisateur */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar de l'utilisateur" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-green-800">Bonjour, Jean Dupont</h1>
              <p className="text-green-600">jean.dupont@example.com</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/profile/edit")}
            className="mt-4 md:mt-0 bg-white text-green-600 border-green-300 hover:bg-green-100"
          >
            Modifier le profil
          </Button>
        </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Niveau de stress</CardTitle>
                            <CardDescription>Basé sur votre dernier diagnostic</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={35} className="h-2 mb-2" />
                            <p className="text-sm text-green-600">Stress modéré</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Exercices de respiration</CardTitle>
                            <CardDescription>Cette semaine</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                            <p className="text-sm text-green-600">sessions complétées</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Activités de détente</CardTitle>
                            <CardDescription>Favoris récents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-green-600">
                                <li>Méditation guidée</li>
                                <li>Yoga doux</li>
                                <li>Marche en pleine conscience</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Tracker d&apos;émotions</CardTitle>
                        <CardDescription>Comment vous sentez-vous aujourd&apos;hui ?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                            <EmotionCard emotion="Joie" icon={Smile} />
                            <EmotionCard emotion="Calme" icon={Heart} />
                            <EmotionCard emotion="Fatigue" icon={Timer} />
                            <EmotionCard emotion="Stress" icon={BarChart} />
                            <EmotionCard emotion="Tristesse" icon={Calendar} />
                            <EmotionCard emotion="Colère" icon={BarChart} />
                        </div>
                        {selectedEmotion && (
                            <div className="mt-4">
                                <p className="text-green-600 mb-2">Vous avez sélectionné : {selectedEmotion}</p>
                                <div className="flex gap-3">
                                    <Button className="bg-green-600 hover:bg-green-700 text-white">Enregistrer dans le journal</Button>
                                    <Button variant="destructive" onClick={() => setSelectedEmotion("")}>
                                        Annuler
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistiques d&apos;utilisation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-green-600">Jours consécutifs</span>
                                    <span className="font-bold">7</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-green-600">Exercices complétés</span>
                                    <span className="font-bold">28</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-green-600">Émotions enregistrées</span>
                                    <span className="font-bold">15</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Conseil du jour</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-600">
                                &quot;Prenez un moment aujourd&apos;hui pour pratiquer la gratitude. Notez trois choses pour
                                lesquelles vous êtes reconnaissant.&quot;
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard

