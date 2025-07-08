import { useState, type ComponentPropsWithoutRef } from "react";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import SupportDialog from "./support-dialog";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  dialog?: boolean;
};

export default function NavSecondary({
  items,
  ...props
}: {
  items: NavItem[];
} & ComponentPropsWithoutRef<typeof SidebarGroup>): JSX.Element {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.dialog ? (
                  <SidebarMenuButton
                    size="sm"
                    onClick={() => setSupportOpen(true)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild size="sm">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SupportDialog open={supportOpen} onOpenChange={setSupportOpen} />
    </>
  );
}
