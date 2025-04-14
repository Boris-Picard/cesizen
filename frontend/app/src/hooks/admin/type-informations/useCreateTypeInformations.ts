import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { TypeInformation } from "@/components/admin-dashboard/type-informations/column";
import { UseFormReturn } from "react-hook-form";
import { joinUrl } from "@/services/api";

export const typeInformationCreateSchema = z.object({
  type_info_nom: z.enum(["Santé mentale", "Gestion du stress", "Exercices de relaxation"], {
    errorMap: () => ({ message: "Le type d'information doit être 'Santé mentale', 'Gestion du stress' ou 'Exercices de relaxation'" }),
  }),
});

export type TypeInformationsFormValues = z.infer<typeof typeInformationCreateSchema>;

interface CreateTypeInformationInterface {
  validData: TypeInformationsFormValues;
  onTypeInformationAdded: (typeInfo: TypeInformation) => void;
  form: UseFormReturn<TypeInformationsFormValues>;
}

export function useCreateTypeInformations() {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const createTypeInformation = async ({ validData, onTypeInformationAdded, form }: CreateTypeInformationInterface) => {
    try {
      const { data } = await axios.post(
        joinUrl(import.meta.env.VITE_API_URL,'/api/type_informations'),
        {
          type_info_nom: validData.type_info_nom,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTypeInformationAdded(data);
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

  return { createTypeInformation, open, setOpen };
}
