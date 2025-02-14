import { useState } from "react";
import { useToast } from "./useToast";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface submitDataInterface {
    username: string
    password: string
}

export default function useLoginUser() {
    const { login } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false)

    const loginUser = async (submitData: submitDataInterface) => {
        setLoading(true)
        try {
            await login(submitData.username, submitData.password);
            toast({
                variant: "success",
                title: "Connexion réussie."
            });
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
        } finally {
            setLoading(false)
        }
    }

    return { loginUser, loading }
}