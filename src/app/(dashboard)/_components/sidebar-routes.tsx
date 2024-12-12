"use client";

import { guestRoutes } from "@/data/guestRoutes";
import { SidebarItem } from "./sidebar-icon";

export function SidebarRoutes() {
  const routes = guestRoutes;

  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}
