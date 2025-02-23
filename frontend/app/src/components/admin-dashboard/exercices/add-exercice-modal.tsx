import { Controller, useForm } from "react-hook-form";
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
import { useCreateExercices, exerciceCreateSchema } from "@/hooks/admin/exercices/useCreateExercices";
import { Switch } from "@/components/ui/switch";
import { ExerciceType } from "./column";

interface AddExerciceModalProps {
    onExerciceAdded: (exercice: ExerciceType) => void;
}

export default function AddExerciceModal({ onExerciceAdded }: AddExerciceModalProps) {
    const { createExercice, open, setOpen } = useCreateExercices();

    const form = useForm<z.infer<typeof exerciceCreateSchema>>({
        resolver: zodResolver(exerciceCreateSchema),
        defaultValues: {
            ex_nom: "",
            ex_description: "",
            ex_difficulty: "",
            ex_duration: 1,
            ex_benefits: [],
            ex_inspiration: 1,
            ex_apnee: 1,
            ex_expiration: 1,
            ex_active: false,
        },
    });

    async function onSubmit(values: z.infer<typeof exerciceCreateSchema>) {
        const validData = exerciceCreateSchema.parse(values);
        await createExercice({ validData, onExerciceAdded, form });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-leather-600 hover:bg-leather-700 text-white"
                    onClick={() => setOpen(true)}
                >
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Ajouter un exercice
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Ajouter un exercice</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Remplissez les informations ci-dessous pour créer un nouvel exercice.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ex_nom" className="text-sm font-medium text-leather-700">
                            Nom de l'exercice
                        </Label>
                        <Input
                            id="ex_nom"
                            {...form.register("ex_nom")}
                            placeholder="Nom de l'exercice"
                            className="py-3 border-leather-300 focus:border-leather-500 focus:ring-leather-500 rounded-full text-sm bg-leather-50 text-leather-900"
                        />
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
                            name="ex_active"
                            control={form.control}
                            render={({ field }) => <Switch id="active" checked={field.value} onCheckedChange={field.onChange} />}
                        />
                        <Label htmlFor="active" className="text-sm font-medium text-leather-700">
                            Exercice actif
                        </Label>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="text-leather-600 border-leather-300">
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-leather-600 hover:bg-leather-700 text-white ml-2">
                            Ajouter l'exercice
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
