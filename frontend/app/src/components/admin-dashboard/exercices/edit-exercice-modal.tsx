import { Controller, useForm } from "react-hook-form";
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
import { usePatchExercices } from "@/hooks/admin/exercices/usePatchExercices";
import { ExerciceType } from "./column";
import { Icons } from "@/components/ui/icons";
import { Switch } from "@/components/ui/switch";
import { exerciceCreateSchema } from "@/hooks/admin/exercices/useCreateExercices";

interface EditExerciceModalProps {
    exercice: ExerciceType;
    open: boolean;
    onClose: () => void;
    onSave: (values: z.infer<typeof exerciceCreateSchema>) => void;
}

export default function EditExerciceModal({ exercice, open, onClose, onSave }: EditExerciceModalProps) {
    const { updatedExercice } = usePatchExercices();

    const form = useForm<z.infer<typeof exerciceCreateSchema>>({
        resolver: zodResolver(exerciceCreateSchema),
        defaultValues: {
            ex_nom: exercice.ex_nom,
            ex_description: exercice.ex_description,
            ex_difficulty: exercice.ex_difficulty,
            ex_duration: exercice.ex_duration,
            ex_benefits: exercice.ex_benefits,
            ex_inspiration: exercice.ex_inspiration,
            ex_apnee: exercice.ex_apnee,
            ex_expiration: exercice.ex_expiration,
            ex_active: exercice.ex_active,
        },
    });

    useEffect(() => {
        form.reset({
            ex_nom: exercice.ex_nom,
            ex_description: exercice.ex_description,
            ex_difficulty: exercice.ex_difficulty,
            ex_duration: exercice.ex_duration,
            ex_benefits: exercice.ex_benefits,
            ex_inspiration: exercice.ex_inspiration,
            ex_apnee: exercice.ex_apnee,
            ex_expiration: exercice.ex_expiration,
            ex_active: exercice.ex_active,
        });
    }, [exercice, form]);

    async function onSubmit(values: z.infer<typeof exerciceCreateSchema>) {
        const validData = exerciceCreateSchema.parse(values);
        await updatedExercice({ validData, id: exercice.id, onClose, form, onSave });
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Modifier l'exercice</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Modifiez les informations de l'exercice ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ex_nom" className="text-sm font-medium text-leather-700">
                            Nom de l'exercice
                        </Label>
                        <div className="relative">
                            <Icons.edit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400" />
                            <Input
                                id="ex_nom"
                                {...form.register("ex_nom")}
                                placeholder="Nom de l'exercice"
                                className="pl-10 py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                            />
                        </div>
                        {form.formState.errors.ex_nom && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_nom.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ex_description" className="text-sm font-medium text-leather-700">
                            Description
                        </Label>
                        <Input
                            id="ex_description"
                            {...form.register("ex_description")}
                            placeholder="Description de l'exercice"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.ex_description && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_description.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ex_difficulty" className="text-sm font-medium text-leather-700">
                            Difficulté
                        </Label>
                        <Input
                            id="ex_difficulty"
                            {...form.register("ex_difficulty")}
                            placeholder="Intermédiaire"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.ex_difficulty && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_difficulty.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ex_duration" className="text-sm font-medium text-leather-700">
                            Durée (m)
                        </Label>
                        <Input
                            id="ex_duration"
                            type="number"
                            {...form.register("ex_duration", { valueAsNumber: true })}
                            placeholder="10"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.ex_duration && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_duration.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ex_benefits" className="text-sm font-medium text-leather-700">
                            Bienfaits (séparés par des virgules)
                        </Label>
                        <Input
                            id="ex_benefits"
                            {...form.register("ex_benefits", {
                                setValueAs: (value: string) =>
                                    typeof value === "string"
                                        ? value.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
                                        : []
                            })}

                            placeholder="Régule le rythme cardiaque, Diminue l'anxiété, Améliore le sommeil"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.ex_benefits && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_benefits.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ex_inspiration" className="text-sm font-medium text-leather-700">
                            Inspiration (secondes)
                        </Label>
                        <Input
                            id="ex_inspiration"
                            type="number"
                            {...form.register("ex_inspiration", { valueAsNumber: true })}
                            placeholder="Inspiration"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.ex_inspiration && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_inspiration.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ex_apnee" className="text-sm font-medium text-leather-700">
                            Apnée (secondes)
                        </Label>
                        <Input
                            id="ex_apnee"
                            type="number"
                            {...form.register("ex_apnee", { valueAsNumber: true })}
                            placeholder="Apnée"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.ex_apnee && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_apnee.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ex_expiration" className="text-sm font-medium text-leather-700">
                            Expiration (secondes)
                        </Label>
                        <Input
                            id="ex_expiration"
                            type="number"
                            {...form.register("ex_expiration", { valueAsNumber: true })}
                            placeholder="Expiration"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
                        {form.formState.errors.ex_expiration && (
                            <p className="text-sm text-red-600">{form.formState.errors.ex_expiration.message}</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Controller
                            defaultValue={exercice.ex_active}
                            name={"ex_active"}
                            control={form.control}
                            render={({ field }) => <Switch id={"ex_active"} checked={field.value} onCheckedChange={field.onChange} />}
                        />
                        <Label htmlFor="ex_active" className="text-sm font-medium text-leather-700">
                            Exercice Actif
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
    );
}
