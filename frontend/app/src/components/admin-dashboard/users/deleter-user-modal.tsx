import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { User } from "./columns";

interface DeleteUserModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
    onDelete: (userId: number) => void;
}

export default function DeleteUserModal({ user, open, onClose, onDelete }: DeleteUserModalProps) {
    const { token } = useAuth();

    async function handleDelete() {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(`http://cesizen-api.localhost/api/utilisateurs/${user.id}`, options);
            
            if (response.ok) {
                onDelete(user.id);
                onClose();
            } else {
                console.error("Erreur lors de la suppression de l'utilisateur");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Supprimer l'utilisateur</DialogTitle>
                    <DialogDescription className="text-leather-600">
                        Êtes-vous sûr de vouloir supprimer <span className="font-bold">{user.ut_mail}</span> ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="text-leather-600 border-leather-300">
                            Annuler
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white ml-2">
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
