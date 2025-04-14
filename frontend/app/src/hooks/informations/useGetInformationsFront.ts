import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { Information } from "@/components/admin-dashboard/informations/column";

export function useGetInformationsFront() {
    const [informations, setInformations] = useState<Information[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const getInformations = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}api/information?info_active=true`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const sortedData = data.sort(
                    (a: Information, b: Information) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setInformations(sortedData);
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

    return { informations, loading };
}
