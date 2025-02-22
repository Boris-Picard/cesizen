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
import { TypeInteraction } from "./columns";
import { Icons } from "@/components/ui/icons";
import { typeInteractionCreateSchema } from "@/hooks/admin/type-interactions/useCreateTypeInteractions";
import { usePatchTypeInteractions } from "@/hooks/admin/type-interactions/usePatchTypeInteractions";

interface EditTypeInteractionModalProps {
    typeInteraction: TypeInteraction;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof typeInteractionCreateSchema>) => void;
}

export default function EditTypeInteractionModal({ typeInteraction, open, onClose, onSave }: EditTypeInteractionModalProps) {
    const { updatedTypeInteraction } = usePatchTypeInteractions();

    const form = useForm<z.infer<typeof typeInteractionCreateSchema>>({
        resolver: zodResolver(typeInteractionCreateSchema),
        defaultValues: {
            type_inter_libelle: typeInteraction.type_inter_libelle,
        },
    });

    useEffect(() => {
        form.reset({
            type_inter_libelle: typeInteraction.type_inter_libelle,
        });
    }, [typeInteraction, form]);

    async function onSubmit(values: z.infer<typeof typeInteractionCreateSchema>) {
        const validData = typeInteractionCreateSchema.parse(values);
        await updatedTypeInteraction({ validData, id: typeInteraction.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier le type d'interaction</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez le libellé du type d'interaction.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type_inter_libelle" className="text-sm font-medium text-leather-700">
                            Libellé
                        </Label>
                        <div className="relative">
                            <Icons.edit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                            <Input
                                id="type_inter_libelle"
                                {...form.register("type_inter_libelle")}
                                placeholder="Libellé du type d'interaction"
                                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                            />
                        </div>
                        {form.formState.errors.type_inter_libelle && (
                            <p className="text-sm text-red-600">{form.formState.errors.type_inter_libelle.message}</p>
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
