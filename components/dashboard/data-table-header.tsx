"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface TableHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function DataTableHeader({
  searchValue,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
}: TableHeaderProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-dashboard-text-secondary"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre o marca..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-dashboard-text-primary placeholder:text-dashboard-text-secondary focus:outline-none focus:border-dashboard-accent focus:ring-2 focus:ring-dashboard-blue/50 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-dashboard-text-secondary hover:bg-gray-50 transition-colors h-10"
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>

          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filtrar por estado"
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-dashboard-text-primary focus:outline-none focus:border-dashboard-accent focus:ring-2 focus:ring-dashboard-blue/50"
          >
            <option value="">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="draft">Borradores</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="flex gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filtrar por categoría"
            className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm text-dashboard-text-primary focus:outline-none focus:border-dashboard-accent"
          >
            <option value="">Todas las categorías</option>
            <option value="perfume">Perfume</option>
            <option value="reloj">Reloj</option>
          </select>
        </div>
      )}
    </div>
  );
}
