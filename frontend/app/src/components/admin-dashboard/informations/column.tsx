import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ColumnDef } from "@tanstack/react-table";

export type TypeInformation = {
    id: number;
    type_info_nom: string;
};

export type UserInformation = {
    ut_prenom: string;
    ut_nom: string;
}

export type Information = {
    id: number;
    info_titre: string;
    info_description: string;
    info_contenu: string;
    info_active: boolean;
    createdAt: string;
    createdBy: UserInformation;
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
            cell: ({ row }) => {
                const content = row.original.info_titre;
                return <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: content }} />;
            },
        },
        {
            accessorKey: "info_description",
            header: "Description",
            cell: ({ row }) => {
                const content = row.original.info_description;
                return <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: content }} />;
            },
        },
        {
            accessorKey: "info_contenu",
            header: "Contenu",
            cell: ({ row }) => {
                const content = row.original.info_contenu;
                return <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: content }} />;
            },
        },
        {
            accessorKey: "typeInfo",
            header: "Type d'information",
            cell: ({ row }) => row.original.typeInformation.type_info_nom,
        },
        {
            accessorKey: "utilisateur",
            header: "Utilisateur",
            cell: ({ row }) =>
                row.original.createdBy
                    ? `${row.original.createdBy.ut_prenom} ${row.original.createdBy.ut_nom}`
                    : "-",
        },
        {
            accessorKey: "createdAt",
            header: "Date de création",
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
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
