import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export function Input({ className, error, label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-dashboard-text-primary"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-dashboard-text-primary placeholder:text-dashboard-text-secondary transition-all duration-150",
          "focus:outline-none focus:border-dashboard-accent focus:ring-2 focus:ring-dashboard-blue/50",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
          error && "border-dashboard-danger focus:border-dashboard-danger focus:ring-red-100",
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-dashboard-danger">{error}</p>}
    </div>
  );
}
