import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { ExerciceInterface } from "./useCreateExercices";

export const exerciceSchema = z.object({
    ex_nom: z.string().min(2, "Le nom de l'exercice est requis."),
    ex_inspiration: z.number().positive("La valeur doit être supérieure à 0"),
    ex_apnee: z.number().positive("La valeur doit être supérieure à 0"),
    ex_expiration: z.number().positive("La valeur doit être supérieure à 0"),
    ex_active: z.boolean(),
});

interface PatchExerciceInterface {
    validData: z.infer<typeof exerciceSchema>;
    id: number;
    onSave: (exercice: ExerciceInterface) => void;
    form: any;
    onClose: () => void;
}

export function usePatchExercices() {
    const { token } = useAuth();

    const updatedExercice = async ({ validData, id, onSave, form, onClose }: PatchExerciceInterface) => {
        try {
            const response = await axios.patch(
                `http://cesizen-api.localhost/api/exercices/${id}`,
                validData,
                {
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onSave(response.data);
            form.reset(response.data);
            onClose();
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

    return { updatedExercice };
}
