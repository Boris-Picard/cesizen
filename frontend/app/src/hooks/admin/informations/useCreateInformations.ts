import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { Information } from "@/components/admin-dashboard/informations/column";

export const informationCreateSchema = z.object({
    info_titre: z.string().min(2, "Le titre est requis."),
    info_description: z.string().min(10, "La description doit comporter au moins 10 caractères."),
    info_contenu: z.string().min(10, "Le contenu doit comporter au moins 10 caractères."),
    info_active: z.boolean(),
    typeInformation: z.string().min(1, "Le type d'information est requis."),
});

interface CreateInformationInterface {
    validData: z.infer<typeof informationCreateSchema>;
    onInformationAdded: (information: Information) => void;
    form: any;
}

export function useCreateInformations() {
    const [open, setOpen] = useState(false);
    const { token } = useAuth();

    const createInformation = async ({ validData, onInformationAdded, form }: CreateInformationInterface) => {
        console.log(validData);
        
        try {
            const { data } = await axios.post(
                "http://cesizen-api.localhost/api/information",
                {
                    info_titre: validData.info_titre,
                    info_description: validData.info_description,
                    info_contenu: validData.info_contenu,
                    info_active: validData.info_active,
                    typeInformation: validData.typeInformation,
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
