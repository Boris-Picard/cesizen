import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ColumnDef } from "@tanstack/react-table";

export type TypeInformation = {
    id: number;
    type_info_nom: string;
};

export type Information = {
    id: number;
    info_titre: string;
    info_description: string;
    info_contenu: string;
    info_active: boolean;
    typeInformation: TypeInformation;
};

export const getInformationColumns = (
    handleEdit: (information: Information) => void,
    handleDelete: (information: Information) => void
): ColumnDef<Information>[] => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "info_titre",
            header: "Titre",
        },
        {
            accessorKey: "info_description",
            header: "Description",
        },
        {
            accessorKey: "info_contenu",
            header: "Contenu",
        },
        {
            accessorKey: "typeInfo",
            header: "Type d'information",
            cell: ({ row }) => row.original.typeInformation.type_info_nom,
        },
        {
            accessorKey: "info_active",
            header: "Actif",
            cell: ({ row }) => (row.original.info_active ? "Oui" : "Non"),
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
