"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, ArrowLeft, User, Mail, Lock, Shield, Trash2, Clock, Settings } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { useNavigate } from "react-router-dom"

const EditProfileComponent = () => {
  const [showAnonymizeDialog, setShowAnonymizeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profil mis à jour")
    // Ajoutez ici la logique de mise à jour du profil
  }

  const handleAnonymize = () => {
    console.log("Compte anonymisé")
    setShowAnonymizeDialog(false)
  }

  const handleDelete = () => {
    console.log("Compte supprimé")
    setShowDeleteDialog(false)
  }

  return (
    <div className="min-h-screen bg-leather-200 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-8 text-leather-600 hover:text-white text-lg"
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour au profil
        </Button>

        <Card className="w-full shadow-lg rounded-3xl overflow-hidden border-leather-200 bg-white">
          <CardHeader className="bg-leather-100 px-8 py-6">
            <CardTitle className="text-3xl font-bold text-leather-800">Modifier votre profil</CardTitle>
            <CardDescription className="text-leather-600 mt-2 text-lg">
              Personnalisez vos informations et vos préférences
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="text-leather-800 text-lg">
                    Prénom
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                    <Input
                      id="firstname"
                      placeholder="Jean"
                      className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-lg bg-leather-50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-leather-800 text-lg">
                    Nom
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                    <Input
                      id="lastname"
                      placeholder="Dupont"
                      className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-lg bg-leather-50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-leather-800 text-lg">
                  Adresse e-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-lg bg-leather-50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-leather-800 text-lg">
                  Nouveau mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Laissez vide pour ne pas changer"
                    className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-lg bg-leather-50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                  />
                </div>
              </div>

              <Separator className="my-8 bg-leather-200" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-leather-800">Confidentialité</h3>
                  <Shield className="h-6 w-6 text-leather-600" />
                </div>
                <p className="text-leather-600 text-lg">
                  Gérez vos préférences de confidentialité et le traitement de vos données.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-leather-100 p-4 rounded-3xl">
                    <Label htmlFor="consent" className="text-leather-700 text-lg cursor-pointer">
                      Autoriser le traitement des données
                    </Label>
                    <Switch
                      id="consent"
                      className="bg-leather-300 border-transparent text-leather-50 focus:ring-offset-leather-100 focus:ring-leather-600 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between bg-leather-100 p-4 rounded-3xl">
                    <Label htmlFor="newsletter" className="text-leather-700 text-lg cursor-pointer">
                      S'abonner à la newsletter
                    </Label>
                    <Switch id="newsletter" className="bg-leather-300 border-transparent text-leather-50 focus:ring-offset-leather-100 focus:ring-leather-600 transition-all duration-300" />
                  </div>
                </div>
              </div>

              <Separator className="my-8 bg-leather-200" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-leather-800">Actions sur le compte</h3>
                  <Trash2 className="h-6 w-6 text-leather-600" />
                </div>
                <div className="space-y-4">
                  <Dialog open={showAnonymizeDialog} onOpenChange={setShowAnonymizeDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full bg-leather-50 text-leather-700 border-leather-300 hover:bg-leather-100 py-3 text-lg rounded-full transition-all duration-300 hover:shadow-md"
                      >
                        Anonymiser mes données
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-leather-50 to-leather-100 rounded-3xl border-leather-200 shadow-xl max-w-md w-full">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-leather-800 flex items-center">
                          <Shield className="w-8 h-8 mr-2 text-leather-600" />
                          Anonymiser vos données ?
                        </DialogTitle>
                        <DialogDescription className="text-leather-600 text-lg mt-4">
                          Cette action remplacera toutes vos informations personnelles par des données anonymes.
                          <span className="block mt-2 font-semibold text-leather-700">Cette action est irréversible.</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 p-4 bg-leather-200 rounded-3xl">
                        <p className="text-leather-800 font-medium">Après l'anonymisation :</p>
                        <ul className="mt-2 space-y-2 text-leather-700">
                          <li className="flex items-center"><User className="w-5 h-5 mr-2 text-leather-600" /> Votre nom sera remplacé</li>
                          <li className="flex items-center"><Mail className="w-5 h-5 mr-2 text-leather-600" /> Votre email sera masqué</li>
                          <li className="flex items-center"><Lock className="w-5 h-5 mr-2 text-leather-600" /> Vos données seront protégées</li>
                        </ul>
                      </div>
                      <DialogFooter className="mt-6 space-x-4">
                        <Button onClick={() => setShowAnonymizeDialog(false)} className="flex-1 bg-leather-200 text-leather-800 hover:bg-leather-300 transition-colors duration-300">
                          Annuler
                        </Button>
                        <Button onClick={handleAnonymize} className="flex-1 bg-leather-600 text-white hover:bg-leather-700 transition-colors duration-300">
                          Confirmer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full py-3 text-lg rounded-full transition-all duration-300 hover:shadow-md">
                        Supprimer mon compte
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-red-50 to-leather-100 rounded-3xl border-red-200 shadow-xl max-w-md w-full">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-red-800 flex items-center">
                          <Trash2 className="w-8 h-8 mr-2 text-red-600" />
                          Supprimer votre compte ?
                        </DialogTitle>
                        <DialogDescription className="text-leather-700 text-lg mt-4">
                          Cette action supprimera définitivement votre compte et toutes vos données associées.
                          <span className="block mt-2 font-semibold text-red-700">Cette action est irréversible.</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 p-4 bg-red-100 rounded-3xl">
                        <p className="text-red-800 font-medium">Conséquences de la suppression :</p>
                        <ul className="mt-2 space-y-2 text-red-700">
                          <li className="flex items-center"><User className="w-5 h-5 mr-2 text-red-600" /> Perte de votre profil</li>
                          <li className="flex items-center"><Clock className="w-5 h-5 mr-2 text-red-600" /> Historique effacé</li>
                          <li className="flex items-center"><Settings className="w-5 h-5 mr-2 text-red-600" /> Paramètres supprimés</li>
                        </ul>
                      </div>
                      <DialogFooter className="mt-6 space-x-4">
                        <Button onClick={() => setShowDeleteDialog(false)} className="flex-1 bg-leather-200 text-leather-800 hover:bg-leather-300 transition-colors duration-300">
                          Annuler
                        </Button>
                        <Button onClick={handleDelete} className="flex-1 bg-red-600 text-white hover:bg-red-700 transition-colors duration-300">
                          Supprimer définitivement
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => navigate("/profile")}
                  className="w-full sm:w-auto border-leather-400 text-leather-700 hover:bg-leather-100 hover:text-leather-800 py-3 px-6 text-lg rounded-full transition-all duration-300 hover:shadow-md"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-leather-600 hover:bg-leather-700 text-white py-3 px-6 text-lg rounded-full transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-leather-500"
                >
                  Enregistrer les modifications
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10">
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-3xl text-base">
            <div className="flex items-center space-x-3 text-yellow-800 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Information importante</h3>
            </div>
            <p className="text-yellow-700 leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous avez le droit d'accéder à vos
              données, de les rectifier, de les effacer, de limiter leur traitement, de vous opposer à leur traitement
              et à la portabilité des données. Pour exercer ces droits ou pour toute question sur le traitement de vos
              données, vous pouvez contacter notre délégué à la protection des données à l'adresse : dpo@cesizen.fr
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfileComponent
