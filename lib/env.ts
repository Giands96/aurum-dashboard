function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get supabaseUrl() {
    return getEnv("NEXT_PUBLIC_SUPABASE_URL");
  },
  get supabasePublishableKey() {
    return getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  },
  get cloudinaryCloudName() {
    return getEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
  },
  get cloudinaryApiKey() {
    return getEnv("CLOUDINARY_API_KEY");
  },
  get cloudinaryApiSecret() {
    return getEnv("CLOUDINARY_API_SECRET");
  },
  get cloudinaryFolder() {
    return process.env.CLOUDINARY_FOLDER ?? "perfumeria/productos";
  },
  get catalogUrl() {
    return process.env.NEXT_PUBLIC_CATALOG_URL ?? "/";
  },
};
