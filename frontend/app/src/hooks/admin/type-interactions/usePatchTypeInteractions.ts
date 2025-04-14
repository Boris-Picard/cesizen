import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { TypeInteractionFormValues } from "./useCreateTypeInteractions";
import { UseFormReturn } from "react-hook-form";


interface PatchTypeInteractionInterface {
    validData: TypeInteractionFormValues;
    id: number;
    onSave: (updatedData: TypeInteractionFormValues) => void;
    form: UseFormReturn<TypeInteractionFormValues>;
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
                `${import.meta.env.VITE_API_URL}api/type_interactions/${id}`,
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
