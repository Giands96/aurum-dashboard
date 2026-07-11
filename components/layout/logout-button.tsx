"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/actions";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => logout()}
      aria-label="Cerrar sesión"
      className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-400 hover:bg-white/10 hover:text-gray-200 transition-all duration-150 group relative"
    >
      <LogOut size={20} />
      <span className="absolute left-full ml-3 rounded-lg bg-[#333] px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
        Cerrar sesión
      </span>
    </button>
  );
}
