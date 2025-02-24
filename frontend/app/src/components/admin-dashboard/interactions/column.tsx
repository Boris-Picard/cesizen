import { ColumnDef } from "@tanstack/react-table";

export type Interaction = {
    id: number;
    inter_date_de_debut: string;
    inter_date_de_fin?: string;
    information?: {
        id: number;
        info_titre: string;
    };
    exercice?: {
        id: number;
        ex_nom: string;
    };
    utilisateur?: {
        id: number;
        ut_prenom: string;
        ut_nom: string;
    };
    typeInteraction: {
        id: number;
        type_inter_libelle: string;
    };
};

export const getColumns = (): ColumnDef<Interaction>[] => [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "inter_date_de_debut",
        header: "Date de début",
        cell: ({ row }) => new Date(row.original.inter_date_de_debut).toLocaleString(),
    },
    {
        accessorKey: "inter_date_de_fin",
        header: "Date de fin",
        cell: ({ row }) =>
            row.original.inter_date_de_fin
                ? new Date(row.original.inter_date_de_fin).toLocaleString()
                : "Non terminé",
    },
    {
        accessorKey: "typeInteraction",
        header: "Type d'interaction",
        cell: ({ row }) => row.original.typeInteraction.type_inter_libelle,
    },
    {
        accessorKey: "information",
        header: "Information",
        cell: ({ row }) =>
            row.original.information ? row.original.information.info_titre : "-",
    },
    {
        accessorKey: "exercice",
        header: "Exercice",
        cell: ({ row }) =>
            row.original.exercice ? row.original.exercice.ex_nom : "-",
    },
    {
        accessorKey: "utilisateur",
        header: "Utilisateur",
        cell: ({ row }) =>
            row.original.utilisateur
                ? `${row.original.utilisateur.ut_prenom} ${row.original.utilisateur.ut_nom}`
                : "-",
    },
];
