import { useState } from "react";
import { toast } from "./useToast";
import axios from "axios";

interface submitDataInterface {
    ut_mail: string
}

export default function useMailResetPassword() {
    const [loading, setLoading] = useState<boolean>(false)
    const mailResetPassword = async (submitData: submitDataInterface) => {
        try {
            setLoading(true);
            const response = await axios.post('http://cesizen-api.localhost/reset-password/forgot-password', {
                ut_mail: submitData.ut_mail,
            });
            if (response.status === 200) {
                toast({
                    variant: "success",
                    title: "Un email de réinitialisation a été envoyé (si l'adresse existe).",
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    toast({
                        variant: "destructive",
                        title: error.response?.data?.title ?? error.message,
                        description: error.response?.data?.message ? error.response?.data?.detail : error.response?.data?.error,
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
    return { mailResetPassword, loading }
}