import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";

interface userDeleteInterface {
    id: number;
    onClose: () => void;
    onDelete: (userId: number) => void;
}

export function useDeleteUsers() {
    const { token } = useAuth();

    async function handleDelete({ id, onDelete, onClose }: userDeleteInterface) {
        try {
            await axios.delete(`http://cesizen-api.localhost/api/utilisateurs/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            onDelete(id);
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                if (axios.isAxiosError(error)) {
                    toast({
                        variant: "destructive",
                        title: error.response?.data?.title ?? "Une erreur est survenue",
                        description: error.response?.data?.message,
                    })
                }
            } else {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                })
            }
        }
    }

    return { handleDelete };
}
