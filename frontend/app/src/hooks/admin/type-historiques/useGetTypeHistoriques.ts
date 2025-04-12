import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { TypeHistorique } from "@/components/admin-dashboard/type-historiques/column";

export function useGetTypeHistoriques() {
    const [typeHistoriques, setTypeHistoriques] = useState<TypeHistorique[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchTypeHistoriques = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/type_historiques`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTypeHistoriques(data);
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

        fetchTypeHistoriques();
    }, [token]);

    return { typeHistoriques, loading, setTypeHistoriques };
}
