"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, AlertCircle } from "lucide-react";

interface ImageData {
  url: string;
  public_id: string;
}

interface ImageUploaderProps {
  images: ImageData[];
  onChange: (images: ImageData[]) => void;
}

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const MAX_IMAGES = 4;

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const file = files[0];

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Solo se permiten imágenes PNG y JPG");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no debe superar los 5 MB");
        return;
      }

      if (images.length >= MAX_IMAGES) {
        setError(`Máximo ${MAX_IMAGES} imágenes por producto`);
        return;
      }

      setError("");
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Error al subir");
        }

        onChange([...images, { url: data.url, public_id: data.public_id }]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al subir la imagen",
        );
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [images, onChange],
  );

  const handleRemove = useCallback(
    async (index: number) => {
      const img = images[index];
      try {
        await fetch("/api/cloudinary/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: img.public_id }),
        });
      } catch {
        // proceed with removal even if delete fails
      }
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    },
    [images, onChange],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={img.public_id} className="relative group">
            <Image
              src={img.url}
              alt={`Imagen ${i + 1}`}
              width={100}
              height={100}
              className="h-[100px] w-[100px] rounded-xl object-cover border border-gray-200"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-dashboard-danger hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex h-[100px] w-[100px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-dashboard-accent hover:text-dashboard-accent transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <svg
                className="animate-spin h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <>
                <Upload size={22} />
                <span className="text-xs">Subir</span>
              </>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-dashboard-danger">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <p className="mt-2 text-xs text-dashboard-text-secondary">
        PNG o JPG, máximo 5 MB cada una. {images.length}/{MAX_IMAGES} imágenes
      </p>
    </div>
  );
}
