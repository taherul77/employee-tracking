/* eslint-disable react-hooks/rules-of-hooks */

import { Checkbox } from "@/components/Ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";

import DataTableRowActions from "./DataTableRowActions";
import Image from "next/image";
import { useState } from "react";
const defaultImage = "/image/drug-international-logo.png";

export const Columns = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center px-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "slNo",
    header: ({ table }) => <DataTableColumnHeader title="Sl. No" />,
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return (
        <div className="w-[40px]">{pageIndex * pageSize + row.index + 1}</div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "mkgProfNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MKG Prof No" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("mkgProfNo")}</div>
    ),
  },
  {
    accessorKey: "employeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.getValue("employeName")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gpsDataTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GPS Data Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("gpsDataTime")}</div>
    ),
  },
  {
    accessorKey: "gpslocalName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GPS Local Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">{row.getValue("gpslocalName")}</div>
    ),
    enableSorting: false,
    
  },
  {
    accessorKey: "profPhoto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile Photo" />
    ),
    cell: ({ row }) => {
      const [imageSrc, setImageSrc] = useState(row.getValue("profPhoto"));

      const handleError = () => {
        setImageSrc(defaultImage);
      };

      return (
        <Image
          src={imageSrc}
          alt="Profile"
          height={50}
          width={50}
         
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          }}
          onError={handleError}
        />
      );
    },
    enableSorting: false,
  
  },
  {
    accessorKey: "bateryPct",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Battery Percentage" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("bateryPct")}</div>
    ),
  },
  {
    accessorKey: "gpsDataFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GPS Data Flag" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("gpsDataFlag");
      return (
        <div className="w-[100px]">
          {value === 1 ? "Active" : "Inactive"}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "mlatitute",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Latitude" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("mlatitute")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "mlongitute",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Longitude" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("mlongitute")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  
];


