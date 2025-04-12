import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { TypeInformation } from "@/components/admin-dashboard/type-informations/column";

export function useGetTypeInformations() {
    const [typeInformations, setTypeInformations] = useState<TypeInformation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const getTypeInformations = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/type_informations`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const mappedData = data.map((typeInfo: TypeInformation) => ({
                    ...typeInfo,
                }));
                setTypeInformations(mappedData);
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

        getTypeInformations();
    }, [token]);

    return { typeInformations, loading, setTypeInformations };
}
