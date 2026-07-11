"use client";

import type { Product } from "@/lib/types";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatDate } from "@/lib/utils";
import { MoreVertical, Edit, Trash2, Power, PowerOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface ProductsTableProps {
  products: Product[];
  onToggleStatus: (id: number, currentActive: boolean) => void;
  onDelete: (id: number, name: string) => void;
}

interface MenuPosition {
  productId: number;
  x: number;
  y: number;
}

export function ProductsTable({
  products,
  onToggleStatus,
  onDelete,
}: ProductsTableProps) {
  const [menu, setMenu] = useState<MenuPosition | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = useCallback(
    (productId: number, e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenu({
        productId,
        x: rect.right - 176,
        y: rect.bottom + 4,
      });
    },
    [],
  );

  const closeMenu = useCallback(() => setMenu(null), []);

  const product = menu
    ? products.find((p) => p.id === menu.productId)
    : null;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-dashboard-text-secondary"
          >
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-dashboard-text-primary font-medium">
          No se encontraron productos
        </p>
        <p className="mt-1 text-sm text-dashboard-text-secondary">
          Creá tu primer producto para empezar
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={tableRef}
        className="overflow-x-auto rounded-2xl border border-dashboard-border"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-dashboard-border bg-gray-50/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-dashboard-text-secondary uppercase tracking-wider">
                Producto
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-dashboard-text-secondary uppercase tracking-wider">
                Categoría
              </th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-dashboard-text-secondary uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-dashboard-text-secondary uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-dashboard-text-secondary uppercase tracking-wider w-12">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashboard-border">
            {products.map((p) => (
              <tr
                key={p.id}
                className="bg-white hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.imagenes?.[0]?.url ? (
                      <Image
                        src={p.imagenes[0].url}
                        alt={p.nombre}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21,15 16,10 5,21" />
                        </svg>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-dashboard-text-primary truncate max-w-[180px]">
                        {p.nombre}
                      </p>
                      <p className="text-xs text-dashboard-text-secondary truncate max-w-[180px]">
                        {p.marca || "Sin marca"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 py-3">
                  <span className="text-sm text-dashboard-text-secondary capitalize">
                    {p.categoria}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-4 py-3">
                  <span className="text-sm text-dashboard-text-secondary">
                    {formatDate(p.created_at)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.activo ? "active" : "inactive"} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => handleOpenMenu(p.id, e)}
                    aria-label="Más acciones"
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {menu && product && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={closeMenu}
          />
          <div
            className="fixed z-50 w-44 rounded-xl border border-gray-200 bg-white shadow-lg py-1 animate-scale-in"
            style={{ left: menu.x, top: menu.y }}
          >
            <Link
              href={`/dashboard/productos/${product.id}/editar`}
              onClick={closeMenu}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-dashboard-text-primary hover:bg-gray-50"
            >
              <Edit size={14} /> Editar
            </Link>
            <button
              onClick={() => {
                onToggleStatus(product.id, product.activo);
                closeMenu();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-dashboard-text-primary hover:bg-gray-50"
            >
              {product.activo ? (
                <>
                  <PowerOff size={14} /> Desactivar
                </>
              ) : (
                <>
                  <Power size={14} /> Activar
                </>
              )}
            </button>
            <button
              onClick={() => {
                onDelete(product.id, product.nombre);
                closeMenu();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-dashboard-danger hover:bg-red-50"
            >
              <Trash2 size={14} /> Eliminar
            </button>
          </div>
        </>
      )}
    </>
  );
}
