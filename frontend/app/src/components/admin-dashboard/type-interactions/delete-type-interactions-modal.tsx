import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TypeInteraction } from "./columns";
import { useDeleteTypeInteractions } from "@/hooks/admin/type-interactions/useDeleteTypeInteractions";

export interface DeleteTypeInteractionModalProps {
    typeInteraction: TypeInteraction;
    open: boolean;
    onClose: () => void;
    onDelete: (typeInteractionId: number) => void;
}

export default function DeleteTypeInteractionModal({ typeInteraction, open, onClose, onDelete }: DeleteTypeInteractionModalProps) {
    const { handleDelete } = useDeleteTypeInteractions();

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Supprimer le type d'interaction</DialogTitle>
                    <DialogDescription className="text-leather-600 py-6">
                        Êtes-vous sûr de vouloir supprimer le type d'interaction <span className="font-bold">{typeInteraction.type_inter_libelle}</span> ?
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
                        onClick={() => handleDelete({ onDelete, onClose, id: typeInteraction.id })}
                        className="bg-red-600 hover:bg-red-700 text-white ml-2"
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
