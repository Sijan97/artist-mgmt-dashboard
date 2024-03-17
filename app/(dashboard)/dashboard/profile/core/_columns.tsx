"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserProfile } from "./_models";
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";

export const profileColumns: ColumnDef<UserProfile>[] = [
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
    accessorKey: "full_name",
    header: "FULL NAME",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "email",
    accessorKey: "email",
    header: "EMAIL",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: "PHONE",
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
