"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/dashboard/products-table";
import { DataTableHeader } from "@/components/dashboard/data-table-header";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ProductListClientProps {
  initialProducts: Product[];
}

export function ProductListClient({ initialProducts }: ProductListClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          (p.marca && p.marca.toLowerCase().includes(q)),
      );
    }

    if (categoryFilter) {
      result = result.filter((p) => p.categoria === categoryFilter);
    }

    if (statusFilter === "active") {
      result = result.filter((p) => p.activo);
    } else if (statusFilter === "inactive") {
      result = result.filter((p) => !p.activo);
    }

    return result;
  }, [products, search, categoryFilter, statusFilter]);

  function handleApiError(res: Response) {
    if (res.status === 401) {
      router.push("/login?expired=1");
      return;
    }
    alert("Error en la operación. Reintentá.");
  }

  async function handleToggleStatus(id: number, currentActive: boolean) {
    const previous = products;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !currentActive } : p)),
    );

    try {
      const res = await fetch(`/api/products/${id}/toggle-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: !currentActive }),
      });
      if (!res.ok) {
        setProducts(previous);
        handleApiError(res);
        return;
      }
    } catch {
      setProducts(previous);
      alert("Error al cambiar el estado del producto");
    }
  }

  async function handleDelete(id: number, name: string) {
    const confirmed = window.confirm(
      `¿Eliminar "${name}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    const previous = products;
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setProducts(previous);
        handleApiError(res);
        return;
      }
    } catch {
      setProducts(previous);
      alert("Error al eliminar el producto");
    }
  }

  return (
    <div className="px-6 pb-8">
      <DataTableHeader
        searchValue={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="mt-4 mb-4 flex items-center justify-between">
        <p className="text-sm text-dashboard-text-secondary">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
        <Link href="/dashboard/productos/nuevo">
          <Button size="sm">
            <Plus size={16} /> Nuevo producto
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
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
            No hay productos todavía
          </p>
          <p className="mt-1 text-sm text-dashboard-text-secondary">
            Creá tu primer producto para empezar a vender
          </p>
          <Link href="/dashboard/productos/nuevo" className="mt-4">
            <Button>
              <Plus size={16} /> Crear primer producto
            </Button>
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-dashboard-text-primary font-medium">
            Sin resultados
          </p>
          <p className="mt-1 text-sm text-dashboard-text-secondary">
            Probá ajustar los filtros de búsqueda
          </p>
        </div>
      ) : (
        <ProductsTable
          products={filtered}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
