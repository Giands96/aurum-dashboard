"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SettingsFormState {
  success?: string;
  error?: string;
}

interface SettingsFormProps {
  action: (
    prevState: SettingsFormState,
    formData: FormData,
  ) => Promise<SettingsFormState>;
  initialData: {
    nombre_tienda: string;
    whatsapp: string;
    mensaje_whatsapp: string;
    instagram_url: string;
  };
}

export function SettingsForm({ action, initialData }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  const [nombreTienda, setNombreTienda] = useState(
    initialData.nombre_tienda,
  );
  const [whatsapp, setWhatsapp] = useState(initialData.whatsapp);
  const [mensaje, setMensaje] = useState(initialData.mensaje_whatsapp);
  const [instagram, setInstagram] = useState(initialData.instagram_url);

  const whatsappPreview = whatsapp.replace(/[\s+\-()]/g, "");
  const linkPreview =
    mensaje
      .replace("{nombre}", "Nombre del producto")
      .replace("{presentacion}", "100 ml")
      .replace("{precio}", "S/ 149.90")
      .replace("{url}", "https://...");

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <div className="rounded-[24px] bg-white border border-dashboard-border p-6 space-y-5">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Información de la tienda
        </h2>

        <Input
          id="nombre_tienda"
          name="nombre_tienda"
          label="Nombre de la tienda"
          value={nombreTienda}
          onChange={(e) => setNombreTienda(e.target.value)}
          placeholder="Ej: Perfumería Aurum"
        />
      </div>

      <div className="rounded-[24px] bg-white border border-dashboard-border p-6 space-y-5">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          WhatsApp
        </h2>

        <Input
          id="whatsapp"
          name="whatsapp"
          label="Número de WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="Ej: +51 999 888 777"
        />
        {whatsappPreview && (
          <p className="text-xs text-dashboard-text-secondary">
            Se guardará como: {whatsappPreview}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="mensaje_whatsapp"
            className="text-sm font-medium text-dashboard-text-primary"
          >
            Plantilla de mensaje
          </label>
          <textarea
            id="mensaje_whatsapp"
            name="mensaje_whatsapp"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={3}
            placeholder="Hola, quiero más info sobre {nombre}..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dashboard-text-primary placeholder:text-dashboard-text-secondary focus:outline-none focus:border-dashboard-accent focus:ring-2 focus:ring-dashboard-blue/50 transition-all resize-none"
          />
          <p className="text-xs text-dashboard-text-secondary">
            Placeholders: {"{nombre}"}, {"{presentacion}"}, {"{precio}"},
            {" {url}"}
          </p>
        </div>

        {mensaje && (
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs font-medium text-dashboard-text-secondary mb-1">
              Previsualización:
            </p>
            <p className="text-sm text-dashboard-text-primary break-words">
              {linkPreview}
            </p>
          </div>
        )}
      </div>

      <div className="rounded-[24px] bg-white border border-dashboard-border p-6 space-y-5">
        <h2 className="text-lg font-semibold text-dashboard-text-primary">
          Redes sociales
        </h2>

        <Input
          id="instagram_url"
          name="instagram_url"
          label="URL de Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="https://instagram.com/tuusuario"
        />
      </div>

      {state.success && (
        <div className="rounded-xl bg-green-50 p-3 text-sm text-dashboard-success">
          {state.success}
        </div>
      )}

      {state.error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-dashboard-danger">
          {state.error}
        </div>
      )}

      <Button type="submit" loading={pending} size="lg">
        Guardar configuración
      </Button>
    </form>
  );
}
