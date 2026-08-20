import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/aws/clients";
import { requiredEnv } from "@/lib/env";
import { MAX_QUOTE_PHOTO_BYTES, quotePhotoTypeSet } from "@/lib/upload-policy";

const extensionByType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
};

export function validateUpload(contentType: string, size: number) {
  if (!quotePhotoTypeSet.has(contentType)) {
    throw new Error("Unsupported image type.");
  }
  if (!Number.isFinite(size) || size <= 0 || size > MAX_QUOTE_PHOTO_BYTES) {
    throw new Error("Each image must be 10 MB or smaller.");
  }
}

export async function createQuoteUploadUrl(contentType: string) {
  const extension = extensionByType[contentType] || "jpg";
  const key = `quotes/${crypto.randomUUID()}/${crypto.randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: requiredEnv("MEDIA_BUCKET"),
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 5 * 60 });
  return { key, url };
}

export async function createPrivatePhotoViewUrl(key: string) {
  if (!key.startsWith("quotes/")) {
    throw new Error("Invalid quote photo key.");
  }

  return getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: requiredEnv("MEDIA_BUCKET"),
      Key: key,
    }),
    { expiresIn: 7 * 24 * 60 * 60 }
  );
}
