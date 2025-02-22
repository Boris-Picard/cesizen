import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { TypeInformation } from "@/components/admin-dashboard/type-informations/column";

export const typeInformationCreateSchema = z.object({
  type_info_nom: z.string().min(3, "Le nom du type est requis.").max(100, "Le nom du type est trop long"),
});

interface CreateTypeInformationInterface {
  validData: z.infer<typeof typeInformationCreateSchema>;
  onTypeInformationAdded: (typeInfo: TypeInformation) => void;
  form: any;
}

export function useCreateTypeInformations() {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const createTypeInformation = async ({ validData, onTypeInformationAdded, form }: CreateTypeInformationInterface) => {
    try {
      const { data } = await axios.post(
        "http://cesizen-api.localhost/api/type_informations",
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
