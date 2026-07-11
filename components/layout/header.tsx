"use client";

import { Search, Bell, ChevronDown } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
}

export function Header({ title, subtitle, userName, userRole }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-[28px] font-bold leading-tight text-dashboard-text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-dashboard-text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <button
          aria-label="Buscar"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-dashboard-text-secondary hover:bg-gray-200 transition-colors duration-150"
        >
          <Search size={18} />
        </button>

        <button
          aria-label="Notificaciones"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-dashboard-text-secondary hover:bg-gray-200 transition-colors duration-150"
        >
          <Bell size={18} />
        </button>

        {userName && (
          <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-1.5 cursor-default">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f1f1f] text-white text-xs font-medium">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-dashboard-text-primary leading-tight">
                {userName}
              </p>
              {userRole && (
                <p className="text-xs text-dashboard-text-secondary">
                  {userRole}
                </p>
              )}
            </div>
            <ChevronDown size={14} className="text-dashboard-text-secondary hidden md:block" />
          </div>
        )}
      </div>
    </header>
  );
}
