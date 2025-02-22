import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";

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
    ut_active: z.boolean(),
});

interface PatchUserParams {
    validData: z.infer<typeof userSchema>;
    id: number,
    onClose: () => void;
    form: any;
    onSave: (values: z.infer<typeof userSchema>) => void;
}

export function usePatchUsers() {
    const { token } = useAuth();

    const updatedUser = async ({ validData, id, onClose, form, onSave }: PatchUserParams) => {
        try {
            const { data } = await axios.patch(
                `http://cesizen-api.localhost/api/utilisateurs/${id}`,
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
