"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Music, deleteMusic } from ".";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface CellActionProps {
  data: Music;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const musicPath = "/dashboard/musics";
  const { data: session } = useSession();

  const onConfirm = async () => {
    setLoading(true);

    deleteMusic(
      data.id,
      () => {
        toast.success("Deleted Successfully");
        setOpen(false);
        window.location.reload();
      },
      () => toast.error("Failed to delete"),
      session?.user.token as string
    );

    setLoading(false);
  };

  const updatePath = () => {
    if (path === musicPath) {
      router.push(`/dashboard/musics/${data.id}`);
    } else {
      router.push(`musics/${data.id}`);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => updatePath()}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
