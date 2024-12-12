"use client";

import { guestRoutes } from "@/data/guestRoutes";
import { SidebarItem } from "./sidebar-icon";
import { usePathname } from "next/navigation";
import { teacherRoutes } from "@/data/teacherRoutes";

export function SidebarRoutes() {

  const pathname = usePathname();

  const isTeacherMode = pathname?.includes("/teacher");
  const routes = isTeacherMode ? teacherRoutes : guestRoutes;

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
