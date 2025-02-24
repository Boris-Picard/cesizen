import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";

interface interactionInterface {
    inter_date_de_debut: string;
    inter_date_de_fin?: string;
    information?: string;
    exercice?: string;
    utilisateur: string;
    typeInteraction: string;
}

export function useCreateInteraction() {
    const { token } = useAuth();

    const createInteraction = async (interactionData: interactionInterface) => {
        try {
            const { data } = await axios.post(
                "http://cesizen-api.localhost/api/interactions",
                interactionData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(data);
            
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
        }
    };

    return { createInteraction };
}
