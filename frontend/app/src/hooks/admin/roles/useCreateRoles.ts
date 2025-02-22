import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";

export const roleCreateSchema = z.object({
    role_nom: z.string().min(2, "Le nom du rôle est requis."),
});

export interface RoleInterface {
    id: number,
    role_nom: string
}

interface CreateRoleInterface {
    validData: z.infer<typeof roleCreateSchema>;
    onRoleAdded: (role: RoleInterface) => void;
    form: any;
}

export function useCreateRoles() {
    const [open, setOpen] = useState(false);
    const { token } = useAuth();

    const createRole = async ({ validData, onRoleAdded, form }: CreateRoleInterface) => {
        try {
            const response = await axios.post(
                "http://cesizen-api.localhost/api/roles",
                {
                    role_nom: validData.role_nom,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onRoleAdded(response.data);
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

    return { createRole, open, setOpen };
}
