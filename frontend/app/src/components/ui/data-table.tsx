"use client"

import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type PaginationState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Search,
  SlidersHorizontal,
  Download,
  Trash2,
  FileText,
  Filter,
  MoreHorizontal,
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
import { Badge } from "@/components/ui/badge"

export interface DataTableProps<TData extends { id: string | number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends { id: string | number }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const selectionColumn: ColumnDef<TData, unknown> = React.useMemo(
    () => ({
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
    }),
    [],
  )

  const allColumns = React.useMemo(() => [selectionColumn, ...columns], [columns, selectionColumn])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
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
      globalFilter,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleDeleteSelected = () => {
    const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => row.original.id)
    alert("Supprimer les lignes avec ID : " + selectedIds.join(", "))
  }

  const handleExportSelected = () => {
    const selectedData = table.getFilteredSelectedRowModel().rows.map((row) => row.original)
    alert("Exporter les données : " + JSON.stringify(selectedData, null, 2))
  }

  return (
    <div className="space-y-6">
      {/* Barre de filtrage et basculement des colonnes */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-400 h-4 w-4" />
          <Input
            placeholder="Rechercher..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 border-leather-200 focus:border-leather-500 focus:ring-leather-500 rounded-xl bg-white shadow-sm hover:border-leather-300 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <Badge
            variant="outline"
            className="bg-leather-50 text-leather-700 border-leather-200 px-3 py-1.5 rounded-xl shadow-sm"
          >
            <FileText className="h-3.5 w-3.5 mr-1.5 text-leather-500" />
            <span className="text-xs font-medium">
              {table.getFilteredRowModel().rows.length} sur {table.getCoreRowModel().rows.length} ligne(s)
            </span>
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-leather-200 text-leather-700  rounded-xl shadow-sm"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Colonnes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] rounded-xl border-leather-200 shadow-lg">
              <DropdownMenuLabel className="text-leather-700">Afficher/Masquer</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-leather-100" />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    className="capitalize text-leather-600 hover:text-leather-900 "
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-xl border border-leather-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-leather-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-leather-200 hover:bg-leather-100/50">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-leather-700 font-semibold py-3.5 first:pl-4 last:pr-4">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`
                      border-leather-200 /70 transition-colors
                      ${row.getIsSelected() ? "bg-leather-100/50" : index % 2 === 0 ? "bg-white" : "bg-leather-50/30"}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 text-leather-700 first:pl-4 last:pr-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={allColumns.length} className="h-32 text-center text-leather-500 bg-leather-50/30">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Filter className="h-8 w-8 text-leather-300" />
                      <p>Aucun résultat trouvé.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Contrôles en bas */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
        {/* Gauche : résumé et actions groupées */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Badge
              variant="outline"
              className="bg-leather-100/70 text-leather-800 border-leather-200 px-3 py-1.5 rounded-xl shadow-sm"
            >
              <Checkbox checked={true} className="h-3.5 w-3.5 mr-1.5 border-leather-400" disabled />
              <span className="text-xs font-medium">
                {table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel().rows.length}{" "}
                sélectionné(s)
              </span>
            </Badge>
          )}

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Supprimer
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-2xl border-leather-200 shadow-xl">
                  <DialogHeader>
                    <DialogTitle className="text-leather-900 text-xl">Confirmer la suppression</DialogTitle>
                    <DialogDescription className="text-leather-600">
                      Voulez-vous vraiment supprimer ces {table.getFilteredSelectedRowModel().rows.length} élément(s)
                      sélectionné(s) ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-leather-200 text-leather-700 "
                      >
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button variant="destructive" size="sm" onClick={handleDeleteSelected} className="rounded-xl">
                      Confirmer la suppression
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-leather-200 text-leather-700  shadow-sm"
                  >
                    <Download className="h-4 w-4 mr-1.5" />
                    Exporter
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-2xl border-leather-200 shadow-xl">
                  <DialogHeader>
                    <DialogTitle className="text-leather-900 text-xl">Confirmer l'export</DialogTitle>
                    <DialogDescription className="text-leather-600">
                      Voulez-vous exporter les données des {table.getFilteredSelectedRowModel().rows.length} élément(s)
                      sélectionné(s) ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-leather-200 text-leather-700 "
                      >
                        Annuler
                      </Button>
                    </DialogClose>
                    <Button
                      className="bg-leather-600 hover:bg-leather-700 text-white rounded-xl"
                      size="sm"
                      onClick={handleExportSelected}
                    >
                      Confirmer l'export
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Droite : pagination et sélection du nombre de lignes */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-leather-200 text-leather-700  shadow-sm"
              >
                <MoreHorizontal className="h-4 w-4 mr-1.5" />
                {pagination.pageSize} par page
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-leather-200 shadow-lg">
              {([5, 10, 20, 30, 40, 50] as const).map((taille) => (
                <DropdownMenuItem
                  key={taille}
                  onClick={() => setPagination((prev) => ({ ...prev, pageSize: taille, pageIndex: 0 }))}
                  className="cursor-pointer text-leather-600 hover:text-leather-900 "
                >
                  {taille} lignes
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 rounded-xl border-leather-200 text-leather-700  disabled:opacity-40 shadow-sm"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 rounded-xl border-leather-200 text-leather-700  disabled:opacity-40 shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Badge
              variant="outline"
              className="bg-leather-50 text-leather-700 border-leather-200 px-3 py-1.5 rounded-xl shadow-sm"
            >
              <span className="text-xs font-medium">
                Page {pagination.pageIndex + 1} sur {table.getPageCount() || 1}
              </span>
            </Badge>

            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 rounded-xl border-leather-200 text-leather-700  disabled:opacity-40 shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 rounded-xl border-leather-200 text-leather-700  disabled:opacity-40 shadow-sm"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

