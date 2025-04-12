import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { Information } from "@/components/admin-dashboard/informations/column";
import { UseFormReturn } from "react-hook-form";

export const informationCreateSchema = z.object({
    info_titre: z.string().min(2, "Le titre est requis."),
    info_description: z.string().min(10, "La description doit comporter au moins 10 caractères."),
    info_contenu: z.string().min(10, "Le contenu doit comporter au moins 10 caractères."),
    info_active: z.boolean(),
    typeInformation: z.string().nonempty("Le type d'information est requis."),
});

export type InformationsFormValues = z.infer<typeof informationCreateSchema>;

interface CreateInformationInterface {
    validData: InformationsFormValues;
    onInformationAdded: (information: Information) => void;
    form: UseFormReturn<InformationsFormValues>;
}

export function useCreateInformations() {
    const [open, setOpen] = useState(false);
    const { token, user } = useAuth();

    const createInformation = async ({ validData, onInformationAdded, form }: CreateInformationInterface) => {
        
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/information`,
                {
                    info_titre: validData.info_titre,
                    info_description: validData.info_description,
                    info_contenu: validData.info_contenu,
                    info_active: validData.info_active,
                    typeInformation: validData.typeInformation,
                    createdBy: `/api/utilisateurs/${user?.id}`,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onInformationAdded(data);
            form.reset();
            setOpen(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
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

    return { createInformation, open, setOpen };
}
