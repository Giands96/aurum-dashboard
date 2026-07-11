"use server";

import { revalidatePath } from "next/cache";
import { saveStoreSettings } from "@/features/settings/mutations";

interface SettingsState {
  success?: string;
  error?: string;
}

export async function saveSettings(
  _prevState: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const nombre_tienda = (formData.get("nombre_tienda") as string)?.trim();
  const whatsapp = (formData.get("whatsapp") as string)?.trim();
  const mensaje_whatsapp = (formData.get("mensaje_whatsapp") as string)?.trim();
  const instagram_url = (formData.get("instagram_url") as string)?.trim();

  if (!nombre_tienda) {
    return { error: "El nombre de la tienda es obligatorio" };
  }

  const normalizedWhatsapp = (whatsapp ?? "").replace(/[\s+\-()]/g, "");

  try {
    await saveStoreSettings({
      nombre_tienda,
      whatsapp: normalizedWhatsapp,
      mensaje_whatsapp: mensaje_whatsapp ?? "",
      instagram_url: instagram_url ?? "",
    });

    revalidatePath("/dashboard/configuracion");
    return { success: "Configuración guardada correctamente" };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Error al guardar la configuración",
    };
  }
}
