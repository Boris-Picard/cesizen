import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { TypeHistorique } from "@/components/admin-dashboard/type-historiques/column";

export const typeHistoriqueCreateSchema = z.object({
    type_histo_libelle: z.string().min(1, "Le libellé est requis."),
});

interface CreateTypeHistoriqueInterface {
    validData: z.infer<typeof typeHistoriqueCreateSchema>;
    onTypeHistoriqueAdded: (typeHistorique: TypeHistorique) => void;
    form: any;
}

export function useCreateTypeHistoriques() {
    const [open, setOpen] = useState(false);
    const { token } = useAuth();

    const createTypeHistorique = async ({ validData, onTypeHistoriqueAdded, form }: CreateTypeHistoriqueInterface) => {
        try {
            const { data } = await axios.post(
                "http://cesizen-api.localhost/api/type_historiques",
                {
                    type_histo_libelle: validData.type_histo_libelle,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onTypeHistoriqueAdded(data);
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

    return { createTypeHistorique, open, setOpen };
}
