import { Header } from "@/components/layout/header";
import { SummaryCard } from "@/components/dashboard/sumary-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { HighlightCard } from "@/components/dashboard/highlight-card";
import { getDashboardSummary } from "@/features/products/queries";
import { createClient } from "@/lib/supabase/server";
import {
  Package,
  CheckCircle2,
  XCircle,
  SprayCan,
  Watch,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let summary;
  let error: string | null = null;

  try {
    summary = await getDashboardSummary();
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Error al cargar métricas";
  }

  const metrics = [
    {
      title: "Total productos",
      value: summary?.totalProducts ?? 0,
      description: "Perfumes y relojes",
      variant: "blue" as const,
      icon: <Package size={20} className="text-blue-600" />,
    },
    {
      title: "Activos",
      value: summary?.activeProducts ?? 0,
      variant: "green" as const,
      icon: <CheckCircle2 size={20} className="text-dashboard-success" />,
    },
    {
      title: "Inactivos",
      value: summary?.inactiveProducts ?? 0,
      variant: "purple" as const,
      icon: <XCircle size={20} className="text-purple-600" />,
    },
    {
      title: "Perfumes",
      value: summary?.perfumes ?? 0,
      variant: "pink" as const,
      icon: <SprayCan size={20} className="text-pink-600" />,
    },
    {
      title: "Relojes",
      value: summary?.relojes ?? 0,
      variant: "yellow" as const,
      icon: <Watch size={20} className="text-amber-600" />,
    },
    {
      title: "Sin stock",
      value: summary?.outOfStock ?? 0,
      description: "Variantes agotadas",
      variant: "pink" as const,
      icon: <PackageOpen size={20} className="text-pink-600" />,
    },
  ];

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Resumen general de tu catálogo"
        userName={user?.email ?? "Admin"}
        userRole="Administrador"
      />

      <div className="px-6 pb-8">
        {error ? (
          <div className="rounded-2xl bg-red-50 p-4 text-sm text-dashboard-danger">
            <p>{error}</p>
            <p className="mt-1 text-dashboard-text-secondary">
              Verifica que Supabase esté configurado correctamente.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SummaryCard
                  label="Productos en catálogo"
                  value={summary?.activeProducts ?? 0}
                  subtitle={`${summary?.totalProducts ?? 0} registrados en total · ${summary?.inactiveProducts ?? 0} inactivos`}
                  change="Resumen actualizado"
                />
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  {metrics.slice(1, 5).map((m) => (
                    <MetricCard
                      key={m.title}
                      metric={{
                        title: m.title,
                        value: m.value,
                        description: m.description,
                        variant: m.variant,
                      }}
                      icon={m.icon}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-dashboard-text-primary">
                      Acciones rápidas
                    </h2>
                    <p className="text-sm text-dashboard-text-secondary">
                      Administrá tu catálogo
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/dashboard/productos/nuevo"
                    className="flex items-center gap-3 rounded-xl border border-dashboard-border bg-white p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dceeff]">
                      <Package size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dashboard-text-primary">
                        Nuevo producto
                      </p>
                      <p className="text-xs text-dashboard-text-secondary">Agregar perfume o reloj</p>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/productos"
                    className="flex items-center gap-3 rounded-xl border border-dashboard-border bg-white p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5dfe7]">
                      <PackageOpen size={20} className="text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dashboard-text-primary">
                        Ver productos
                      </p>
                      <p className="text-xs text-dashboard-text-secondary">Gestionar catálogo</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-[320px]">
                <HighlightCard
                  title="Gestioná tu catálogo"
                  highlighted="Productos"
                  description="Creá, editá y organizá todos tus perfumes y relojes desde un solo lugar."
                  actionLabel="Ir a productos"
                  actionHref="/dashboard/productos"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
