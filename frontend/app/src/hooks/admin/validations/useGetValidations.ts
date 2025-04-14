import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { ValidationType } from "@/components/admin-dashboard/validations/column";
import { joinUrl } from "@/services/api";

export function useGetValidations() {
    const [validations, setValidations] = useState<ValidationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const getValidations = async () => {
            try {
                const { data } = await axios.get(joinUrl(import.meta.env.VITE_API_URL,'/api/validations'), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setValidations(data);
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

        getValidations();
    }, [token]);

    return { validations, loading, setValidations };
}
