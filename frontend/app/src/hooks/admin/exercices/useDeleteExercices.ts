import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { joinUrl } from "@/services/api";

interface ExerciceDeleteInterface {
    id: number;
    onClose: () => void;
    onDelete: (exId: number) => void;
}

export function useDeleteExercices() {
    const { token } = useAuth();

    async function handleDelete({ id, onDelete, onClose }: ExerciceDeleteInterface) {
        try {
            await axios.delete(joinUrl(import.meta.env.VITE_API_URL, `/api/exercices/${id}`), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            onDelete(id);
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
    }

    return { handleDelete };
}
