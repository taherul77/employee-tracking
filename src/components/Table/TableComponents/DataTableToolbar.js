"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import DataTableViewOptions from "./DataTableViewOptions";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import { GlobalFilter } from "./GlobalFilter";
import useStore from "@/store/store";
import { Button } from "@/components/Ui/button";

export function DataTableToolbar({ table, selectedRow }) {
  const { setSelectedRow } = useStore();
  const router = useRouter();

  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  const handleSearchOnMap = () => {
    setSelectedRow(selectedRow);
    router.push("/dashboard/map");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <GlobalFilter
          globalFilter={table.getState().globalFilter}
          setGlobalFilter={table.setGlobalFilter}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.setGlobalFilter("")}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleSearchOnMap}
          className="h-10 px-4 border-gray-200 border-2"
        >
          Search on Map
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

DataTableToolbar.propTypes = {
  table: PropTypes.object.isRequired,
  selectedRow: PropTypes.array.isRequired,
};
