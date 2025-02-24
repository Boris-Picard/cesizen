import { ColumnDef } from "@tanstack/react-table";
import { Information } from "../informations/column";
import { ExerciceType } from "../exercices/column";
import { User } from "../users/columns";
import { TypeInteraction } from "../type-interactions/columns";

export type Interaction = {
    id: number;
    inter_date_de_debut: Date;
    inter_date_de_fin?: Date;
    information?: Information;
    exercice?: ExerciceType;
    utilisateur?: User;
    typeInteraction: TypeInteraction;
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
