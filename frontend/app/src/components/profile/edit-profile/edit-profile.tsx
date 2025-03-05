"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, ArrowLeft, User, Mail, Lock, Shield, Trash2, Clock, Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useNavigate } from "react-router-dom"
import type { UserPayload } from "@/context/AuthContext"
import { useUpdateProfile } from "@/hooks/profile/edit-profile/usePatchUserProfile"
import { Icons } from "@/components/ui/icons"
import { useAnonymizeUser } from "@/hooks/profile/edit-profile/useAnonymizeUser"
import { useDeleteUser } from "@/hooks/profile/edit-profile/useDeleteUser"

const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom est requis." })
    .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
      message: "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux.",
    }),
  lastName: z
    .string()
    .min(2, { message: "Le nom est requis." })
    .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
      message: "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux.",
    }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  newPassword: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Vous devez autoriser le traitement des données.",
  }),
  newsletter: z.boolean(),
})

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

interface EditProfileInterface {
  user: UserPayload | null
  token: string | null
}

const EditProfileComponent = ({ user, token }: EditProfileInterface) => {
  const [showAnonymizeDialog, setShowAnonymizeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const navigate = useNavigate()
  const { loading, updateProfile } = useUpdateProfile(token)
  const { anonymizeUser, loadingAnonymize } = useAnonymizeUser(token)
  const { deleteAccount, loadingDeleteUser } = useDeleteUser(token)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user!.firstname,
      lastName: user!.lastname,
      email: user!.username,
      newPassword: "",
      consent: true,
      newsletter: false,
    },
  })

  async function onSubmit(data: UpdateProfileFormValues) {
    const validData = updateProfileSchema.parse(data)
    await updateProfile({
      firstName: validData.firstName,
      lastName: validData.lastName,
      email: validData?.email,
      password: validData?.newPassword,
    })
  }

  async function handleAnonymize() {
    await anonymizeUser()
    setShowAnonymizeDialog(false)
  }

  async function handleDelete() {
    await deleteAccount()
    setShowDeleteDialog(false)
  }

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

        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-7xl lg:px-8">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              className="text-white hover:text-leather-800 transition-all duration-300 hover:bg-leather-100 rounded-full"
              onClick={() => navigate("/profile")}
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Retour au profil</span>
              <span className="sm:hidden">Retour</span>
            </Button>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              Modifier votre profil
            </h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Personnalisez vos informations et gérez vos préférences de confidentialité
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Card className="rounded-3xl shadow-xl overflow-hidden border-leather-100">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Informations personnelles */}
                <div className="p-8 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-leather-800">Informations personnelles</h2>
                    <User className="h-6 w-6 text-leather-600" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-leather-700 font-medium">
                        Prénom
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                        <Input
                          id="firstName"
                          placeholder="Jean"
                          autoComplete="given-name"
                          {...register("firstName")}
                          className="pl-10 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-full bg-leather-50/50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                        />
                      </div>
                      {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-leather-700 font-medium">
                        Nom
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                        <Input
                          id="lastName"
                          autoComplete="family-name"
                          placeholder="Dupont"
                          {...register("lastName")}
                          className="pl-10 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-full bg-leather-50/50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                        />
                      </div>
                      {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="email" className="text-leather-700 font-medium">
                      Adresse e-mail
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                      <Input
                        id="email"
                        autoComplete="email"
                        type="email"
                        placeholder="votre@email.com"
                        {...register("email")}
                        className="pl-10 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-full bg-leather-50/50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                      />
                    </div>
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-leather-700 font-medium">
                      Nouveau mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                      <Input
                        id="newPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Laissez vide pour ne pas changer"
                        {...register("newPassword")}
                        className="pl-10 py-2.5 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-full bg-leather-50/50 text-leather-900 transition-all duration-300 hover:border-leather-400"
                      />
                    </div>
                    {errors.newPassword && <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>}
                  </div>
                </div>

                {/* Préférences de confidentialité */}
                <div className="p-8 bg-leather-50">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-leather-800">Confidentialité</h2>
                    <Shield className="h-6 w-6 text-leather-600" />
                  </div>

                  <p className="text-leather-600 mb-6">
                    Gérez vos préférences de confidentialité et le traitement de vos données.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                      <Label htmlFor="consent" className="text-leather-700 cursor-pointer">
                        Autoriser le traitement des données
                      </Label>
                      <Controller
                        control={control}
                        name="consent"
                        render={({ field }) => (
                          <Switch id="consent" checked={field.value} onCheckedChange={field.onChange} />
                        )}
                      />
                    </div>
                    {errors.consent && <p className="text-red-600 text-sm">{errors.consent.message}</p>}

                    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                      <Label htmlFor="newsletter" className="text-leather-700 cursor-pointer">
                        S'abonner à la newsletter
                      </Label>
                      <Controller
                        control={control}
                        name="newsletter"
                        render={({ field }) => (
                          <Switch id="newsletter" checked={field.value} onCheckedChange={field.onChange} />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions sur le compte */}
                <div className="p-8 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-leather-800">Actions sur le compte</h2>
                    <Settings className="h-6 w-6 text-leather-600" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Dialog open={showAnonymizeDialog} onOpenChange={setShowAnonymizeDialog}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full bg-leather-50 text-leather-700 border-leather-200 hover:bg-leather-100 hover:text-leather-800 py-2.5 rounded-full transition-all duration-300 hover:shadow-md"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Anonymiser mes données
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white rounded-3xl border-leather-200 shadow-xl max-w-md w-full">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-leather-800 flex items-center">
                            <Shield className="w-6 h-6 mr-2 text-leather-600" />
                            Anonymiser vos données ?
                          </DialogTitle>
                          <DialogDescription className="text-leather-600 mt-4">
                            Cette action remplacera toutes vos informations personnelles par des données anonymes.
                            <span className="block mt-2 font-semibold text-leather-700">
                              Cette action est irréversible.
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 p-4 bg-leather-50 rounded-xl">
                          <p className="text-leather-800 font-medium">Après l'anonymisation :</p>
                          <ul className="mt-2 space-y-2 text-leather-700">
                            <li className="flex items-center">
                              <User className="w-5 h-5 mr-2 text-leather-600" />
                              Votre nom sera remplacé
                            </li>
                            <li className="flex items-center">
                              <Mail className="w-5 h-5 mr-2 text-leather-600" />
                              Votre email sera masqué
                            </li>
                            <li className="flex items-center">
                              <Lock className="w-5 h-5 mr-2 text-leather-600" />
                              Vos données seront protégées
                            </li>
                          </ul>
                        </div>
                        <DialogFooter className="mt-6 space-x-4">
                          <Button
                            type="button"
                            onClick={() => setShowAnonymizeDialog(false)}
                            className="flex-1 bg-leather-100 text-leather-800 hover:bg-leather-200 transition-colors duration-300 rounded-full"
                          >
                            Annuler
                          </Button>
                          <Button
                            type="button"
                            disabled={loadingAnonymize}
                            onClick={() => handleAnonymize()}
                            className="flex-1 bg-leather-600 text-white hover:bg-leather-700 transition-colors duration-300 rounded-full"
                          >
                            {loadingAnonymize ? (
                              <>
                                <Icons.loader
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                                Modification en cours...
                              </>
                            ) : (
                              "Confirmer"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="destructive"
                          className="w-full py-2.5 rounded-full transition-all duration-300 hover:shadow-md"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer mon compte
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white rounded-3xl border-red-200 shadow-xl max-w-md w-full">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-red-800 flex items-center">
                            <Trash2 className="w-6 h-6 mr-2 text-red-600" />
                            Supprimer votre compte ?
                          </DialogTitle>
                          <DialogDescription className="text-leather-700 mt-4">
                            Cette action supprimera définitivement votre compte et toutes vos données associées.
                            <span className="block mt-2 font-semibold text-red-700">
                              Cette action est irréversible.
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 p-4 bg-red-50 rounded-xl">
                          <p className="text-red-800 font-medium">Conséquences de la suppression :</p>
                          <ul className="mt-2 space-y-2 text-red-700">
                            <li className="flex items-center">
                              <User className="w-5 h-5 mr-2 text-red-600" />
                              Perte de votre profil
                            </li>
                            <li className="flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-red-600" />
                              Historique effacé
                            </li>
                            <li className="flex items-center">
                              <Settings className="w-5 h-5 mr-2 text-red-600" />
                              Paramètres supprimés
                            </li>
                          </ul>
                        </div>
                        <DialogFooter className="mt-6 space-x-4">
                          <Button
                            type="button"
                            onClick={() => setShowDeleteDialog(false)}
                            className="flex-1 bg-leather-100 text-leather-800 hover:bg-leather-200 transition-colors duration-300 rounded-full"
                          >
                            Annuler
                          </Button>
                          <Button
                            type="button"
                            onClick={handleDelete}
                            disabled={loadingDeleteUser}
                            className="flex-1 bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 rounded-full"
                          >
                            {loadingDeleteUser ? (
                              <>
                                <Icons.loader
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                                Suppression en cours...
                              </>
                            ) : (
                              "Supprimer définitivement"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="p-8 bg-leather-50 border-t border-leather-100">
                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/profile")}
                      className="w-full sm:w-auto border-leather-300 text-leather-700 hover:bg-leather-100 hover:text-leather-800 py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-md"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto bg-leather-600 hover:bg-leather-700 text-white py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-leather-500"
                    >
                      {loading ? (
                        <>
                          <Icons.loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
                          Modification en cours...
                        </>
                      ) : (
                        "Enregistrer les modifications"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Information RGPD */}
          <div className="mt-8">
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-3xl">
              <div className="flex items-center space-x-3 text-yellow-800 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold">Information importante</h3>
              </div>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous avez le droit d'accéder à
                vos données, de les rectifier, de les effacer, de limiter leur traitement, de vous opposer à leur
                traitement et à la portabilité des données. Pour exercer ces droits ou pour toute question sur le
                traitement de vos données, vous pouvez contacter notre délégué à la protection des données à l'adresse :
                dpo@cesizen.fr
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfileComponent

