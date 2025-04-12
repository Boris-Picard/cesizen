import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";

interface DeleteTypeInteractionInterface {
    id: number;
    onDelete: (id: number) => void;
    onClose: () => void;
}

export function useDeleteTypeInteractions() {
    const { token } = useAuth();

    const handleDelete = async ({ id, onDelete, onClose }: DeleteTypeInteractionInterface) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/type_interactions/${id}`, {
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
    };

    return { handleDelete };
}
