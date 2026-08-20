import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "@/lib/aws/clients";
import type { GalleryJob, Review } from "@/types/content";

function sortByDisplayOrder<T extends { displayOrder?: number; createdAt?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (b.createdAt || "").localeCompare(a.createdAt || "");
  });
}

export async function listGalleryJobs(): Promise<GalleryJob[]> {
  const tableName = process.env.GALLERY_TABLE;
  if (!tableName) return [];

  const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
  const items = (result.Items || []) as GalleryJob[];
  return sortByDisplayOrder(items.filter((item) => item.published !== false));
}

export async function listReviews(): Promise<Review[]> {
  const tableName = process.env.REVIEWS_TABLE;
  if (!tableName) return [];

  const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
  const items = (result.Items || []) as Review[];
  return sortByDisplayOrder(items.filter((item) => item.published !== false));
}
