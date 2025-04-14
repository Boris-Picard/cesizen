import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { joinUrl } from "@/services/api";

interface InformationDeleteInterface {
    id: number;
    onClose: () => void;
    onDelete: (infoId: number) => void;
}

export function useDeleteInformations() {
    const { token } = useAuth();

    async function handleDelete({ id, onDelete, onClose }: InformationDeleteInterface) {
        try {
            await axios.delete(joinUrl(import.meta.env.VITE_API_URL,`/api/information/${id}`), {
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
