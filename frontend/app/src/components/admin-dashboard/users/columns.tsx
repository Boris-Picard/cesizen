import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  role: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstname",
    header: "Prénom",
  },
  {
    accessorKey: "lastname",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rôle",
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
