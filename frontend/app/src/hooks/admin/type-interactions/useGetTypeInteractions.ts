import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { TypeInteraction } from "@/components/admin-dashboard/type-interactions/columns";
import { joinUrl } from "@/services/api";

export function useGetTypeInteractions() {
    const [typeInteractions, setTypeInteractions] = useState<TypeInteraction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchTypeInteractions = async () => {
            try {
                const { data } = await axios.get(joinUrl(import.meta.env.VITE_API_URL,'/api/type_interactions'), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTypeInteractions(data);
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
            } finally {
                setLoading(false);
            }
        };

        fetchTypeInteractions();
    }, [token]);

    return { typeInteractions, loading, setTypeInteractions };
}
