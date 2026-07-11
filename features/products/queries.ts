import { createClient } from "@/lib/supabase/server";
import type { Product, ProductImage, ProductVariant, ProductWithVariants, DashboardSummary } from "@/lib/types";

async function attachImages(supabase: Awaited<ReturnType<typeof createClient>>, products: (Omit<Product, "imagenes"> & { imagenes?: ProductImage[] })[]): Promise<Product[]> {
  if (products.length === 0) return [];

  const ids = products.map((p) => p.id);
  const { data: images } = await supabase
    .from("producto_imagenes")
    .select("*")
    .in("producto_id", ids)
    .order("orden", { ascending: true });

  const imageMap = new Map<number, ProductImage[]>();
  for (const img of (images ?? [])) {
    const list = imageMap.get(img.producto_id) ?? [];
    list.push(img as ProductImage);
    imageMap.set(img.producto_id, list);
  }

  return products.map((p) => ({
    ...p,
    imagenes: imageMap.get(p.id) ?? [],
  })) as Product[];
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`Error al obtener productos: ${error.message}`);
  return attachImages(supabase, (data ?? []) as Product[]);
}

export async function getProductById(id: number): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const result = await attachImages(supabase, [data as Product]);
  return result[0] ?? null;
}

export async function getProductWithVariants(
  id: number,
): Promise<ProductWithVariants | null> {
  const supabase = await createClient();
  const { data: product, error: productError } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (productError || !product) return null;

  const { data: variants, error: variantsError } = await supabase
    .from("producto_variantes")
    .select("*")
    .eq("producto_id", id)
    .order("created_at", { ascending: true });

  if (variantsError) throw new Error(`Error al obtener variantes: ${variantsError.message}`);

  const withImages = await attachImages(supabase, [product as Product]);

  return {
    ...withImages[0],
    variantes: (variants ?? []) as ProductVariant[],
  };
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("productos")
    .select("activo, categoria");

  if (error) throw new Error(`Error al obtener resumen: ${error.message}`);

  const arr = products ?? [];
  const totalProducts = arr.length;
  const activeProducts = arr.filter((p) => p.activo).length;
  const inactiveProducts = totalProducts - activeProducts;
  const perfumes = arr.filter((p) => p.categoria === "perfume").length;
  const relojes = arr.filter((p) => p.categoria === "reloj").length;

  const { data: variants, error: variantError } = await supabase
    .from("producto_variantes")
    .select("stock");

  if (variantError) throw new Error(`Error al obtener stock: ${variantError.message}`);

  const outOfStock = (variants ?? []).filter((v) => v.stock === 0).length;

  return {
    totalProducts,
    activeProducts,
    inactiveProducts,
    perfumes,
    relojes,
    outOfStock,
  };
}
