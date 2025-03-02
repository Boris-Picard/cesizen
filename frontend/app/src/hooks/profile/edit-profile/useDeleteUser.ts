import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/context/AuthContext";

export function useDeleteUser(token: string | null) {
    const { toast } = useToast();
    const [loadingDeleteUser, setLoadingDeleteUser] = useState<boolean>(false);
    const { logout } = useAuth()

    const deleteAccount = async () => {
        setLoadingDeleteUser(true);
        try {
            const response = await axios.delete(
                'http://cesizen-api.localhost/profile/delete',
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast({
                variant: "success",
                title: response.data.status,
            });
            logout()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: "destructive",
                    title: error.response?.data?.error || "Une erreur est survenue",
                    description: error.response?.data?.error || error.message,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                });
            }
        } finally {
            setLoadingDeleteUser(false);
        }
    };

    return { deleteAccount, loadingDeleteUser };
}
