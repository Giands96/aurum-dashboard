import { ProductForm } from "@/components/dashboard/product-form";
import { createProduct } from "@/features/products/create-product-action";

export default function NuevoProductoPage() {
  return <ProductForm action={createProduct} />;
}
