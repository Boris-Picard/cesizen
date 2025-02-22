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
import { usePatchInformations } from "@/hooks/admin/informations/usePatchInformations";
import { Information } from "./column";
import { Icons } from "@/components/ui/icons";
import { informationCreateSchema } from "@/hooks/admin/informations/useCreateInformations";

interface EditInformationModalProps {
    information: Information;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof informationCreateSchema>) => void;
}

export default function EditInformationModal({ information, open, onClose, onSave }: EditInformationModalProps) {
    const { updatedInformation } = usePatchInformations();

    const form = useForm<z.infer<typeof informationCreateSchema>>({
        resolver: zodResolver(informationCreateSchema),
        defaultValues: {
            info_titre: information.info_titre,
            info_description: information.info_description,
            info_contenu: information.info_contenu,
            info_active: information.info_active,
            typeInformation: `/api/information/${information.typeInformation.id}`,
        },
    });

    useEffect(() => {
        form.reset({
            info_titre: information.info_titre,
            info_description: information.info_description,
            info_contenu: information.info_contenu,
            info_active: information.info_active,
            typeInformation: `/api/information/${information.typeInformation.id}`,
        });
    }, [information, form]);

    async function onSubmit(values: z.infer<typeof informationCreateSchema>) {
        const validData = informationCreateSchema.parse(values);
        await updatedInformation({ validData, id: information.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier l'information</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez les informations ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="info_titre" className="text-sm font-medium text-leather-700">
                            Titre
                        </Label>
                        <div className="relative">
                            <Icons.edit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                            <Input
                                id="info_titre"
                                {...form.register("info_titre")}
                                placeholder="Titre de l'information"
                                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                            />
                        </div>
                        {form.formState.errors.info_titre && (
                            <p className="text-sm text-red-600">{form.formState.errors.info_titre.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="info_description" className="text-sm font-medium text-leather-700">
                            Description
                        </Label>
                        <Input
                            id="info_description"
                            {...form.register("info_description")}
                            placeholder="Description"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.info_description && (
                            <p className="text-sm text-red-600">{form.formState.errors.info_description.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="info_contenu" className="text-sm font-medium text-leather-700">
                            Contenu
                        </Label>
                        <Input
                            id="info_contenu"
                            {...form.register("info_contenu")}
                            placeholder="Contenu"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.info_contenu && (
                            <p className="text-sm text-red-600">{form.formState.errors.info_contenu.message}</p>
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
