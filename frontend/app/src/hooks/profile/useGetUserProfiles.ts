import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { Role } from "@/components/admin-dashboard/users/columns";
import { ExerciceType } from "@/components/admin-dashboard/exercices/column";
import { Information } from "@/components/admin-dashboard/informations/column";
import { Interaction } from "@/components/admin-dashboard/interactions/column";

interface userProfileInterface {
    id: number;
    ut_nom: string;
    ut_prenom: string;
    ut_mail: string;
    ut_mail_anonymized: string;
    ut_active: boolean;
    createdAt: string;
    role: Role;
    exercices: ExerciceType[];
    informations: Information[];
    interactions: Interaction[]
    validations: any[];
}

export function useGetUserProfile(id: string | undefined) {
    const [userProfile, setUserProfile] = useState<userProfileInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(
                    `http://cesizen-api.localhost/api/utilisateurs/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserProfile(data);
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
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id, token]);

    return { userProfile, loading };
}
