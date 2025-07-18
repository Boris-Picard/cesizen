import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import { ExerciceType } from "@/components/admin-dashboard/exercices/column";
import { joinUrl } from "@/services/api";

export function useGetExercicesId(id: string | undefined) {
    const [exercice, setExercice] = useState<ExerciceType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchExercice = async () => {
            try {
                const { data } = await axios.get(
                    joinUrl(import.meta.env.VITE_API_URL,`/api/exercices/${id}`),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (data.ex_active) {
                    setExercice(data);
                } else {
                    setExercice(null);
                }
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
            fetchExercice();
        }
    }, [id, token]);

    return { exercice, loading, setExercice };
}
