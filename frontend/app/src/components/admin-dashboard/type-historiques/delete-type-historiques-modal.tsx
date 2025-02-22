import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTypeHistoriques } from "@/hooks/admin/type-historiques/useDeleteTypeHistoriques";
import { TypeHistorique } from "./column";

export interface DeleteTypeHistoriqueModalProps {
    typeHistorique: TypeHistorique;
    open: boolean;
    onClose: () => void;
    onDelete: (typeHistoriqueId: number) => void;
}

export default function DeleteTypeHistoriqueModal({ typeHistorique, open, onClose, onDelete }: DeleteTypeHistoriqueModalProps) {
    const { handleDelete } = useDeleteTypeHistoriques();

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-leather-800">Supprimer le type d'historique</DialogTitle>
                    <DialogDescription className="text-leather-600 py-6">
                        Êtes-vous sûr de vouloir supprimer le type d'historique <span className="font-bold">{typeHistorique.type_histo_libelle}</span> ?
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
                        onClick={() => handleDelete({ onDelete, onClose, id: typeHistorique.id })}
                        className="bg-red-600 hover:bg-red-700 text-white ml-2"
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
