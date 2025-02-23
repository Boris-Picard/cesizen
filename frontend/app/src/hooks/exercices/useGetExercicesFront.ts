import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { ExerciceType } from "@/components/admin-dashboard/exercices/column";

export function useGetExercicesFront() {
    const [exercices, setExercices] = useState<ExerciceType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const getExercices = async () => {
            try {
                const { data } = await axios.get("http://cesizen-api.localhost/api/exercices?ex_active=true", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setExercices(data);
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
        getExercices();
    }, [token]);

    return { exercices, loading, setExercices };
}
