import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { TypeHistoriqueFormValues } from "./useCreateTypeHistoriques";
import { UseFormReturn } from "react-hook-form";

interface PatchTypeHistoriqueInterface {
    validData: TypeHistoriqueFormValues;
    id: number;
    onSave: (updatedData: TypeHistoriqueFormValues) => void;
    form: UseFormReturn<TypeHistoriqueFormValues>;
    onClose: () => void;
}

export function usePatchTypeHistoriques() {
    const { token } = useAuth();

    const updatedTypeHistorique = async ({
        validData,
        id,
        onSave,
        form,
        onClose,
    }: PatchTypeHistoriqueInterface) => {
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/type_historiques/${id}`,
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

    return { updatedTypeHistorique };
}
