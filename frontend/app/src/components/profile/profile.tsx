"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Calendar, Heart, type LucideIcon, Smile, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const navigate = useNavigate();

  // Composant pour afficher une émotion
  const EmotionCard = ({ emotion, icon: Icon }: { emotion: string; icon: LucideIcon }) => (
    <Card
      className={`cursor-pointer transition-colors rounded-lg ${
        selectedEmotion === emotion ? "bg-green-50" : "bg-white"
      }`}
      onClick={() => setSelectedEmotion(emotion)}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <Icon className="w-8 h-8 text-green-600 mb-2" />
        <p className="text-sm font-medium text-green-800">{emotion}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
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

        {/* Cartes de statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white rounded-lg shadow-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold">Niveau de stress</CardTitle>
              <CardDescription className="text-sm text-green-600">
                Basé sur votre dernier diagnostic
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Progress value={35} className="h-2 mb-2" />
              <p className="text-sm text-green-600">Stress modéré</p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold">Exercices de respiration</CardTitle>
              <CardDescription className="text-sm text-green-600">Cette semaine</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
              <p className="text-sm text-green-600">sessions complétées</p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold">Activités de détente</CardTitle>
              <CardDescription className="text-sm text-green-600">Favoris récents</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="list-disc list-inside text-green-600">
                <li>Méditation guidée</li>
                <li>Yoga doux</li>
                <li>Marche en pleine conscience</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tracker d'émotions */}
        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader className="p-6">
            <CardTitle className="text-lg font-semibold">Tracker d'émotions</CardTitle>
            <CardDescription className="text-sm text-green-600">
              Comment vous sentez-vous aujourd'hui ?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
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
                  <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300">
                    Enregistrer dans le journal
                  </Button>
                  <Button variant="destructive" onClick={() => setSelectedEmotion("")}>
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistiques d'utilisation et Conseil du jour */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white rounded-lg shadow-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold">Statistiques d'utilisation</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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

          <Card className="bg-white rounded-lg shadow-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold">Conseil du jour</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-green-600">
                "Prenez un moment aujourd'hui pour pratiquer la gratitude. Notez trois choses pour lesquelles vous êtes reconnaissant."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
