import { ColumnDef } from "@tanstack/react-table";

export type HistoriqueType = {
    id: number;
    histo_id: number;
    histo_id_obj: number | null;
    histo_nom_table: string | null;
    histo_date: string;
    histo_ancienne_valeur: string | null;
    histo_nouvelle_valeur: string | null;
    typeHistorique: {
        id: number,
        type_histo_libelle: string
    }
};

export const historiqueColumns: ColumnDef<HistoriqueType>[] = [
    // {
    //     accessorKey: "id",
    //     header: "ID",
    // },
    {
        accessorKey: "histo_nom_table",
        header: "Table",
    },
    {
        accessorKey: "histo_date",
        header: "Date",
        cell: ({ row }) => new Date(row.original.histo_date).toLocaleString(),
    },
    {
        accessorKey: "type_histo",
        header: "Type Historique",
        cell: ({ row }) => row.original.typeHistorique.type_histo_libelle,
    },
    // {
    //     accessorKey: "histo_ancienne_valeur",
    //     header: "Ancienne Valeur",
    // },
    {
        accessorKey: "histo_nouvelle_valeur",
        header: "Nouvelle Valeur",
    },
];
