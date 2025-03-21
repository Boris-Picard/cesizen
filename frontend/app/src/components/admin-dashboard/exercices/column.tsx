import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export type ExerciceType = {
    id: number;
    ex_nom: string;
    ex_description: string;
    ex_difficulty: "Débutant" | "Intermédiaire" | "Avancé";
    ex_duration: number;
    ex_inspiration: number;
    ex_apnee: number;
    ex_expiration: number;
    ex_active: boolean;
    ex_benefits?: string[];
};


export const getColumns = (
    handleEdit: (exercice: ExerciceType) => void,
    handleDelete: (exercice: ExerciceType) => void
): ColumnDef<ExerciceType>[] => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "ex_nom",
            header: "Nom",
        },
        {
            accessorKey: "ex_description",
            header: "Description",
            cell: ({ row }) => {
                const content = row.original.ex_description;
                return <div className="line-clamp-3">{content}</div>;
            },
        },
        {
            accessorKey: "ex_difficulty",
            header: "Difficulté",
        },
        {
            accessorKey: "ex_duration",
            header: "Durée (m)",
        },
        {
            accessorKey: "ex_benefits",
            header: "Bienfaits",
            cell: ({ row }) => row.original.ex_benefits?.join(", "),
        },
        {
            accessorKey: "ex_inspiration",
            header: "Inspiration (s)",
        },
        {
            accessorKey: "ex_apnee",
            header: "Apnée (s)",
        },
        {
            accessorKey: "ex_expiration",
            header: "Expiration (s)",
        },
        {
            accessorKey: "ex_active",
            header: "Actif",
            cell: ({ row }) => (row.original.ex_active ? "Oui" : "Non"),
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
