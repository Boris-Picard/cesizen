import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";

export const exerciceCreateSchema = z.object({
    ex_nom: z.string().min(2, "Le nom de l'exercice est requis."),
    ex_inspiration: z.number().positive("La valeur doit être supérieure à 0"),
    ex_apnee: z.number().positive("La valeur doit être supérieure à 0"),
    ex_expiration: z.number().positive("La valeur doit être supérieure à 0"),
    ex_active: z.boolean(),
});

export interface ExerciceInterface {
    id: number;
    ex_nom: string;
    ex_inspiration: number;
    ex_apnee: number;
    ex_expiration: number;
    ex_active: boolean;
}

interface CreateExerciceInterface {
    validData: z.infer<typeof exerciceCreateSchema>;
    onExerciceAdded: (exercice: ExerciceInterface) => void;
    form: any;
}

export function useCreateExercices() {
    const [open, setOpen] = useState(false);
    const { token } = useAuth();

    const createExercice = async ({ validData, onExerciceAdded, form }: CreateExerciceInterface) => {
        try {
            const response = await axios.post(
                "http://cesizen-api.localhost/api/exercices",
                {
                    ex_nom: validData.ex_nom,
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
