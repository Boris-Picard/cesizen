import { useForm, Controller } from "react-hook-form";
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
import { usePatchInformations } from "@/hooks/admin/informations/usePatchInformations";
import { Information } from "./column";
import Wysiwyg from "react-simple-wysiwyg";

import { informationCreateSchema } from "@/hooks/admin/informations/useCreateInformations";
import { Switch } from "@/components/ui/switch";
import { useGetTypeInformations } from "@/hooks/admin/useGetTypeInformations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditInformationModalProps {
    information: Information;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof informationCreateSchema>) => void;
}

export default function EditInformationModal({
    information,
    open,
    onClose,
    onSave,
}: EditInformationModalProps) {
    const { updatedInformation } = usePatchInformations();
    const { typeInformations } = useGetTypeInformations()

    const form = useForm<z.infer<typeof informationCreateSchema>>({
        resolver: zodResolver(informationCreateSchema),
        defaultValues: {
            info_titre: information.info_titre,
            info_description: information.info_description,
            info_contenu: information.info_contenu,
            info_active: information.info_active,
            typeInformation: information.typeInformation
                ? `/api/type_informations/${information.typeInformation.id}`
                : "",
        },
    });

    useEffect(() => {
        form.reset({
            info_titre: information.info_titre,
            info_description: information.info_description,
            info_contenu: information.info_contenu,
            info_active: information.info_active,
            typeInformation: information.typeInformation
                ? `/api/type_informations/${information.typeInformation.id}`
                : "",
        });
    }, [information, form]);

    async function onSubmit(values: z.infer<typeof informationCreateSchema>) {
        const validData = informationCreateSchema.parse(values);
        await updatedInformation({ validData, id: information.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier l'information</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez les informations ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="info_titre" className="text-sm font-medium text-leather-700">
                            Titre
                        </Label>
                        <Input
                            id="info_titre"
                            {...form.register("info_titre")}
                            placeholder="Titre de l'information"
                            className="w-full py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.info_titre && (
                            <p className="text-sm text-red-600">{form.formState.errors.info_titre.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="info_description" className="text-sm font-medium text-leather-700">
                            Description
                        </Label>
                        <Controller
                            control={form.control}
                            name="info_description"
                            render={({ field }) => (
                                <Wysiwyg
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Description de l'information"
                                />
                            )}
                        />
                        {form.formState.errors.info_description && (
                            <p className="text-sm text-red-600">{form.formState.errors.info_description.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="info_contenu" className="text-sm font-medium text-leather-700">
                            Contenu
                        </Label>
                        <Controller
                            control={form.control}
                            name="info_contenu"
                            render={({ field }) => (
                                <Wysiwyg
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Contenu de l'information"
                                />
                            )}
                        />
                        {form.formState.errors.info_contenu && (
                            <p className="text-sm text-red-600">{form.formState.errors.info_contenu.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="typeInformation" className="text-sm font-medium text-leather-700">
                            Type d'information
                        </Label>
                        <Controller
                            name="typeInformation"
                            control={form.control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-full rounded-full border-leather-300 focus:border-leather-500 focus:ring-leather-500">
                                        <SelectValue placeholder="Sélectionnez un type d'information" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {typeInformations.map(({ id, type_info_nom }) => (
                                            <SelectItem key={id} value={`/api/type_informations/${id}`}>
                                                {type_info_nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {form.formState.errors.typeInformation && (
                            <p className="text-sm text-red-600">{form.formState.errors.typeInformation.message}</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Controller
                            name="info_active"
                            control={form.control}
                            render={({ field }) => (
                                <Switch id="info_active" checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                        <Label htmlFor="info_active" className="text-sm font-medium text-leather-700">
                            Information actif
                        </Label>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="text-leather-600 border-leather-300">
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-leather-600 hover:bg-leather-700 text-white">
                            Enregistrer les modifications
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
