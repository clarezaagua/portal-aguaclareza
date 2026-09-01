import { mkdir, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { randomUUID } from "crypto";
import { put, del } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_WIDTH = 1600;

// Em produção (Vercel) o disco é somente leitura, então as imagens vão para o
// Vercel Blob quando BLOB_READ_WRITE_TOKEN estiver configurado. Em desenvolvimento
// local, sem essa variável, salva direto em public/uploads.
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

export async function saveUploadedImage(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(bytes)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const filename = `${randomUUID()}.webp`;

  if (useBlob) {
    const blob = await put(`uploads/${filename}`, webp, {
      access: "public",
      contentType: "image/webp",
    });
    return blob.url;
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  await sharp(webp).toFile(path.join(UPLOAD_DIR, filename));
  return `/uploads/${filename}`;
}

export async function deleteImageFile(url: string | null | undefined): Promise<void> {
  if (!url) return;

  if (url.startsWith("https://") && url.includes(".public.blob.vercel-storage.com/")) {
    try {
      await del(url);
    } catch {
      // já pode ter sido removido — ignora
    }
    return;
  }

  if (!url.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", url);
  try {
    await unlink(filePath);
  } catch {
    // arquivo já pode ter sido removido — ignora
  }
}
