import { User } from "@/components/admin-dashboard/users/columns";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/useToast";
import axios from "axios";
import { useEffect, useState } from "react";

export function useGetUsers() {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const { token } = useAuth()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://cesizen-api.localhost/api/utilisateurs", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = response.data;
                setUsers(data);
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
                setLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    return { users, loading, setUsers }
}