import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { Icons } from "@/components/ui/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const userSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom est requis.")
      .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
        message: "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux.",
      }),
    lastName: z
      .string()
      .min(2, "Le nom est requis.")
      .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
        message: "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux.",
      }),
    email: z.string().email("Veuillez entrer une adresse e-mail valide."),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
    confirmPassword: z.string().min(8, "Confirmez votre mot de passe."),
    role: z.string().min(1, "Veuillez sélectionner un rôle."),
    isActive: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })

type UserFormValues = z.infer<typeof userSchema>

export default function AddUserModal() {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      isActive: true,
    },
  })

  async function onSubmit(values: UserFormValues) {
    console.log("Utilisateur ajouté :", values)
    form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-leather-600 hover:bg-leather-700 text-white">
          <Icons.userplus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-leather-800">Ajouter un Utilisateur</DialogTitle>
          <DialogDescription className="text-leather-600">
            Remplissez les informations ci-dessous pour créer un nouveau compte utilisateur.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-leather-700">
                Prénom
              </Label>
              <div className="relative">
                <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  placeholder="Prénom"
                  className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                />
              </div>
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-600">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-leather-700">
                Nom
              </Label>
              <div className="relative">
                <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  placeholder="Nom"
                  className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                />
              </div>
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-600">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-leather-700">
              Adresse e-mail
            </Label>
            <div className="relative">
              <Icons.mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="exemple@domaine.com"
                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-leather-700">
              Mot de passe
            </Label>
            <div className="relative">
              <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder="Mot de passe"
                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
              />
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-leather-700">
              Confirmez le mot de passe
            </Label>
            <div className="relative">
              <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
              <Input
                id="confirmPassword"
                type="password"
                {...form.register("confirmPassword")}
                placeholder="Confirmez le mot de passe"
                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
              />
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-leather-700">
              Rôle
            </Label>
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full rounded-full border-leather-300 focus:border-leather-500 focus:ring-leather-500">
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="moderator">Modérateur</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.role && <p className="text-sm text-red-600">{form.formState.errors.role.message}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="isActive"
              control={form.control}
              render={({ field }) => <Switch id="isActive" checked={field.value} onCheckedChange={field.onChange} />}
            />
            <Label htmlFor="isActive" className="text-sm font-medium text-leather-700">
              Compte actif
            </Label>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="text-leather-600 border-leather-300"
              >
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-leather-600 hover:bg-leather-700 text-white ml-2">
              Ajouter l'utilisateur
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

