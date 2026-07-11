import { createClient } from "@/lib/supabase/server";
import type { StoreSettings } from "@/lib/types";

export async function getStoreSettings(): Promise<StoreSettings | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("configuracion_tienda")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) return null;
  return data as StoreSettings;
}
