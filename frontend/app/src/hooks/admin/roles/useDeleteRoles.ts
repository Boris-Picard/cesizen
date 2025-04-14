import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";

interface roleDeleteInterface {
    id: number;
    onClose: () => void;
    onDelete: (roleId: number) => void;
}

export function useDeleteRoles() {
    const { token } = useAuth();
    
    async function handleDelete({ id, onDelete, onClose }: roleDeleteInterface) {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}api/roles/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            onDelete(id);
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                
                if (axios.isAxiosError(error)) {
                    toast({
                        variant: "destructive",
                        title: error.response?.data?.title ?? "Une erreur est survenue",
                        description: error.response?.data?.message,
                    });
                }
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
