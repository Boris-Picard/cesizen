"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const userSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
  confirmPassword: z.string().min(8, "Confirmez votre mot de passe."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
})

type UserFormValues = z.infer<typeof userSchema>

export default function AddUserModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: UserFormValues) {
    console.log("Utilisateur ajouté :", values)
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors">
          Ajouter un Utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-10 bg-white rounded-lg shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-bold text-green-800">
            Ajouter un Utilisateur
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Remplissez les informations ci-dessous pour créer un nouveau compte utilisateur.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="firstName" className="block text-sm font-medium text-green-700">
              Prénom
            </Label>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="Votre prénom"
              className="mt-2 block w-full rounded-md border border-green-200 p-3"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName" className="block text-sm font-medium text-green-700">
              Nom
            </Label>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Votre nom"
              className="mt-2 block w-full rounded-md border border-green-200 p-3"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-green-700">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="exemple@domaine.com"
              className="mt-2 block w-full rounded-md border border-green-200 p-3"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-green-700">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Votre mot de passe"
              className="mt-2 block w-full rounded-md border border-green-200 p-3"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-green-700">
              Confirmez le mot de passe
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirmez votre mot de passe"
              className="mt-2 block w-full rounded-md border border-green-200 p-3"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          <DialogFooter className="flex justify-end space-x-4 pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="text-green-600">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
