import { getProducts } from "@/features/products/queries";
import { ProductListClient } from "@/components/dashboard/product-list-client";
import type { Product } from "@/lib/types";

export default async function ProductosPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar productos";
    products = [];
  }

  if (error) {
    return (
      <div className="px-6 pb-8">
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-dashboard-danger">
          <p className="font-medium">Error al cargar productos</p>
          <p className="mt-1 text-dashboard-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return <ProductListClient initialProducts={products} />;
}
