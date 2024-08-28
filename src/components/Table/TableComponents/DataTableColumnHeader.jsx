import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import PropTypes from "prop-types";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/Ui/button";

export default function DataTableColumnHeader({
  column,
  title,
  className,
  ...props
}) {
  // Defaulting to false if the column object does not have getCanSort
  const canSort = column?.getCanSort ? column.getCanSort() : false;
  const isSorted = column?.getIsSorted ? column.getIsSorted() : null;

  if (!canSort) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {isSorted === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : isSorted === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-white">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

DataTableColumnHeader.propTypes = {
  column: PropTypes.shape({
    getCanSort: PropTypes.func,
    getIsSorted: PropTypes.func,
    toggleSorting: PropTypes.func,
    toggleVisibility: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};
