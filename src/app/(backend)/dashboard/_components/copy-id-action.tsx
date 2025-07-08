/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import { Copy } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type CopyIdActionProps<TData extends { id: string }> = {
  data: TData[];
  name: string;
};

export default function CopyIdAction<TData extends { id: string }>({
  data,
  name,
}: CopyIdActionProps<TData>) {
  return (
    <DropdownMenuItem
      onSelect={() =>
        navigator.clipboard.writeText(
          data?.length === 1 ? (data[0]?.id ?? "") : "",
        )
      }
      disabled={data?.length !== 1}
    >
      <Copy />
      {`Copy ${name} ID`}
    </DropdownMenuItem>
  );
}
