import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "./columns"
import { useEffect } from "react"
import { usePatchUsers, userSchema } from "@/hooks/admin/users/usePatchUsers"
import { useGetRoles } from "@/hooks/admin/users/useGetRoles"

interface EditUserModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof userSchema>) => void;
}

export default function EditUserModal({ user, open, onClose, onSave }: EditUserModalProps) {
    const { roles } = useGetRoles()
    const { updatedUser } = usePatchUsers()


    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            ut_prenom: user.ut_prenom,
            ut_nom: user.ut_nom,
            ut_mail: user.ut_mail,
            role: `/api/roles/${user.role.id}`,
            ut_active: user.ut_active,
        },
    })

    useEffect(() => {
        form.reset({
            ut_prenom: user.ut_prenom,
            ut_nom: user.ut_nom,
            ut_mail: user.ut_mail,
            role: `/api/roles/${user.role.id}`,
            ut_active: user.ut_active,
        });
    }, [user, form]);


    async function onSubmit(values: z.infer<typeof userSchema>) {
        const validData = userSchema.parse(values);
        await updatedUser({ validData, id: user.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier l'Utilisateur</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez les informations de l'utilisateur ci-dessous.
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
                            <Label htmlFor="lastName" className="text-sm font-medium text-leather-700">
                                Nom
                            </Label>
                            <div className="relative">
                                <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                                <Input
                                    id="lastName"
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
                        <Label htmlFor="email" className="text-sm font-medium text-leather-700">
                            Adresse e-mail
                        </Label>
                        <div className="relative">
                            <Icons.mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                            <Input
                                id="email"
                                type="email"
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
                        <Label htmlFor="role" className="text-sm font-medium text-leather-700">
                            Rôle
                        </Label>
                        <Controller
                            defaultValue={`/api/roles/${user.role.id}`}
                            name="role"
                            control={form.control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={`/api/roles/${user.role.id}`}>
                                    <SelectTrigger className="w-full rounded-full border-leather-300 focus:border-leather-500 focus:ring-leather-500">
                                        <SelectValue placeholder="Sélectionnez un rôle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles?.map(({ id, role_nom }) => (
                                            <SelectItem key={id} value={`/api/roles/${id}`}>{role_nom}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {form.formState.errors.role && <p className="text-sm text-red-600">{form.formState.errors.role.message}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Controller
                            defaultValue={user.ut_active}
                            name={"ut_active"}
                            control={form.control}
                            render={({ field }) => <Switch id={"ut_active"} checked={field.value} onCheckedChange={field.onChange} />}
                        />
                        <Label htmlFor="ut_active" className="text-sm font-medium text-leather-700">
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
                            Enregistrer les modifications
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

