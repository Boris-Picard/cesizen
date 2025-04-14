import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { TypeInteraction } from "@/components/admin-dashboard/type-interactions/columns";
import { UseFormReturn } from "react-hook-form";

export const typeInteractionCreateSchema = z.object({
    type_inter_libelle: z.enum(["Exercice", "Information"], {
        errorMap: () => ({ message: "Le type d'interaction doit être 'Exercice' ou 'Information'" }),
    }),
});

export type TypeInteractionFormValues = z.infer<typeof typeInteractionCreateSchema>;

interface CreateTypeInteractionInterface {
    validData: TypeInteractionFormValues;
    onTypeInteractionAdded: (typeInteraction: TypeInteraction) => void;
    form: UseFormReturn<TypeInteractionFormValues>;
}

export function useCreateTypeInteractions() {
    const [open, setOpen] = useState(false);
    const { token } = useAuth();

    const createTypeInteraction = async ({ validData, onTypeInteractionAdded, form }: CreateTypeInteractionInterface) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}api/type_interactions`,
                {
                    type_inter_libelle: validData.type_inter_libelle,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onTypeInteractionAdded(data);
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

    return { createTypeInteraction, open, setOpen };
}
