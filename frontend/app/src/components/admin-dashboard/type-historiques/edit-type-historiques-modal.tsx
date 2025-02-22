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
import { TypeHistorique } from "./column";
import { typeHistoriqueCreateSchema } from "@/hooks/admin/type-historiques/useCreateTypeHistoriques";
import { usePatchTypeHistoriques } from "@/hooks/admin/type-historiques/usePatchTypeHistoriques";

interface EditTypeHistoriqueModalProps {
    typeHistorique: TypeHistorique;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof typeHistoriqueCreateSchema>) => void;
}

export default function EditTypeHistoriqueModal({ typeHistorique, open, onClose, onSave }: EditTypeHistoriqueModalProps) {
    const { updatedTypeHistorique } = usePatchTypeHistoriques();

    const form = useForm<z.infer<typeof typeHistoriqueCreateSchema>>({
        resolver: zodResolver(typeHistoriqueCreateSchema),
        defaultValues: {
            type_histo_libelle: typeHistorique.type_histo_libelle,
        },
    });

    useEffect(() => {
        form.reset({
            type_histo_libelle: typeHistorique.type_histo_libelle,
        });
    }, [typeHistorique, form]);

    async function onSubmit(values: z.infer<typeof typeHistoriqueCreateSchema>) {
        const validData = typeHistoriqueCreateSchema.parse(values);
        await updatedTypeHistorique({ validData, id: typeHistorique.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier le type d'historique</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez le libellé du type d'historique.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type_histo_libelle" className="text-sm font-medium text-leather-700">
                            Libellé
                        </Label>
                        <div className="relative">
                            <Icons.edit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                            <Input
                                id="type_histo_libelle"
                                {...form.register("type_histo_libelle")}
                                placeholder="Libellé du type d'historique"
                                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                            />
                        </div>
                        {form.formState.errors.type_histo_libelle && (
                            <p className="text-sm text-red-600">{form.formState.errors.type_histo_libelle.message}</p>
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
