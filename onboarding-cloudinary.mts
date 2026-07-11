import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = process.env.CLOUDINARY_FOLDER ?? "perfumeria/productos";

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error("Internal error: Cloudinary");
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

async function main() {
  console.log("1. Subiendo imagen de demostración...\n");

  const result = await cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    {
      folder: FOLDER,
      public_id: `onboarding-test-${Date.now()}`,
    },
  );

  console.log(`   ✓ Imagen subida`);
  console.log(`   URL segura:  ${result.secure_url}`);
  console.log(`   Public ID:   ${result.public_id}\n`);

  console.log("2. Metadatos de la imagen:\n");

  const { width, height, format, bytes } = result;
  console.log(`   Ancho:       ${width}px`);
  console.log(`   Alto:        ${height}px`);
  console.log(`   Formato:     ${format}`);
  console.log(`   Peso:        ${bytes} bytes (${(bytes / 1024).toFixed(1)} KB)\n`);

  // f_auto: Cloudinary elige automáticamente el mejor formato según el navegador (WebP, AVIF, etc.)
  // q_auto: Cloudinary ajusta automáticamente la calidad para el mejor balance entre peso y nitidez
  const transformed = cloudinary.url(result.public_id, {
    transformation: [{ fetch_format: "auto", quality: "auto" }],
  });

  console.log("3. Transformación aplicada (f_auto + q_auto):\n");
  console.log(`   Done! Click link below to see optimized version of the image.`);
  console.log(`   Check the size and the format.\n`);
  console.log(`   ${transformed}\n`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
