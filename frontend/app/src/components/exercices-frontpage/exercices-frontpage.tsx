import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Search, TreesIcon as Lungs, Wind, Clock, BarChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const breathingExercises = [
    {
        id: "748",
        name: "Cohérence cardiaque 7-4-8",
        description: "Inspiration : 7s / Apnée : 4s / Expiration : 8s",
        difficulty: "Intermédiaire",
    },
    {
        id: "55",
        name: "Respiration carrée 5-5",
        description: "Inspiration : 5s / Apnée : 0s / Expiration : 5s",
        difficulty: "Débutant",
    },
    {
        id: "46",
        name: "Respiration relaxante 4-6",
        description: "Inspiration : 4s / Apnée : 0s / Expiration : 6s",
        difficulty: "Débutant",
    },
    {
        id: "478",
        name: "Technique 4-7-8",
        description: "Inspiration : 4s / Apnée : 7s / Expiration : 8s",
        difficulty: "Avancé",
    },
    {
        id: "box",
        name: "Respiration en boîte",
        description: "Inspiration : 4s / Apnée : 4s / Expiration : 4s / Apnée : 4s",
        difficulty: "Intermédiaire",
    },
    { id: "alt", name: "Respiration alternée", description: "Alternance entre les narines", difficulty: "Avancé" },
    { id: "deep", name: "Respiration profonde", description: "Inspiration profonde et lente", difficulty: "Débutant" },
    {
        id: "belly",
        name: "Respiration abdominale",
        description: "Respiration centrée sur le ventre",
        difficulty: "Débutant",
    },
]

const BreathingExercises = () => {
    const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const filteredExercises = breathingExercises.filter(
        (exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleStartExercise = () => {
        navigate(`/breathing-exercise/${selectedExercise.id}`)
    }

    return (
        <div className="min-h-screen bg-green-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold text-green-800 mb-6">Exercices de Respiration</h1>

                        <div className="relative w-full mb-6">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Rechercher un exercice..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10"
                            />
                        </div>


                        <ScrollArea className="h-[400px] md:h-[600px] w-full rounded-md border border-green-200 p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {filteredExercises.map((exercise) => (
                                    <Card
                                        key={exercise.id}
                                        className={`cursor-pointer hover:bg-green-100 transition-all ${selectedExercise.id === exercise.id ? "ring-2 ring-green-400" : ""}`}
                                        onClick={() => setSelectedExercise(exercise)}
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-lg">{exercise.name}</CardTitle>
                                            <CardDescription>{exercise.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-green-600">Difficulté : {exercise.difficulty}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    <div>
                        <Card className="top-4">
                            <CardHeader>
                                <CardTitle>{selectedExercise.name}</CardTitle>
                                <CardDescription>{selectedExercise.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-green-700 mb-4">
                                    Cet exercice vous aidera à réduire votre stress et à améliorer votre concentration. Trouvez un endroit
                                    calme et commencez quand vous êtes prêt.
                                </p>
                                <div className="flex items-center justify-between text-sm text-green-600 mb-2">
                                    <span>Difficulté :</span>
                                    <span>{selectedExercise.difficulty}</span>
                                </div>
                                <Progress
                                    value={
                                        selectedExercise.difficulty === "Débutant"
                                            ? 33
                                            : selectedExercise.difficulty === "Intermédiaire"
                                                ? 66
                                                : 100
                                    }
                                    className="h-2 mb-4"
                                />
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleStartExercise}>
                                    <Lungs className="mr-2 h-4 w-4" /> Commencer l&apos;exercice
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Votre progression</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-green-600">Exercices complétés</span>
                                        <span className="font-bold">12</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-green-600">Temps total de pratique</span>
                                        <span className="font-bold">2h 30min</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-green-600">Niveau actuel</span>
                                        <span className="font-bold">Intermédiaire</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="md:mt-12 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Wind className="mr-2 h-5 w-5 text-green-600" />
                                Bienfaits de la respiration
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-green-700 space-y-2">
                                <li>Réduit le stress et l&apos;anxiété</li>
                                <li>Améliore la concentration</li>
                                <li>Favorise un meilleur sommeil</li>
                                <li>Renforce le système immunitaire</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Clock className="mr-2 h-5 w-5 text-green-600" />
                                Quand pratiquer ?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-700">
                                Pratiquez ces exercices régulièrement, idéalement chaque jour. Ils sont particulièrement bénéfiques le
                                matin au réveil, avant une situation stressante, ou le soir pour favoriser l&apos;endormissement.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart className="mr-2 h-5 w-5 text-green-600" />
                                Conseils pour progresser
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-green-700 space-y-2">
                                <li>Commencez par des exercices courts</li>
                                <li>Augmentez progressivement la durée</li>
                                <li>Expérimentez différentes techniques</li>
                                <li>Soyez constant dans votre pratique</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default BreathingExercises

