import { RouteConfig } from "@/types/routeConfig";
import { Compass, Layout } from "lucide-react";

export const guestRoutes: RouteConfig[] = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];
