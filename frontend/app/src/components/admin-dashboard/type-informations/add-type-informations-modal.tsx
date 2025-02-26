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
import { typeInformationCreateSchema, useCreateTypeInformations } from "@/hooks/admin/type-informations/useCreateTypeInformations";
import { TypeInformation } from "./column";

interface AddTypeInformationModalProps {
    onTypeInformationAdded: (typeInfo: TypeInformation) => void;
}

export default function AddTypeInformationModal({ onTypeInformationAdded }: AddTypeInformationModalProps) {
    const { createTypeInformation, open, setOpen } = useCreateTypeInformations();

    const form = useForm<z.infer<typeof typeInformationCreateSchema>>({
        resolver: zodResolver(typeInformationCreateSchema),
        defaultValues: {
            type_info_nom: "Santé mentale",
        },
    });

    async function onSubmit(values: z.infer<typeof typeInformationCreateSchema>) {
        const validData = typeInformationCreateSchema.parse(values);
        await createTypeInformation({ validData, onTypeInformationAdded, form });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-leather-600 hover:bg-leather-700 text-white" onClick={() => setOpen(true)}>
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Ajouter un type d'information
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Ajouter un type d'information</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Remplissez les informations ci-dessous pour créer un nouveau type d'information.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type_info_nom" className="text-sm font-medium text-leather-700">
                            Nom du type. (Santé mentale, Gestion du stress, Exercices de respiration)
                        </Label>
                        <Input
                            id="type_info_nom"
                            {...form.register("type_info_nom")}
                            placeholder="Santé mentale, Gestion du stress, Exercices de respiration"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
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
                            Ajouter le type
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
