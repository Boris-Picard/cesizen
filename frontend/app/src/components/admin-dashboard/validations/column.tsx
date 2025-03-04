import { ColumnDef } from "@tanstack/react-table";
import { UserInformation } from "../informations/column";

export type ValidationType = {
    id: string;
    validation_token: string;
    date_expiration_token: string;
    type_validation: string;
    utilisateur: UserInformation;
};

export const validationColumns: ColumnDef<ValidationType>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    // {
    //     accessorKey: "validation_token",
    //     header: "Token",
    //     cell: ({ row }) => {
    //         const content = row.original.validation_token;
    //         return <div className="line-clamp-1">{content}</div>;
    //     },
    // },
    {
        accessorKey: "date_expiration_token",
        header: "Date Expiration",
        cell: ({ row }) => new Date(row.original.date_expiration_token).toLocaleString(),
    },
    {
        accessorKey: "type_validation",
        header: "Type Validation",
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
