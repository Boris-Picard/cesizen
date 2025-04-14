import axios from "axios";
import { toast } from "../useToast";
import { useState } from "react";
import { joinUrl } from "@/services/api";

interface submitDataInterface {
    plainPassword: string
}


export default function useResetPasswordUser(token: string | undefined) {
    const [loading, setLoading] = useState<boolean>(false)

    const resetPasswordUser = async (submitData: submitDataInterface) => {
        setLoading(true);
        try {
            const response = await axios.post(
                joinUrl(import.meta.env.VITE_API_URL,`/reset-password/reset/${token}`),
                {
                    plainPassword: submitData.plainPassword,
                }
            );
            if (response.status === 200) {
                toast({
                    variant: "success",
                    title: "Mot de passe réinitialisé avec succès.",
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    toast({
                        variant: "destructive",
                        title: error.response?.data?.title ?? error.message,
                        description:
                            error.response?.data?.message ||
                            error.response?.data?.detail ||
                            error.response?.data?.error,
                    });
                }
            } else {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return { resetPasswordUser, loading }
}