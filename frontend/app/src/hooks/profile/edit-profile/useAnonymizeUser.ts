import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/useToast";

export function useAnonymizeUser(token: string | null) {
    const { toast } = useToast();
    const [loadingAnonymize, setLoadingAnonymize] = useState<boolean>(false);

    const anonymizeUser = async () => {
        setLoadingAnonymize(true);
        try {
            const response = await axios.post(
                'http://cesizen-api.localhost/profile/anonymize',
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast({
                variant: "success",
                title: response.data.status,
                description: `Vos données ont bien été anonymisées et seront visibles à la prochaine connexion.`
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: "destructive",
                    title: error.response?.data?.error || "Une erreur est survenue",
                    description: error.response?.data?.error || error.message,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                });
            }
        } finally {
            setLoadingAnonymize(false);
        }
    };

    return { anonymizeUser, loadingAnonymize };
}
