import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "./columns";
import { useDeleteUsers } from "@/hooks/admin/users/useDeleteUsers";

export interface DeleteUserModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
    onDelete: (userId: number) => void;
}

export default function DeleteUserModal({ user, open, onClose, onDelete }: DeleteUserModalProps) {
    const { handleDelete } = useDeleteUsers()

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
                    <Button type="button" onClick={() => handleDelete({ onDelete, onClose, id: user.id })} className="bg-red-600 hover:bg-red-700 text-white ml-2">
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
