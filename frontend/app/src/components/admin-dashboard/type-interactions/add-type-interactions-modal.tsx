import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { TypeInteraction } from "./columns";
import { typeInteractionCreateSchema, useCreateTypeInteractions } from "@/hooks/admin/type-interactions/useCreateTypeInteractions";

interface AddTypeInteractionModalProps {
    onTypeInteractionAdded: (typeInteraction: TypeInteraction) => void;
}

export default function AddTypeInteractionModal({ onTypeInteractionAdded }: AddTypeInteractionModalProps) {
    const { createTypeInteraction, open, setOpen } = useCreateTypeInteractions();

    const form = useForm<z.infer<typeof typeInteractionCreateSchema>>({
        resolver: zodResolver(typeInteractionCreateSchema),
        defaultValues: {
            type_inter_libelle: "",
        },
    });

    async function onSubmit(values: z.infer<typeof typeInteractionCreateSchema>) {
        const validData = typeInteractionCreateSchema.parse(values);
        await createTypeInteraction({ validData, onTypeInteractionAdded, form });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-leather-600 hover:bg-leather-700 text-white" onClick={() => setOpen(true)}>
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Ajouter un type d'interaction
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Ajouter un type d'interaction</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Remplissez les informations ci-dessous pour créer un nouveau type d'interaction.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type_inter_libelle" className="text-sm font-medium text-leather-700">
                            Libellé du type
                        </Label>
                        <Input
                            id="type_inter_libelle"
                            {...form.register("type_inter_libelle")}
                            placeholder="Libellé du type d'interaction"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
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
                            Ajouter
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
