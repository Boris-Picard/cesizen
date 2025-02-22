import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Information } from "./column";
import { useDeleteInformations } from "@/hooks/admin/informations/useDeleteInformations";

export interface DeleteInformationModalProps {
    information: Information;
    open: boolean;
    onClose: () => void;
    onDelete: (infoId: number) => void;
}

export default function DeleteInformationModal({ information, open, onClose, onDelete }: DeleteInformationModalProps) {
    const { handleDelete } = useDeleteInformations();

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Supprimer l'information</DialogTitle>
                    <DialogDescription className="text-leather-600 py-6">
                        Êtes-vous sûr de vouloir supprimer l'information <span className="font-bold">{information.info_titre}</span> ?
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
                        onClick={() => handleDelete({ onDelete, onClose, id: information.id })}
                        className="bg-red-600 hover:bg-red-700 text-white ml-2"
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
