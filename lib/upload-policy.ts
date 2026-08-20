export const MAX_QUOTE_PHOTOS = 5;
export const MAX_QUOTE_PHOTO_BYTES = 10 * 1024 * 1024;

export const QUOTE_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export const quotePhotoTypeSet = new Set<string>(QUOTE_PHOTO_TYPES);
