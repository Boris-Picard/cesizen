import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { ExerciceType } from "@/components/admin-dashboard/exercices/column";

export const exerciceCreateSchema = z.object({
    ex_nom: z.string().min(2, "Le nom de l'exercice est requis.").max(255, "Le nom doit comporter 200 caractères maximum"),
    ex_description: z.string().min(10, "La description doit comporter au moins 10 caractères.").max(255, "La description doit comporter 255 caractères maximum"),
    ex_difficulty: z.string().nonempty("La difficulté est requise."),
    ex_duration: z.number().positive("La valeur doit être supérieure à 0"),
    ex_benefits: z.array(z.string()).optional(),
    ex_inspiration: z.number().positive("La valeur doit être supérieure à 0"),
    ex_apnee: z.number().positive("La valeur doit être supérieure à 0"),
    ex_expiration: z.number().positive("La valeur doit être supérieure à 0"),
    ex_active: z.boolean(),
});


interface Exercice {
    validData: z.infer<typeof exerciceCreateSchema>;
    onExerciceAdded: (exercice: ExerciceType) => void;
    form: any;
}

export function useCreateExercices() {
    const [open, setOpen] = useState(false);
    const { token } = useAuth();

    const createExercice = async ({ validData, onExerciceAdded, form }: Exercice) => {
        console.log(validData);

        try {
            const response = await axios.post(
                "http://cesizen-api.localhost/api/exercices",
                {
                    ex_nom: validData.ex_nom,
                    ex_description: validData.ex_description,
                    ex_difficulty: validData.ex_difficulty,
                    ex_duration: validData.ex_duration,
                    ex_benefits: validData.ex_benefits,
                    ex_inspiration: validData.ex_inspiration,
                    ex_apnee: validData.ex_apnee,
                    ex_expiration: validData.ex_expiration,
                    ex_active: validData.ex_active,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onExerciceAdded(response.data);
            form.reset();
            setOpen(false);
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                toast({
                    variant: "destructive",
                    title: error.response?.data?.title ?? "Une erreur est survenue",
                    description: error.response?.data?.message,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                });
            }
        }
    };

    return { createExercice, open, setOpen };
}
