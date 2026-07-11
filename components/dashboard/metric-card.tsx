import type { MetricCardData } from "@/lib/types";
import { ArrowDown, ArrowUp, Minus, MoreVertical } from "lucide-react";

const colorMap = {
  blue: { bg: "bg-[#dceeff]", iconBg: "bg-white" },
  purple: { bg: "bg-[#e8def8]", iconBg: "bg-white" },
  green: { bg: "bg-[#dcefdc]", iconBg: "bg-white" },
  yellow: { bg: "bg-[#f7edc7]", iconBg: "bg-white" },
  pink: { bg: "bg-[#f5dfe7]", iconBg: "bg-white" },
};

interface MetricCardProps {
  metric: MetricCardData;
  icon: React.ReactNode;
}

export function MetricCard({ metric, icon }: MetricCardProps) {
  const colors = colorMap[metric.variant];
  const trendIcon =
    metric.trend?.direction === "up" ? (
      <ArrowUp size={14} className="text-dashboard-success" />
    ) : metric.trend?.direction === "down" ? (
      <ArrowDown size={14} className="text-dashboard-danger" />
    ) : (
      <Minus size={14} className="text-dashboard-text-secondary" />
    );

  const trendColor =
    metric.trend?.direction === "up"
      ? "text-dashboard-success"
      : metric.trend?.direction === "down"
        ? "text-dashboard-danger"
        : "text-dashboard-text-secondary";

  return (
    <div
      className={`${colors.bg} relative rounded-[20px] p-5 transition-shadow duration-150 hover:shadow-md`}
    >
      <button
        type="button"
        aria-label="Más opciones"
        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
      >
        <MoreVertical size={16} />
      </button>

      <div className={`${colors.iconBg} mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl`}>
        {icon}
      </div>

      <p className="text-sm font-medium text-dashboard-text-secondary">
        {metric.title}
      </p>
      <p className="mt-1 text-[26px] font-bold text-dashboard-text-primary leading-tight">
        {metric.value}
      </p>

      {metric.description && (
        <p className="mt-1 text-sm text-dashboard-text-secondary">
          {metric.description}
        </p>
      )}

      {metric.trend && (
        <div className={`mt-2 flex items-center gap-1 text-sm ${trendColor}`}>
          {trendIcon}
          <span className="font-medium">
            {metric.trend.value > 0 ? "+" : ""}
            {metric.trend.value}%
          </span>
        </div>
      )}
    </div>
  );
}
