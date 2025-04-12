import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { Information } from "@/components/admin-dashboard/informations/column";

export function useGetInformations() {
    const [informations, setInformations] = useState<Information[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalInformations, setTotalInformations] = useState<number>(0)
    const [informationsActive, setInformationsActive] = useState<Information[] | null>([])
    const { token } = useAuth();

    useEffect(() => {
        const getInformations = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/information`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const totalActiveInformations = data.filter((article: Information) => article.info_active)
                setInformationsActive(totalActiveInformations)
                setInformations(data);
                setTotalInformations(totalActiveInformations.length)
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
        getInformations();
    }, [token]);

    return { informations, loading, setInformations, totalInformations, informationsActive };
}
