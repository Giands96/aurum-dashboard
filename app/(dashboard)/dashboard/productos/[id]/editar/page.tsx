import { notFound } from "next/navigation";
import { getProductWithVariants } from "@/features/products/queries";
import { ProductForm } from "@/components/dashboard/product-form";
import { updateProductAction } from "@/features/products/update-product-action";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  const product = await getProductWithVariants(productId);

  if (!product) {
    notFound();
  }

  const initialData = {
    nombre: product.nombre,
    slug: product.slug,
    descripcion: product.descripcion ?? "",
    marca: product.marca ?? "",
    categoria: product.categoria,
    destacado: product.destacado ?? false,
    imagenes: product.imagenes ?? [],
    variantes: product.variantes.map((v) => ({
      id: v.id,
      presentacion: v.presentacion ?? "",
      precio: String(v.precio ?? 0),
      stock: String(v.stock ?? 0),
    })),
  };

  return (
    <ProductForm
      action={updateProductAction}
      productId={String(product.id)}
      initialData={initialData}
      isEditing
    />
  );
}
