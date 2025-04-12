import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { InformationsFormValues } from "./useCreateInformations";
import { UseFormReturn } from "react-hook-form";

interface PatchInformationInterface {
    validData: InformationsFormValues;
    id: number;
    onSave: (information: InformationsFormValues) => void;
    form: UseFormReturn<InformationsFormValues>;
    onClose: () => void;
}

export function usePatchInformations() {
    const { token } = useAuth();

    const updatedInformation = async ({ validData, id, onSave, form, onClose }: PatchInformationInterface) => {
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/information/${id}`,
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

    return { updatedInformation };
}
