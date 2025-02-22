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
import { Icons } from "@/components/ui/icons";
import { TypeInformation } from "./column";
import { usePatchTypeInformations } from "@/hooks/admin/type-informations/usePatchTypeInformations";
import { typeInformationCreateSchema } from "@/hooks/admin/type-informations/useCreateTypeInformations";

interface EditTypeInformationModalProps {
    typeInformation: TypeInformation;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof typeInformationCreateSchema>) => void;
}

export default function EditTypeInformationModal({ typeInformation, open, onClose, onSave }: EditTypeInformationModalProps) {
    const { updatedTypeInformation } = usePatchTypeInformations();

    const form = useForm<z.infer<typeof typeInformationCreateSchema>>({
        resolver: zodResolver(typeInformationCreateSchema),
        defaultValues: {
            type_info_nom: typeInformation.type_info_nom,
        },
    });

    useEffect(() => {
        form.reset({
            type_info_nom: typeInformation.type_info_nom,
        });
    }, [typeInformation, form]);

    async function onSubmit(values: z.infer<typeof typeInformationCreateSchema>) {
        const validData = typeInformationCreateSchema.parse(values);
        await updatedTypeInformation({ validData, id: typeInformation.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier le type</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez le nom du type d'information.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type_info_nom" className="text-sm font-medium text-leather-700">
                            Nom du type
                        </Label>
                        <div className="relative">
                            <Icons.edit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                            <Input
                                id="type_info_nom"
                                {...form.register("type_info_nom")}
                                placeholder="Nom du type d'information"
                                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                            />
                        </div>
                        {form.formState.errors.type_info_nom && (
                            <p className="text-sm text-red-600">{form.formState.errors.type_info_nom.message}</p>
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
