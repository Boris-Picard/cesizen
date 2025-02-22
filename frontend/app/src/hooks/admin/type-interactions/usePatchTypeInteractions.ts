import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { z } from "zod";
import { typeInteractionCreateSchema } from "./useCreateTypeInteractions";


interface PatchTypeInteractionInterface {
    validData: z.infer<typeof typeInteractionCreateSchema>;
    id: number;
    onSave: (updatedData: z.infer<typeof typeInteractionCreateSchema>) => void;
    form: any;
    onClose: () => void;
}

export function usePatchTypeInteractions() {
    const { token } = useAuth();

    const updatedTypeInteraction = async ({
        validData,
        id,
        onSave,
        form,
        onClose,
    }: PatchTypeInteractionInterface) => {
        try {
            const { data } = await axios.patch(
                `http://cesizen-api.localhost/api/type_interactions/${id}`,
                validData,
                {
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onSave(data);
            form.reset(data);
            onClose();
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

    return { updatedTypeInteraction };
}
