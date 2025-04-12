import { Role } from "@/components/admin-dashboard/users/columns";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/useToast";

export function useGetRoles() {
    const [roles, setRoles] = useState<Array<Role>>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const { token } = useAuth();

    useEffect(() => {
        const getRoles = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRoles(data);
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
            } finally {
                setLoading(false);
            }
        };
        getRoles();
    }, [token]);

    return { roles, loading, setRoles };
}
