"use client";
import React, { useState, useEffect } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel, // Import the correct filtered row model
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";

const DataTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedRowData, setSelectedRowsData] = useState();
  const [globalFilter, setGlobalFilter] = useState(""); // Global filter state

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter, // Add global filter state
      rowSelection: Object.fromEntries(
        Array.from(selectedRows).map((rowId) => [rowId, true])
      ),
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter, // Handle global filter change
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Use filtered row model instead of global filtered row model
    onRowSelectionChange: (selection) => {
      const newSelectedRows = new Set(
        Object.entries(selection)
          .filter(([_, isSelected]) => isSelected)
          .map(([rowId]) => rowId)
      );
      setSelectedRows(newSelectedRows);
    },
  });

  useEffect(() => {
    const selectedRowData = Array.from(selectedRows)
      .map((rowId) => {
        const row = table.getRowModel().rows.find((row) => row.id === rowId);
        if (row) {
          return row.original;
        }
        return null;
      })
      .filter((row) => row);
    setSelectedRowsData(selectedRowData);

    table.setState((old) => ({
      ...old,
      rowSelection: Object.fromEntries(
        Array.from(selectedRows).map((rowId) => [rowId, true])
      ),
    }));
  }, [selectedRows, table]);

  return (
    <div className="space-y-4 container px-5">
      <DataTableToolbar table={table} selectedRow={selectedRowData} />
      <div className="rounded-lg border">
        <Table className="overflow-x-auto border-e">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border border-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={() => {
                    const isSelected = row.getIsSelected();
                    const newSelectedRows = new Set(selectedRows);

                    if (isSelected) {
                      newSelectedRows.delete(row.id);
                    } else {
                      newSelectedRows.add(row.id);
                    }

                    setSelectedRows(newSelectedRows);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border border-gray-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center border border-gray-300"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default DataTable;
