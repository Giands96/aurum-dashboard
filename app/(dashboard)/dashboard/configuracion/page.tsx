import { Header } from "@/components/layout/header";
import { createClient } from "@/lib/supabase/server";
import { getStoreSettings } from "@/features/settings/queries";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { saveSettings } from "@/features/settings/save-settings-action";

export default async function ConfiguracionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let settings;
  let error: string | null = null;

  try {
    settings = await getStoreSettings();
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Error al cargar configuración";
  }

  const initialData = {
    nombre_tienda: settings?.nombre_tienda ?? "",
    whatsapp: settings?.whatsapp ?? "",
    mensaje_whatsapp: settings?.mensaje_whatsapp ?? "",
    instagram_url: settings?.instagram_url ?? "",
  };

  return (
    <div>
      <Header
        title="Configuración"
        subtitle="Ajustes de la tienda y WhatsApp"
        userName={user?.email ?? "Admin"}
        userRole="Administrador"
      />

      <div className="px-6 pb-8">
        {error ? (
          <div className="rounded-2xl bg-red-50 p-4 text-sm text-dashboard-danger">
            <p className="font-medium">Error al cargar configuración</p>
            <p className="mt-1 text-dashboard-text-secondary">{error}</p>
          </div>
        ) : settings === null ? (
          <div className="rounded-2xl bg-yellow-50 p-4 text-sm text-dashboard-warning">
            <p>
              No se encontró configuración. Se creará al guardar por primera
              vez.
            </p>
          </div>
        ) : null}

        <div className="mt-6">
          <SettingsForm action={saveSettings} initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
