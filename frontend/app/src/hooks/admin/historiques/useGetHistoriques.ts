import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { HistoriqueType } from "@/components/admin-dashboard/historiques/column";

export function useGetHistoriques() {
    const [historiques, setHistoriques] = useState<HistoriqueType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const getHistoriques = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/historiques`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHistoriques(data);
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

        getHistoriques();
    }, [token]);

    return { historiques, loading, setHistoriques };
}
