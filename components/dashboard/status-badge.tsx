import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "inactive" | "draft";
  showIcon?: boolean;
}

const statusConfig = {
  active: {
    label: "Activo",
    className: "bg-green-50 text-dashboard-success",
    dot: "bg-dashboard-success",
  },
  inactive: {
    label: "Inactivo",
    className: "bg-gray-100 text-dashboard-text-secondary",
    dot: "bg-gray-400",
  },
  draft: {
    label: "Borrador",
    className: "bg-yellow-50 text-dashboard-warning",
    dot: "bg-dashboard-warning",
  },
};

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium",
        config.className,
      )}
    >
      {showIcon && <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />}
      {config.label}
    </span>
  );
}
