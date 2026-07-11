export type ProductStatus = "active" | "inactive" | "draft";
export type Category = "perfume" | "reloj";

export interface ProductImage {
  id: number;
  producto_id: number;
  url: string;
  public_id: string;
  orden: number;
  created_at: string;
}

export interface Product {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  marca: string | null;
  categoria: Category;
  imagen_url: string | null;
  imagenes: ProductImage[];
  destacado: boolean;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: number;
  producto_id: number;
  presentacion: string;
  precio: number;
  stock: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithVariants extends Product {
  variantes: ProductVariant[];
}

export interface StoreSettings {
  id: number;
  nombre_tienda: string;
  whatsapp: string;
  mensaje_whatsapp: string;
  instagram_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardSummary {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  perfumes: number;
  relojes: number;
  outOfStock: number;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  variant: "blue" | "purple" | "green" | "yellow" | "pink";
}
