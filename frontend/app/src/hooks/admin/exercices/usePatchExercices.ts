import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { ExerciceType } from "@/components/admin-dashboard/exercices/column";
import { ExerciceFormValues } from "./useCreateExercices";
import { UseFormReturn } from "react-hook-form";

interface PatchExerciceInterface {
    validData: ExerciceFormValues;
    id: number;
    onSave: (exercice: ExerciceType) => void;
    form: UseFormReturn<ExerciceFormValues>;
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
