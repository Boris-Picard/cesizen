import { Role } from "@/components/admin-dashboard/users/columns";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export function useGetRoles() {
    const [roles, setRoles] = useState<Array<Role>>([]);
    const { token } = useAuth();

    useEffect(() => {
        const getRoles = async () => {
            try {
                const { data } = await axios.get("http://cesizen-api.localhost/api/roles", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRoles(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des rôles :", error);
            }
        };
        getRoles();
    }, [token]);

    return { roles };
}
