"use client";

import { useState, useCallback, useRef } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/dashboard/image-uploader";
import { generateSlug } from "@/lib/slug";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ImageData {
  url: string;
  public_id: string;
}

interface VariantData {
  id?: number;
  presentacion: string;
  precio: string;
  stock: string;
}

export interface ProductFormState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

interface ProductFormProps {
  action: (
    prevState: ProductFormState,
    formData: FormData,
  ) => Promise<ProductFormState>;
  productId?: string;
  initialData?: {
    nombre: string;
    slug: string;
    descripcion: string;
    marca: string;
    categoria: string;
    destacado: boolean;
    imagenes: ImageData[];
    variantes: VariantData[];
  };
  isEditing?: boolean;
}

export function ProductForm({
  action,
  productId,
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [nombre, setNombre] = useState(initialData?.nombre ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const autoSlug = useRef(!initialData?.slug);
  const [descripcion, setDescripcion] = useState(
    initialData?.descripcion ?? "",
  );
  const [marca, setMarca] = useState(initialData?.marca ?? "");
  const [categoria, setCategoria] = useState(
    initialData?.categoria ?? "perfume",
  );
  const [destacado, setDestacado] = useState(initialData?.destacado ?? false);
  const [imagenes, setImagenes] = useState<ImageData[]>(
    initialData?.imagenes ?? [],
  );
  const [variantes, setVariantes] = useState<VariantData[]>(
    initialData?.variantes ?? [{ presentacion: "", precio: "", stock: "0" }],
  );

  const handleNombreChange = useCallback(
    (value: string) => {
      setNombre(value);
      if (autoSlug.current) {
        setSlug(generateSlug(value));
      }
    },
    [],
  );

  const handleSlugChange = useCallback((value: string) => {
    setSlug(value);
    autoSlug.current = false;
  }, []);

  const updateVariante = useCallback(
    (i: number, field: keyof VariantData, value: string) => {
      setVariantes((prev) =>
        prev.map((v, j) => (j === i ? { ...v, [field]: value } : v)),
      );
    },
    [],
  );

  const addVariante = useCallback(() => {
    setVariantes((prev) => [
      ...prev,
      { presentacion: "", precio: "", stock: "0" },
    ]);
  }, []);

  const removeVariante = useCallback((i: number) => {
    setVariantes((prev) => prev.filter((_, j) => j !== i));
  }, []);

  const fieldErr = (name: string) => state.fieldErrors?.[name];

  return (
    <div className="px-6 pb-8">
      <div className="mb-6">
        <Link
          href="/dashboard/productos"
          className="inline-flex items-center gap-1.5 text-sm text-dashboard-text-secondary hover:text-dashboard-text-primary transition-colors"
        >
          <ArrowLeft size={16} /> Volver a productos
        </Link>
      </div>

      <form
        action={formAction}
        className="max-w-3xl space-y-8"
      >
        {productId && <input type="hidden" name="productId" value={productId} />}
        <input type="hidden" name="imagenes" value={JSON.stringify(imagenes)} />
        <input type="hidden" name="variantes" value={JSON.stringify(variantes)} />

        <div className="rounded-[24px] bg-white border border-dashboard-border p-6 space-y-5">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Información del producto
          </h2>

          <Input
            id="nombre"
            name="nombre"
            label="Nombre del producto"
            value={nombre}
            onChange={(e) => handleNombreChange(e.target.value)}
            placeholder="Ej: Acqua di Gio"
            error={fieldErr("nombre")}
          />

          <Input
            id="slug"
            name="slug"
            label="Slug (URL)"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="acqua-di-gio"
            error={fieldErr("slug")}
          />

          <Input
            id="marca"
            name="marca"
            label="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ej: Giorgio Armani"
          />

          <Input
            id="descripcion"
            name="descripcion"
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del producto..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="categoria"
                className="text-sm font-medium text-dashboard-text-primary"
              >
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-dashboard-text-primary focus:outline-none focus:border-dashboard-accent focus:ring-2 focus:ring-dashboard-blue/50 transition-all"
              >
                <option value="perfume">Perfume</option>
                <option value="reloj">Reloj</option>
              </select>
              {fieldErr("categoria") && (
                <p className="text-sm text-dashboard-danger">{fieldErr("categoria")}</p>
              )}
            </div>

            <div className="flex items-end gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="destacado"
                  value="true"
                  checked={destacado}
                  onChange={(e) => setDestacado(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-dashboard-accent focus:ring-dashboard-blue"
                />
                <span className="text-sm font-medium text-dashboard-text-primary">
                  Producto destacado
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] bg-white border border-dashboard-border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dashboard-text-primary">
            Imágenes
          </h2>
          <ImageUploader images={imagenes} onChange={setImagenes} />
          {fieldErr("imagenes") && (
            <p className="text-sm text-dashboard-danger">{fieldErr("imagenes")}</p>
          )}
        </div>

        <div className="rounded-[24px] bg-white border border-dashboard-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-dashboard-text-primary">
              Variantes
            </h2>
            <Button type="button" variant="ghost" size="sm" onClick={addVariante}>
              <Plus size={16} /> Agregar
            </Button>
          </div>

          {fieldErr("variantes") && (
            <p className="text-sm text-dashboard-danger">{fieldErr("variantes")}</p>
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
                    updateVariante(i, "presentacion", e.target.value)
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
                  onChange={(e) => updateVariante(i, "precio", e.target.value)}
                  error={fieldErr(`variante_${i}_precio`)}
                />
                <Input
                  id={`stock_${i}`}
                  placeholder="Stock"
                  type="number"
                  min="0"
                  value={v.stock}
                  onChange={(e) => updateVariante(i, "stock", e.target.value)}
                  error={fieldErr(`variante_${i}_stock`)}
                />
                {variantes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariante(i)}
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

        {state.error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-dashboard-danger">
            {state.error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={pending} size="lg">
            {isEditing ? "Guardar cambios" : "Crear producto"}
          </Button>
          <Link href="/dashboard/productos">
            <Button type="button" variant="ghost" size="lg">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
