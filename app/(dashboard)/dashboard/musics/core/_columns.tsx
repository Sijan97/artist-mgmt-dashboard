"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Music } from "./_models";
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";

export const musicColumns: ColumnDef<Music>[] = [
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
    id: "title",
    accessorKey: "title",
    header: "TITLE",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "album_name",
    accessorKey: "album_name",
    header: "ALBUM NAME",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "release_date",
    header: "RELEASE DATE",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "genre",
    header: "GENRE",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
