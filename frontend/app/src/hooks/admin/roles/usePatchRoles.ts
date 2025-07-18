import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { Role } from "@/components/admin-dashboard/roles/columns";
import { RolesFormValues } from "./useCreateRoles";
import { UseFormReturn } from "react-hook-form";
import { joinUrl } from "@/services/api";

export const roleSchema = z.object({
    role_nom: z.string().min(4, "Le nom du rôle est requis."),
});

interface PatchRoleInterface {
    validData: RolesFormValues;
    id: number;
    onSave: (role: Role) => void;
    form: UseFormReturn<RolesFormValues>;
    onClose: () => void;
}

export function usePatchRoles() {
    const { token } = useAuth();

    const updatedRole = async ({ validData, id, onSave, form, onClose }: PatchRoleInterface) => {
        try {
            const response = await axios.patch(
                joinUrl(import.meta.env.VITE_API_URL, `/api/roles/${id}`),
                validData,
                {
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onSave(response.data);
            form.reset(response.data);
            onClose();
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

    return { updatedRole };
}
