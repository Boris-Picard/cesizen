import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { joinUrl } from "@/services/api";

export interface PatchInteractionData {
    id: number | null;
    inter_date_de_fin: string;
}

export function usePatchInteractions() {
    const { token } = useAuth();

    const patchInteraction = async ({ id, inter_date_de_fin }: PatchInteractionData) => {
        try {
            const { data } = await axios.patch(
                joinUrl(import.meta.env.VITE_API_URL,`/api/interactions/${id}`),
                { inter_date_de_fin },
                {
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data
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
