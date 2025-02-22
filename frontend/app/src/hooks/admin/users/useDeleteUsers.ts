import { useAuth } from "@/context/AuthContext";

interface userDeleteInterface {
    id: number,
    onClose: () => void,
    onDelete: (userId: number) => void
}

export function useDeleteUsers() {
    const { token } = useAuth()

    async function handleDelete({ onDelete, onClose, id }: userDeleteInterface) {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(`http://cesizen-api.localhost/api/utilisateurs/${id}`, options);

            if (response.ok) {
                onDelete(id);
                onClose();
            } else {
                console.error("Erreur lors de la suppression de l'utilisateur");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
        }
    }
    return { handleDelete }
}