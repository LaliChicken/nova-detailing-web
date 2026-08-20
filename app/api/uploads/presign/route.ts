import { NextResponse } from "next/server";
import { z } from "zod";
import { createQuoteUploadUrl, validateUpload } from "@/lib/aws/media";

const uploadSchema = z.object({
  contentType: z.string().min(1),
  size: z.number().int().positive(),
});

export async function POST(request: Request) {
  try {
    const input = uploadSchema.parse(await request.json());
    validateUpload(input.contentType, input.size);
    const upload = await createQuoteUploadUrl(input.contentType);
    return NextResponse.json(upload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create upload URL.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
