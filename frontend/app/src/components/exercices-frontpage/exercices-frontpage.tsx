"use client";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Search,
    TreesIcon as Lungs,
    Wind,
    Clock,
    BarChart,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
    {
        id: "alt",
        name: "Respiration alternée",
        description: "Alternance entre les narines",
        difficulty: "Avancé",
    },
    {
        id: "deep",
        name: "Respiration profonde",
        description: "Inspiration profonde et lente",
        difficulty: "Débutant",
    },
    {
        id: "belly",
        name: "Respiration abdominale",
        description: "Respiration centrée sur le ventre",
        difficulty: "Débutant",
    },
];

const BreathingExercises = () => {
    const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [exercises, setExercises] = useState(breathingExercises);
    const navigate = useNavigate();

    useEffect(() => {
        setExercises(breathingExercises);
    }, []);

    const filteredExercises = exercises.filter(
        (exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStartExercise = () => {
        navigate(`/breathing-exercise/${selectedExercise.id}`);
    };

    return (
        <div className="min-h-screen bg-green-50">
            {/* En-tête avec fond aéré */}
            <header className="py-8 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center">
                    <Button
                        variant="ghost"
                        className="flex items-center text-gray-600 hover:text-gray-800"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" /> Retour
                    </Button>
                    <h1 className="flex-1 text-center text-4xl font-bold text-green-800">
                        Exercices de Respiration
                    </h1>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:space-y-12 space-y-6">
                {/* Section Recherche & Liste des exercices */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-6">
                    <div className="md:col-span-2">
                        {/* Champ de recherche modernisé */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Rechercher un exercice..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 border-green-200 shadow-sm rounded-md"
                            />
                        </div>

                        {/* Liste des exercices en grille */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredExercises.map((exercise) => (
                                <Card
                                    key={exercise.id}
                                    className={`cursor-pointer transition-colors rounded-lg p-4 hover:bg-green-100 ${selectedExercise.id === exercise.id ? "ring-2 ring-green-400" : ""
                                        }`}
                                    onClick={() => setSelectedExercise(exercise)}
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                                        <CardDescription>{exercise.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-green-600">
                                            Difficulté : {exercise.difficulty}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Conteneur sticky pour le détail et la progression */}
                    <div className="relative">
                        <div className="sticky top-8 space-y-6">
                            {/* Détail de l'exercice sélectionné */}
                            <Card className="rounded-lg shadow-sm">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-xl font-semibold">
                                        {selectedExercise.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {selectedExercise.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-green-700 mb-4">
                                        Cet exercice est conçu pour réduire le stress et améliorer votre concentration. Choisissez un endroit calme et commencez quand vous êtes prêt.
                                    </p>
                                    <div className="flex justify-between text-sm text-green-600 mb-2">
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
                                <CardFooter className="p-6">
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 transition-colors duration-300"
                                        onClick={handleStartExercise}
                                    >
                                        <Lungs className="mr-2 h-5 w-5" /> Commencer l'exercice
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Carte "Votre progression" également sticky dans le conteneur */}
                            <Card className="rounded-lg shadow-sm">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-lg font-semibold">
                                        Votre progression
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
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
                </div>

                {/* Section Informations complémentaires */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 rounded-lg shadow-sm">
                        <CardHeader className="flex items-center">
                            <Wind className="mr-2 h-6 w-6 text-green-600" />
                            <CardTitle className="text-lg font-semibold">
                                Bienfaits de la respiration
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-green-700 space-y-2">
                                <li>Réduit le stress et l'anxiété</li>
                                <li>Améliore la concentration</li>
                                <li>Favorise un meilleur sommeil</li>
                                <li>Renforce le système immunitaire</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="p-6 rounded-lg shadow-sm">
                        <CardHeader className="flex items-center">
                            <Clock className="mr-2 h-6 w-6 text-green-600" />
                            <CardTitle className="text-lg font-semibold">Quand pratiquer ?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-700">
                                Pratiquez ces exercices quotidiennement, idéalement le matin ou en fin de journée, pour optimiser leur efficacité.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="p-6 rounded-lg shadow-sm">
                        <CardHeader className="flex items-center">
                            <BarChart className="mr-2 h-6 w-6 text-green-600" />
                            <CardTitle className="text-lg font-semibold">
                                Conseils pour progresser
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-green-700 space-y-2">
                                <li>Commencez par des exercices courts</li>
                                <li>Augmentez progressivement la durée</li>
                                <li>Variez les techniques pour trouver celle qui vous convient</li>
                                <li>La régularité est la clé</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BreathingExercises;
