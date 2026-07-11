import { createClient } from "@/lib/supabase/server";
import type { Product, ProductImage, ProductVariant } from "@/lib/types";

export async function createProductDraft(data: {
  nombre: string;
  slug: string;
  descripcion: string;
  marca: string;
  categoria: string;
  destacado: boolean;
}): Promise<Product> {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("productos")
    .insert({
      nombre: data.nombre,
      slug: data.slug,
      descripcion: data.descripcion,
      marca: data.marca,
      categoria: data.categoria,
      destacado: data.destacado,
      activo: false,
    })
    .select()
    .single();

  if (error) throw new Error(`Error al crear producto: ${error.message}`);

  return {
    ...(product as Product),
    imagenes: [],
  };
}

export async function updateProduct(
  id: number,
  data: Partial<Pick<Product, "nombre" | "slug" | "descripcion" | "marca" | "categoria" | "destacado" | "activo">>,
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("productos")
    .update(data)
    .eq("id", id);

  if (error) throw new Error(`Error al actualizar producto: ${error.message}`);
}

export async function toggleProductStatus(id: number, activo: boolean): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("productos")
    .update({ activo })
    .eq("id", id);

  if (error) throw new Error(`Error al cambiar estado: ${error.message}`);
}

export async function deleteProduct(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Error al eliminar producto: ${error.message}`);
}

export async function createProductImage(
  producto_id: number,
  url: string,
  public_id: string,
  orden: number,
): Promise<ProductImage> {
  const supabase = await createClient();
  const { data: image, error } = await supabase
    .from("producto_imagenes")
    .insert({ producto_id, url, public_id, orden })
    .select()
    .single();

  if (error) throw new Error(`Error al guardar imagen: ${error.message}`);
  return image as ProductImage;
}

async function deleteProductImages(producto_id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("producto_imagenes")
    .delete()
    .eq("producto_id", producto_id);

  if (error) throw new Error(`Error al eliminar imágenes: ${error.message}`);
}

export async function deleteProductImageById(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("producto_imagenes")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Error al eliminar imagen: ${error.message}`);
}

export async function createVariant(data: {
  producto_id: number;
  presentacion: string;
  precio: number;
  stock: number;
}): Promise<ProductVariant> {
  const supabase = await createClient();
  const { data: variant, error } = await supabase
    .from("producto_variantes")
    .insert({ ...data, activo: true })
    .select()
    .single();

  if (error) throw new Error(`Error al crear variante: ${error.message}`);
  return variant as ProductVariant;
}

export async function updateVariant(
  id: number,
  data: Partial<Pick<ProductVariant, "presentacion" | "precio" | "stock" | "activo">>,
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("producto_variantes")
    .update(data)
    .eq("id", id);

  if (error) throw new Error(`Error al actualizar variante: ${error.message}`);
}

export async function deleteVariant(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("producto_variantes")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Error al eliminar variante: ${error.message}`);
}
