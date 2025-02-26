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
                    "http://cesizen-api.localhost/api/informations?in_active=true",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setInformations(data);
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

    return { informations, loading, setInformations };
}
