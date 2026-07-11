import { Header } from "@/components/layout/header";

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header
        title="Productos"
        subtitle="Administrá el catálogo de perfumes y relojes"
      />
      {children}
    </div>
  );
}
