import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { Interaction } from "@/components/admin-dashboard/interactions/column";

export function useGetInteractions() {
    const [interactions, setInteractions] = useState<Array<Interaction>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const getInteractions = async () => {
            try {
                const { data } = await axios.get("http://cesizen-api.localhost/api/interactions", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(data);

                setInteractions(data);
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

    return { interactions, loading, setInteractions };
}
