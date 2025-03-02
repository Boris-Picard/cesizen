import axios from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface UpdateProfileDataInterface {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

interface UpdateProfileResponseInterface {
    status: string;
}

export function useUpdateProfile(token: string | null) {
    const { toast } = useToast();
    const [updateResponse, setUpdateResponse] = useState<UpdateProfileResponseInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const updateProfile = async (submitData: UpdateProfileDataInterface) => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://cesizen-api.localhost/profile/parameters',
                {
                    ut_prenom: submitData.firstName,
                    ut_nom: submitData.lastName,
                    ut_mail: submitData.email,
                    plainPassword: submitData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUpdateResponse(response.data);

            if (response.status === 200) {
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
    };

    return { updateResponse, loading, updateProfile };
}
