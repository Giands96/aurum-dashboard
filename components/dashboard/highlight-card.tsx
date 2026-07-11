interface HighlightCardProps {
  title: string;
  highlighted: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export function HighlightCard({
  title,
  highlighted,
  description,
  actionLabel,
  actionHref,
}: HighlightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#1f1f1f] p-6 sm:p-8 text-white">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 300 300" className="h-full w-full">
          <circle cx="250" cy="30" r="60" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="250" cy="30" r="90" fill="none" stroke="white" strokeWidth="0.3" />
          <line x1="0" y1="250" x2="300" y2="50" stroke="white" strokeWidth="0.3" />
          <line x1="250" y1="0" x2="250" y2="300" stroke="white" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="relative">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="mt-2 text-[28px] font-bold">{highlighted}</p>
        <p className="mt-2 text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
        <a
          href={actionHref}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#dceeff] px-5 py-2.5 text-sm font-medium text-[#1f1f1f] hover:bg-[#c5e4ff] transition-colors"
        >
          {actionLabel}
        </a>
      </div>
    </div>
  );
}
