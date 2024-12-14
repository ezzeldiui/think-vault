import { AlertTriangle, CheckCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 text-secondary border-emerald-800",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);
const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,
};

type BannerProps = VariantProps<typeof bannerVariants> & {
  label: string;
};

export function Banner({ label, variant }: BannerProps) {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="mr-2 size-4" />
      {label}
    </div>
  );
}
