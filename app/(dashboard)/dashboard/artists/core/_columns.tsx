"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Artist } from "./_models";
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";

export const artistColumns: ColumnDef<Artist>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: "NAME",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "first_release_year",
    accessorKey: "first_release_year",
    header: "FIRST RELEASE YEAR",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "no_of_albums_released",
    accessorKey: "no_of_albums_released",
    header: "ALBUMS COUNT",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "date_of_birth",
    header: "DATE OF BIRTH",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "gender",
    header: "GENDER",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
