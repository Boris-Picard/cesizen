import axios from "axios";
import { useState } from "react";
import { useToast } from "../useToast";

interface submitDataInterface {
    firstName: string
    lastName: string
    email: string
    password: string
}

interface RegisterResponseInterface {
    status: string;
}

export function useRegisterUser() {
    const { toast } = useToast();
    const [registerResponse, setRegisterResponse] = useState<RegisterResponseInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const registerUser = async (submitData: submitDataInterface) => {
        setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
                ut_prenom: submitData.firstName,
                ut_nom: submitData.lastName,
                ut_mail: submitData.email,
                plainPassword: submitData.password,
            });

            setRegisterResponse(response.data);

            if (response.status === 201) {
                toast({
                    variant: "success",
                    title: response.data.status,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: "destructive",
                    title: error.response?.data?.title ?? "Une erreur est survenue",
                    description: error.response?.data?.error || error.message,
                });
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

    return { registerResponse, loading, registerUser };
}

export default { useRegisterUser }