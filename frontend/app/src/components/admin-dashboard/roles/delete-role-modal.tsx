import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Role } from "./columns";
import { useDeleteRoles } from "@/hooks/admin/roles/useDeleteRoles";

export interface DeleteRoleModalProps {
    role: Role;
    open: boolean;
    onClose: () => void;
    onDelete: (roleId: number) => void;
}

export default function DeleteRoleModal({ role, open, onClose, onDelete }: DeleteRoleModalProps) {
    const { handleDelete } = useDeleteRoles();

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Supprimer le rôle</DialogTitle>
                    <DialogDescription className="text-leather-600 py-6">
                        Êtes-vous sûr de vouloir supprimer le rôle <span className="font-bold">{role.role_nom}</span> ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="text-leather-600 border-leather-300">
                            Annuler
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={() => handleDelete({ onDelete, onClose, id: role.id })}
                        className="bg-red-600 hover:bg-red-700 text-white ml-2"
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
