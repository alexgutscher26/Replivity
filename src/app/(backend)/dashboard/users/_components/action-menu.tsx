"use client";

import { useState } from "react";

import { type Row, type Table } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import CopyIdAction from "@/app/(backend)/dashboard/_components/copy-id-action";
import BanUsersAction from "@/app/(backend)/dashboard/users/_components/ban-users-action";
import ChangeUserRoleAction from "@/app/(backend)/dashboard/users/_components/change-user-role-action";
import DeleteUsersAction from "@/app/(backend)/dashboard/users/_components/delete-users-action";
import ImpersonateUserAction from "@/app/(backend)/dashboard/users/_components/impersonate-user-action";
import RevokeSpecificSessionsUserAction from "@/app/(backend)/dashboard/users/_components/revoke-specific-sessions-user-action";
import UnbanUsersAction from "@/app/(backend)/dashboard/users/_components/unban-users-action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type User } from "./users-table";

type BaseActionMenuProps<TData> = {
  table: Table<TData>;
  row?: Row<TData>;
  source?: "cell" | "header";
};

export type ActionMenuProps<TData> = BaseActionMenuProps<TData> & {
  users: User[];
  onSuccess?: () => void; // callback to close dropdown
};

export default function ActionMenu<TData extends User>({
  table,
  row,
  source,
}: BaseActionMenuProps<TData>): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get users data based on source
  const users: User[] = (() => {
    if (source === "cell") {
      return row?.original ? [row.original] : [];
    }
    return table?.getSelectedRowModel().rows.map((r) => r.original) ?? [];
  })();

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        {source === "header" ? (
          <Button variant="outline" className="ml-auto" size={"sm"}>
            <MoreHorizontal />
          </Button>
        ) : (
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <CopyIdAction data={users} name="user" />
        <DropdownMenuSeparator />
        <ImpersonateUserAction table={table} users={users} />
        <ChangeUserRoleAction
          table={table}
          users={users}
          onSuccess={() => setMenuOpen(false)}
        />
        <DropdownMenuSeparator />
        <RevokeSpecificSessionsUserAction
          table={table}
          users={users}
          onSuccess={() => setMenuOpen(false)}
        />
        <BanUsersAction
          table={table}
          users={users}
          onSuccess={() => setMenuOpen(false)}
        />
        <UnbanUsersAction table={table} users={users} />
        <DeleteUsersAction
          table={table}
          users={users}
          onSuccess={() => setMenuOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
