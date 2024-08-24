

import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/Ui/dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Table } from "@tanstack/react-table"
import { Button } from '@/components/Ui/button'
const DataTableViewOptions = ({
    table,
  }) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-10 lg:flex"
      >
        <MixerHorizontalIcon className="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[150px] bg-white">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
        .map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          )
        })}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default DataTableViewOptions

// "use client";

// import { Button } from "@/components/Ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/Ui/dropdown-menu";
// import { MixerHorizontalIcon } from "@radix-ui/react-icons";
// import React from "react";
// import { Table } from "@tanstack/react-table";
// import PropTypes from "prop-types";

// export function DataTableViewOptions({ table }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="ml-auto hidden h-8 lg:flex"
//         >
//           <MixerHorizontalIcon className="mr-2 h-4 w-4" />
//           View
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-[150px]">
//         <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {table
//           .getAllColumns()
//           .filter(
//             (column) =>
//               typeof column.accessorFn !== "undefined" && column.getCanHide()
//           )
//           .map((column) => {
//             return (
//               <DropdownMenuCheckboxItem
//                 key={column.id}
//                 className="capitalize"
//                 checked={column.getIsVisible()}
//                 onCheckedChange={(value) => column.toggleVisibility(!!value)}
//               >
//                 {column.id}
//               </DropdownMenuCheckboxItem>
//             );
//           })}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// DataTableViewOptions.propTypes = {
//   table: PropTypes.object.isRequired,
// };
