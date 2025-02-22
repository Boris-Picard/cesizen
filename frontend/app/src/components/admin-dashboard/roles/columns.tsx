import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { ColumnDef } from "@tanstack/react-table"

export type Role = {
    id: number
    role_nom: string
}

export const getColumns = (handleEdit: (role: Role) => void,
    handleDelete: (role: Role) => void): ColumnDef<Role>[] => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "role_nom",
            header: "Rôle",
        },
        {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)} >
                        <Icons.edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original)} >
                        <Icons.trash className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ]
