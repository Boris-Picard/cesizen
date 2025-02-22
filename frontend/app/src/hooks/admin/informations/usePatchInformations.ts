import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { informationCreateSchema } from "./useCreateInformations";

interface PatchInformationInterface {
    validData: z.infer<typeof informationCreateSchema>;
    id: number;
    onSave: (information: z.infer<typeof informationCreateSchema>) => void;
    form: any;
    onClose: () => void;
}

export function usePatchInformations() {
    const { token } = useAuth();

    const updatedInformation = async ({ validData, id, onSave, form, onClose }: PatchInformationInterface) => {
        try {
            const { data } = await axios.patch(
                `http://cesizen-api.localhost/api/information/${id}`,
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
