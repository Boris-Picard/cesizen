import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export type TypeInformation = {
    id: number;
    type_info_nom: string;
};

export const getColumns = (
    handleEdit: (typeInfo: TypeInformation) => void,
    handleDelete: (typeInfo: TypeInformation) => void
): ColumnDef<TypeInformation>[] => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "type_info_nom",
            header: "Type d'information",
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
