"use client";

import type { Product } from "@/lib/types";
import { ProductRow } from "@/components/dashboard/product-row";
import { useState } from "react";

interface ProductsTableProps {
  products: Product[];
  onToggleStatus: (id: number, currentActive: boolean) => void;
  onDelete: (id: number, name: string) => void;
}

export function ProductsTable({
  products,
  onToggleStatus,
  onDelete,
}: ProductsTableProps) {

  const [menuProductId, setMenuProductId] = useState<number | null>(null);


  const productSelected = products.find(
    product => product.id === menuProductId
  );


  if(products.length === 0){
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="font-medium text-dashboard-text-primary">
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

      <div className="
        overflow-x-auto
        rounded-2xl
        border
        border-dashboard-border
      ">

        <table className="w-full">

          <thead>
            <tr className="
              border-b
              border-dashboard-border
              bg-gray-50/50
            ">

              <th className="px-4 py-3 text-left text-xs uppercase">
                Producto
              </th>

              <th className="hidden md:table-cell px-4 py-3 text-left text-xs uppercase">
                Categoría
              </th>

              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs uppercase">
                Fecha
              </th>

              <th className="px-4 py-3 text-left text-xs uppercase">
                Estado
              </th>

              <th className="px-4 py-3 w-12">
                <span className="sr-only">
                  Acciones
                </span>
              </th>

            </tr>
          </thead>


          <tbody className="divide-y divide-dashboard-border">

            {
              products.map(product=>(
                <ProductRow
                  key={product.id}
                  product={product}
                  menuOpen={menuProductId === product.id}
                  onOpenMenu={()=>
                    setMenuProductId(
                      menuProductId === product.id
                      ? null
                      : product.id
                    )
                  }
                  onCloseMenu={()=>
                    setMenuProductId(null)
                  }
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              ))
            }

          </tbody>

        </table>

      </div>


      {
        productSelected && (
          <div
            className="
              fixed
              inset-0
              z-40
            "
            onClick={() => setMenuProductId(null)}
          />
        )
      }


    </>
  );
}