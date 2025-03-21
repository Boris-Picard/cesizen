import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { TypeInformationsFormValues } from "./useCreateTypeInformations";
import { UseFormReturn } from "react-hook-form";

interface PatchTypeInformationInterface {
    validData: TypeInformationsFormValues;
    id: number;
    onSave: (updatedData: TypeInformationsFormValues) => void;
    form: UseFormReturn<TypeInformationsFormValues>;
    onClose: () => void;
}

export function usePatchTypeInformations() {
    const { token } = useAuth();

    const updatedTypeInformation = async ({
        validData,
        id,
        onSave,
        form,
        onClose,
    }: PatchTypeInformationInterface) => {
        try {
            const { data } = await axios.patch(
                `http://cesizen-api.localhost/api/type_informations/${id}`,
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

    return { updatedTypeInformation };
}
