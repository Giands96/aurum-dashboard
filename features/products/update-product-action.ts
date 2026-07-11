"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  updateProduct,
  createVariant,
  updateVariant,
  deleteVariant,
  createProductImage,
  deleteProductImageById,
} from "@/features/products/mutations";
import { getProductWithVariants } from "@/features/products/queries";

interface ProductImage {
  url: string;
  public_id: string;
}

interface VariantInput {
  id?: number;
  presentacion: string;
  precio: string;
  stock: string;
}

interface UpdateProductState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function updateProductAction(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const productIdRaw = (formData.get("productId") as string)?.trim();
  const productId = Number(productIdRaw);
  const nombre = (formData.get("nombre") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const descripcion = (formData.get("descripcion") as string)?.trim();
  const marca = (formData.get("marca") as string)?.trim();
  const categoria = (formData.get("categoria") as string)?.trim();
  const destacado = formData.get("destacado") === "true";
  const imagenesJson = (formData.get("imagenes") as string) ?? "[]";
  const variantesJson = (formData.get("variantes") as string) ?? "[]";

  const fieldErrors: Record<string, string> = {};

  if (isNaN(productId)) return { error: "ID de producto no encontrado" };
  if (!nombre) fieldErrors.nombre = "El nombre es obligatorio";
  if (!slug) fieldErrors.slug = "El slug es obligatorio";
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fieldErrors.slug = "Slug inválido: solo minúsculas, números y guiones";
  }
  if (!categoria || !["perfume", "reloj"].includes(categoria)) {
    fieldErrors.categoria = "Categoría inválida";
  }

  let imagenes: ProductImage[];
  try {
    imagenes = JSON.parse(imagenesJson);
  } catch {
    fieldErrors.imagenes = "Error al procesar imágenes";
    imagenes = [];
  }

  if (imagenes.length > 4) {
    fieldErrors.imagenes = "Máximo 4 imágenes por producto";
  }

  let variantes: VariantInput[];
  try {
    variantes = JSON.parse(variantesJson);
  } catch {
    fieldErrors.variantes = "Error al procesar variantes";
    variantes = [];
  }

  if (variantes.length === 0) {
    fieldErrors.variantes = "Agregá al menos una variante";
  }

  for (let i = 0; i < variantes.length; i++) {
    const v = variantes[i];
    if (!v.presentacion?.trim()) {
      fieldErrors[`variante_${i}_presentacion`] = "Presentación obligatoria";
    }
    const precio = parseFloat(v.precio);
    if (isNaN(precio) || precio < 0) {
      fieldErrors[`variante_${i}_precio`] = "Precio inválido";
    }
    const stock = parseInt(v.stock);
    if (isNaN(stock) || stock < 0) {
      fieldErrors[`variante_${i}_stock`] = "Stock inválido";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Corregí los errores del formulario", fieldErrors };
  }

  try {
    const existing = await getProductWithVariants(productId);
    if (!existing) return { error: "Producto no encontrado" };

    await updateProduct(productId, {
      nombre: nombre!,
      slug: slug!,
      descripcion: descripcion || "",
      marca: marca || "",
      categoria: categoria as "perfume" | "reloj",
      destacado,
    });

    const existingPublicIds = new Set(existing.imagenes.map((img) => img.public_id));
    const submittedPublicIds = new Set(imagenes.map((img) => img.public_id));

    for (const img of existing.imagenes) {
      if (!submittedPublicIds.has(img.public_id)) {
        await deleteProductImageById(img.id);
      }
    }

    for (let i = 0; i < imagenes.length; i++) {
      if (!existingPublicIds.has(imagenes[i].public_id)) {
        await createProductImage(
          productId,
          imagenes[i].url,
          imagenes[i].public_id,
          i,
        );
      }
    }

    const existingVariantIds = new Set(existing.variantes.map((v) => v.id));

    for (const v of variantes) {
      if (v.id !== undefined && existingVariantIds.has(v.id)) {
        await updateVariant(v.id, {
          presentacion: v.presentacion.trim(),
          precio: parseFloat(v.precio),
          stock: parseInt(v.stock),
        });
        existingVariantIds.delete(v.id);
      } else {
        await createVariant({
          producto_id: productId,
          presentacion: v.presentacion.trim(),
          precio: parseFloat(v.precio),
          stock: parseInt(v.stock),
        });
      }
    }

    for (const oldId of existingVariantIds) {
      await deleteVariant(oldId);
    }
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Error al actualizar el producto",
    };
  }

  revalidatePath("/dashboard/productos");
  redirect("/dashboard/productos");
}
