import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export type Role = {
    id: number
    role_nom: string
}

export type User = {
    id: number
    ut_prenom: string
    ut_nom: string
    ut_mail: string
    role: Role
    ut_active?: boolean
}

export const getColumns = (handleEdit: (user: User) => void,
    handleDelete: (user: User) => void): ColumnDef<User>[] => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "ut_prenom",
            header: "Prénom",
        },
        {
            accessorKey: "ut_nom",
            header: "Nom",
        },
        {
            accessorKey: "ut_mail",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Rôle",
            cell: ({ row }) => row.original.role.role_nom,
        },
        {
            accessorKey: "ut_active",
            header: "Actif",
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
                        <Icons.trash className="h-4 w-4 " />
                    </Button>
                </div>
            ),
        },
    ]
