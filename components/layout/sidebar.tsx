"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { LogoutButton } from "@/components/layout/logout-button";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/productos", label: "Productos", icon: Package },
  { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMobile]);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleNavClick = () => {
    closeMobile();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#1f1f1f] rounded-l-[28px]">
      <div className="flex items-center justify-center py-6">
        <Link
          href="/dashboard"
          onClick={handleNavClick}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5f0e8]"
        >
          <Package size={22} className="text-[#1f1f1f]" />
        </Link>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-1 px-3 py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              aria-label={item.label}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-150 group ${
                active
                  ? "bg-white/15 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-gray-200"
              }`}
            >
              {active && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-white" />
              )}
              <Icon size={20} />
              <span className="absolute left-full ml-3 rounded-lg bg-[#333] px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-center py-4 px-3">
        <LogoutButton />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menú"
        className="fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f1f1f] text-white lg:hidden"
      >
        <Menu size={20} />
      </button>

      <aside className="hidden lg:flex lg:w-[80px] lg:flex-shrink-0">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 sidebar-overlay-enter w-full border-0 cursor-default"
            onClick={closeMobile}
            aria-label="Cerrar menú"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[80px] sidebar-enter">
            <div className="relative h-full">
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Cerrar menú"
                className="absolute -right-10 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1f1f1f] shadow-lg"
              >
                <X size={20} />
              </button>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
