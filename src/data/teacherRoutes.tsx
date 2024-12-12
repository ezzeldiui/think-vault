import { RouteConfig } from "@/types/routeConfig";
import { BarChart, List } from "lucide-react";

export const teacherRoutes: RouteConfig[] = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
