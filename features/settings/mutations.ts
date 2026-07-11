import { createClient } from "@/lib/supabase/server";
import type { StoreSettings } from "@/lib/types";

export async function saveStoreSettings(
  data: Pick<StoreSettings, "nombre_tienda" | "whatsapp" | "mensaje_whatsapp" | "instagram_url">,
): Promise<void> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("configuracion_tienda")
    .select("id")
    .eq("id", 1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("configuracion_tienda")
      .update(data)
      .eq("id", 1);

    if (error) throw new Error(`Error al guardar configuración: ${error.message}`);
  } else {
    const { error } = await supabase
      .from("configuracion_tienda")
      .insert({ id: 1, ...data });

    if (error) throw new Error(`Error al crear configuración: ${error.message}`);
  }
}
