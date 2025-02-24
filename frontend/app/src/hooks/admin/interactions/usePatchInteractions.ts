import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { Interaction } from "@/components/admin-dashboard/interactions/column";

export interface PatchInteractionData {
    id: number | null;
    inter_date_de_debut?: string;
    inter_date_de_fin?: string;
    information?: string;
    utilisateur?: string;
    exercice?: string;
    typeInteraction?: string;
  }

export function usePatchInteractions() {
    const { token } = useAuth();

    const patchInteraction = async (validData: PatchInteractionData) => {
        try {
            const { id, ...patchData } = validData;
            const { data } = await axios.patch(
                `http://cesizen-api.localhost/api/interactions/${validData.id}`,
                patchData,
                {
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(data);
            
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
        }
    };

    return { patchInteraction };
}
