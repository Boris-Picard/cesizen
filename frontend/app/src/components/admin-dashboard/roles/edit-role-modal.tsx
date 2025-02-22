import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { usePatchRoles, roleSchema } from "@/hooks/admin/roles/usePatchRoles";
import { Role } from "./columns";
import { Icons } from "@/components/ui/icons";

interface EditRoleModalProps {
    role: Role;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof roleSchema>) => void;
}

export default function EditRoleModal({ role, open, onClose, onSave }: EditRoleModalProps) {
    const { updatedRole } = usePatchRoles();

    const form = useForm<z.infer<typeof roleSchema>>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            role_nom: role.role_nom,
        },
    });

    useEffect(() => {
        form.reset({
            role_nom: role.role_nom,
        });
    }, [role, form]);

    async function onSubmit(values: z.infer<typeof roleSchema>) {
        const validData = roleSchema.parse(values);
        await updatedRole({ validData, id: role.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier le Rôle</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez les informations du rôle ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="role_nom" className="text-sm font-medium text-leather-700">
                            Nom du rôle
                        </Label>
                        <div className="relative">
                            <Icons.userCog className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                            <Input
                                id="role_nom"
                                {...form.register("role_nom")}
                                placeholder="Nom du rôle"
                                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                            />
                        </div>
                        {form.formState.errors.role_nom && (
                            <p className="text-sm text-red-600">{form.formState.errors.role_nom.message}</p>
                        )}
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
    );
}
