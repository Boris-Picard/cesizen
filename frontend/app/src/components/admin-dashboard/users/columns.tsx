import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

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
}

export const columns: ColumnDef<User>[] = [
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
        id: "actions",
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4 text-green-600" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
            </div>
        ),
    },
]
