/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Unlock } from "lucide-react";
import { toast } from "sonner";

import { type ActionMenuProps } from "@/app/(backend)/dashboard/users/_components/action-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { authClient } from "@/server/auth/client";

import { type User } from "./users-table";

export default function UnbanUsersAction<TData extends User>({
  table,
  users,
}: ActionMenuProps<TData>) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setIsPending(true);

    try {
      await Promise.all(
        users.map((user) =>
          authClient.admin.unbanUser({
            userId: user.id,
            fetchOptions: {
              onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: ["users"] });
              },
            },
          }),
        ),
      );

      toast.success("Success", {
        description: `Successfully unbanned ${users?.length} user${
          users?.length > 1 ? "s" : ""
        }`,
      });
    } catch (error: unknown) {
      toast.error("Uh oh! Something went wrong.", {
        description:
          error instanceof Error ? error.message : "An error occurred",
        action: {
          label: "Try again",
          onClick: () => {
            void handleSubmit();
          },
        },
      });
    } finally {
      setIsPending(false);
      table.resetRowSelection();
    }
  };

  return (
    <DropdownMenuItem
      disabled={
        isPending ||
        users?.length === 0 ||
        users?.every((user: User) => !user?.banned)
      }
      onSelect={() => handleSubmit()}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <Unlock />}
      Unban user{users?.length > 1 && "s"}
    </DropdownMenuItem>
  );
}
