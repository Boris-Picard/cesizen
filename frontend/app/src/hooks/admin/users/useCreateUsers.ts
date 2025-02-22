import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { User } from "@/components/admin-dashboard/users/columns";
import { toast } from "@/hooks/useToast";

export const userCreateSchema = z
    .object({
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
        password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
        confirmPassword: z.string().min(8, "Confirmez votre mot de passe."),
        role: z.string().min(1, "Veuillez sélectionner un rôle."),
        active: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirmPassword"],
    });

interface CreateUserInterface {
    validData: z.infer<typeof userCreateSchema>;
    onUserAdded: (user: User) => void;
    form: any; 
}

export function useCreateUsers() {
    const [open, setOpen] = useState(false);
    const { token } = useAuth();

    const createUser = async ({ validData, onUserAdded, form }: CreateUserInterface) => {
        try {
            const response = await axios.post(
                "http://cesizen-api.localhost/api/admin/register-user",
                {
                    ut_prenom: validData.ut_prenom,
                    ut_nom: validData.ut_nom,
                    ut_mail: validData.ut_mail,
                    plainPassword: validData.password,
                    role: validData.role,
                    active: validData.active,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onUserAdded(response.data.data);
            form.reset();
            setOpen(false);
        } catch (error) {
            if (error instanceof Error) {
                if (axios.isAxiosError(error)) {
                    toast({
                        variant: "destructive",
                        title: error.response?.data?.title ?? "Une erreur est survenue",
                        description: error.response?.data?.message,
                    })
                }
            } else {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                })
            }
        }
    };

    return { createUser, open, setOpen };
}
