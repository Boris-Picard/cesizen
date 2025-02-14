"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useNavigate } from "react-router-dom"

const EditProfileComponent = () => {
    const [showAnonymizeDialog, setShowAnonymizeDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    let navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Profil mis à jour")
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
        <div className="max-w-2xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Modifier votre profil</CardTitle>
                    <CardDescription>
                        Mettez à jour vos informations personnelles et gérez vos préférences de confidentialité.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="firstname">Prénom</Label>
                                    <Input id="firstname" placeholder="Jean" />
                                </div>
                                <div>
                                    <Label htmlFor="lastname">Nom</Label>
                                    <Input id="lastname" placeholder="Dupont" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Adresse e-mail</Label>
                                <Input id="email" type="email" placeholder="votre@email.com" />
                            </div>
                            <div>
                                <Label htmlFor="password">Nouveau mot de passe</Label>
                                <Input id="password" type="password" placeholder="Laissez vide pour ne pas changer" />
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-green-800">Gestion des données et confidentialité</h3>
                                <p className="text-sm text-green-600">
                                    Conformément au RGPD, vous avez le contrôle sur vos données personnelles.
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="consent" />
                                <Label htmlFor="consent">
                                    J&apos;accepte le traitement de mes données pour améliorer mon expérience sur Cesizen
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="newsletter" />
                                <Label htmlFor="newsletter">Je souhaite recevoir la newsletter de Cesizen</Label>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                                <Dialog open={showAnonymizeDialog} onOpenChange={setShowAnonymizeDialog}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full bg-white text-green-600 border-green-300 hover:bg-green-100">
                                            Anonymiser mes données
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Anonymiser vos données ?</DialogTitle>
                                            <DialogDescription>
                                                Cette action remplacera toutes vos informations personnelles par des données anonymes. Cette
                                                action est irréversible.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setShowAnonymizeDialog(false)}>
                                                Annuler
                                            </Button>
                                            <Button variant="destructive" onClick={handleAnonymize}>
                                                Confirmer l&apos;anonymisation
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive" className="w-full">
                                            Supprimer mon compte
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Supprimer votre compte ?</DialogTitle>
                                            <DialogDescription>
                                                Cette action supprimera définitivement votre compte et toutes vos données associées. Cette
                                                action est irréversible.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                                Annuler
                                            </Button>
                                            <Button variant="destructive" onClick={handleDelete}>
                                                Confirmer la suppression
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate("/profile")}>Annuler</Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                        Enregistrer les modifications
                    </Button>
                </CardFooter>
            </Card>

            <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
                <div className="flex items-center space-x-2 text-yellow-800">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="font-medium">Information importante</h3>
                </div>
                <p className="mt-2 text-sm text-yellow-700">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous avez le droit d&apos;accéder à
                    vos données, de les rectifier, de les effacer, de limiter leur traitement, de vous opposer à leur traitement
                    et à la portabilité des données. Pour exercer ces droits ou pour toute question sur le traitement de vos
                    données, vous pouvez contacter notre délégué à la protection des données à l&apos;adresse : dpo@cesizen.fr
                </p>
            </div>
        </div>
    )
}

export default EditProfileComponent

