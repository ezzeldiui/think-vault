"use client";

import { cn } from "@/lib/utils";
import { RouteConfig } from "@/types/routeConfig";
import { usePathname, useRouter } from "next/navigation";

export function SidebarItem({ icon: Icon, label, href }: RouteConfig) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
        isActive
          ? "bg-gradient-to-r from-sky-200/50 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700"
          : "",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive ? "text-sky-700" : "")}
        />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 opacity-0",
          isActive ? "opacity-100" : "",
        )}
      />
    </button>
  );
}
