import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

export interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends { id: string | number }, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  // Colonne de sélection
  const selectionColumn: ColumnDef<TData, unknown> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner toutes les lignes"
        className="h-4 w-4"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
        className="h-4 w-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }

  const allColumns = React.useMemo(() => [selectionColumn, ...columns], [columns])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // Actions groupées
  const handleDeleteSelected = () => {
    const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => row.original.id)
    // Ici vous pouvez ajouter l'appel API pour supprimer
    alert("Supprimer les lignes avec ID : " + selectedIds.join(", "))
  }

  const handleExportSelected = () => {
    const selectedData = table.getFilteredSelectedRowModel().rows.map(row => row.original)
    // Ici vous pouvez ajouter l'appel API pour exporter
    alert("Exporter les données : " + JSON.stringify(selectedData, null, 2))
  }

  return (
    <div className="space-y-4">
      {/* Barre de filtrage et basculement des colonnes */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filtrer par email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} sur {table.getCoreRowModel().rows.length} ligne(s)
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Colonnes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuLabel>Afficher/Masquer</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    className="capitalize"
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={allColumns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Contrôles en bas */}
      <div className="flex items-center justify-between py-4">
        {/* Gauche : résumé et actions groupées */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s)
          </span>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Supprimer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                      Voulez-vous vraiment supprimer ces lignes sélectionnées ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" size="sm">
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                      Confirmer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Exporter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer l'export</DialogTitle>
                    <DialogDescription>
                      Voulez-vous exporter les données des lignes sélectionnées ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" size="sm">
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button variant="outline" size="sm" onClick={handleExportSelected}>
                      Confirmer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
        {/* Droite : pagination et sélection du nombre de lignes */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Lignes par page : {pagination.pageSize}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px]">
              {([10, 20, 30, 40, 50] as const).map((taille) => (
                <DropdownMenuItem
                  key={taille}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, pageSize: taille, pageIndex: 0 }))
                  }
                  className="cursor-pointer"
                >
                  {taille}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="hidden lg:flex"
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            <span className="text-sm">
              Page {pagination.pageIndex + 1} sur {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="hidden lg:flex"
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
