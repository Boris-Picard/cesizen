import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { UserFormValues } from "./useCreateUsers";
import { UseFormReturn } from "react-hook-form";

export const userSchema = z.object({
  ut_prenom: z
    .string()
    .min(2, "Le prénom est requis.")
    .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
      message: "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux.",
    }),
  ut_nom: z
    .string()
    .min(2, "Le nom est requis.")
    .regex(/^(?!.*\d)[\p{L}\s]+$/u, {
      message: "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux.",
    }),
  ut_mail: z.string().email("Veuillez entrer une adresse e-mail valide."),
  role: z.string().min(1, "Veuillez sélectionner un rôle."),
  active: z.boolean(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});


interface PatchUserParams {
    validData: UserFormValues;
    id: number,
    onClose: () => void;
    form: UseFormReturn<UserFormValues>;
    onSave: (values: UserFormValues) => void;
}

export function usePatchUsers() {
    const { token } = useAuth();

    const updatedUser = async ({ validData, id, onClose, form, onSave }: PatchUserParams) => {
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/utilisateurs/${id}`,
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
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        }
    };

    return { updatedUser };
}
