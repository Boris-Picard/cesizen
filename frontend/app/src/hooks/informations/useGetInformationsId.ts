import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { Information } from "@/components/admin-dashboard/informations/column";

export function useGetInformationsId(id: string | undefined) {
    const [information, setInformation] = useState<Information | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchInformation = async () => {
            try {
                const { data } = await axios.get(
                    `http://cesizen-api.localhost/api/informations/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (data.info_active) {
                    setInformation(data);
                } else {
                    setInformation(null);
                }
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

        if (id) {
            fetchInformation();
        }
    }, [id, token]);

    return { information, loading, setInformation };
}
