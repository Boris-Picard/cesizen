import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { Interaction } from "@/components/admin-dashboard/interactions/column";

export function useGetInteractions() {
    const [interactions, setInteractions] = useState<Array<Interaction>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [getTotalInteractions, setGetTotalInteractions] = useState<number>(0)
    const { token } = useAuth();

    useEffect(() => {
        const getInteractions = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/interactions`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInteractions(data);
                setGetTotalInteractions(data.length)
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
        getInteractions();
    }, [token]);

    const oneDay = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    const newInteractions = interactions.filter((interaction) => new Date(interaction.inter_date_de_debut) > oneDay);
    const totalInteractionsDay = newInteractions.length
    const newInteractionsPercentage = interactions.length > 0 ? (newInteractions.length / interactions.length) * 100 : 0;

    return { interactions, loading, setInteractions, getTotalInteractions, newInteractionsPercentage, totalInteractionsDay };
}
