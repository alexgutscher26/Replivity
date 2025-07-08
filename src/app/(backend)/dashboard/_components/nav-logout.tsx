"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function NavLogout(): JSX.Element {
  const router = useRouter();

  const handleClick = (): void => {
    void router.push("/auth/sign-out");
  };

  return (
    <DropdownMenuItem onSelect={handleClick}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
