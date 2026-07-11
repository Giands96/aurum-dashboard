interface SummaryCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  change?: string;
}

export function SummaryCard({
  label,
  value,
  subtitle,
  change,
}: SummaryCardProps) {
  return (
    <div className="rounded-[24px] bg-[#dceeff] p-6 sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-dashboard-text-secondary">
            {label}
          </p>
          <p className="mt-2 text-[32px] sm:text-[38px] font-bold text-dashboard-text-primary leading-tight">
            {value}
          </p>
          <p className="mt-1 text-sm text-dashboard-text-secondary">
            {subtitle}
          </p>
          {change && (
            <p className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white/60 px-2.5 py-1 text-sm font-medium text-dashboard-success">
              {change}
            </p>
          )}
        </div>
        <div className="hidden sm:block h-[100px] w-[200px]">
          <svg viewBox="0 0 200 100" className="h-full w-full">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9ed4ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#9ed4ff" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d="M10,70 C40,40 70,60 100,30 C130,0 160,50 190,20"
              fill="url(#areaGrad)"
              stroke="#9ed4ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="190" cy="20" r="4" fill="#6bb8f0" />
          </svg>
        </div>
      </div>
    </div>
  );
}
