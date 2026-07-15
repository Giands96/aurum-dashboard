"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";

export interface VariantData {
  id?: number;
  presentacion: string;
  precio: string;
  stock: string;
}

interface ProductVariantsSectionProps {
  variantes: VariantData[];
  onUpdateVariante: (
    i: number,
    field: keyof VariantData,
    value: string,
  ) => void;
  onAddVariante: () => void;
  onRemoveVariante: (i: number) => void;
  fieldErr: (name: string) => string | undefined;
}

export function ProductVariantsSection({
  variantes,
  onUpdateVariante,
  onAddVariante,
  onRemoveVariante,
  fieldErr,
}: ProductVariantsSectionProps) {
  return (
    <div className="rounded-[24px] bg-white border border-dashboard-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Variantes
        </h2>
        <Button type="button" variant="ghost" size="sm" onClick={onAddVariante}>
          <Plus size={16} /> Agregar
        </Button>
      </div>

      {fieldErr("variantes") && (
        <p className="text-sm text-dashboard-danger">
          {fieldErr("variantes")}
        </p>
      )}

      <div className="space-y-3">
        {variantes.map((v, i) => (
          <div
            key={v.id ?? i}
            className="grid grid-cols-[1fr_120px_80px_36px] gap-3 items-start"
          >
            <Input
              id={`variante_${i}_presentacion`}
              name={`variante_${i}_presentacion`}
              placeholder="Presentación (ej: 100 ml)"
              value={v.presentacion}
              onChange={(e) =>
                onUpdateVariante(i, "presentacion", e.target.value)
              }
              error={fieldErr(`variante_${i}_presentacion`)}
            />
            <Input
              id={`precio_${i}`}
              placeholder="Precio"
              type="number"
              step="0.01"
              min="0"
              value={v.precio}
              onChange={(e) => onUpdateVariante(i, "precio", e.target.value)}
              error={fieldErr(`variante_${i}_precio`)}
            />
            <Input
              id={`stock_${i}`}
              placeholder="Stock"
              type="number"
              min="0"
              value={v.stock}
              onChange={(e) => onUpdateVariante(i, "stock", e.target.value)}
              error={fieldErr(`variante_${i}_stock`)}
            />
            {variantes.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveVariante(i)}
                aria-label="Eliminar variante"
                className="flex h-11 w-9 items-center justify-center rounded-xl text-dashboard-text-secondary hover:text-dashboard-danger hover:bg-red-50 transition-colors mt-0"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
