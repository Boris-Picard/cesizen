import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "./columns";
import { useGetRoles } from "@/hooks/admin/users/useGetRoles";
import { useCreateUsers, userCreateSchema } from "@/hooks/admin/users/useCreateUsers";



interface AddUserModalProps {
  onUserAdded: (user: User) => void;
}

export default function AddUserModal({ onUserAdded }: AddUserModalProps) {
  const { roles } = useGetRoles()
  const { createUser, open, setOpen } = useCreateUsers()

  const form = useForm<z.infer<typeof userCreateSchema>>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      ut_prenom: "",
      ut_nom: "",
      ut_mail: "",
      password: "",
      confirmPassword: "",
      role: "",
      active: true,
    },
  });

  async function onSubmit(values: z.infer<typeof userCreateSchema>) {
    const validData = userCreateSchema.parse(values);
    await createUser({ validData, onUserAdded, form })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-leather-600 hover:bg-leather-700 text-white" onClick={() => setOpen(true)}>
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
          {/* Les différents champs du formulaire */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ut_prenom" className="text-sm font-medium text-leather-700">
                Prénom
              </Label>
              <div className="relative">
                <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                <Input
                  id="ut_prenom"
                  {...form.register("ut_prenom")}
                  placeholder="Prénom"
                  className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                />
              </div>
              {form.formState.errors.ut_prenom && (
                <p className="text-sm text-red-600">{form.formState.errors.ut_prenom.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ut_nom" className="text-sm font-medium text-leather-700">
                Nom
              </Label>
              <div className="relative">
                <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                <Input
                  id="ut_nom"
                  {...form.register("ut_nom")}
                  placeholder="Nom"
                  className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                />
              </div>
              {form.formState.errors.ut_nom && (
                <p className="text-sm text-red-600">{form.formState.errors.ut_nom.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ut_mail" className="text-sm font-medium text-leather-700">
              Adresse e-mail
            </Label>
            <div className="relative">
              <Icons.mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
              <Input
                id="ut_mail"
                type="email"
                autoComplete="email"
                {...form.register("ut_mail")}
                placeholder="exemple@domaine.com"
                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
              />
            </div>
            {form.formState.errors.ut_mail && (
              <p className="text-sm text-red-600">{form.formState.errors.ut_mail.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="plainPassword" className="text-sm font-medium text-leather-700">
              Mot de passe
            </Label>
            <div className="relative">
              <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
              <Input
                id="plainPassword"
                type="password"
                autoComplete="new-password"
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
                autoComplete="new-password"
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
                    {roles.map(({ id, role_nom }) => (
                      <SelectItem key={id} value={role_nom}>
                        {role_nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.role && <p className="text-sm text-red-600">{form.formState.errors.role.message}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name="active"
              control={form.control}
              render={({ field }) => <Switch id="active" checked={field.value} onCheckedChange={field.onChange} />}
            />
            <Label htmlFor="active" className="text-sm font-medium text-leather-700">
              Compte actif
            </Label>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="text-leather-600 border-leather-300">
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
  );
}
