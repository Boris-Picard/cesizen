import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export type TypeHistorique = {
    id: number;
    type_histo_libelle: string;
};

export const getColumns = (
    handleEdit: (typeHistorique: TypeHistorique) => void,
    handleDelete: (typeHistorique: TypeHistorique) => void
): ColumnDef<TypeHistorique>[] => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "type_histo_libelle",
            header: "Libellé",
        },
        {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
                        <Icons.edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original)}>
                        <Icons.trash className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
