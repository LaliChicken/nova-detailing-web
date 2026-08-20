import { NextResponse } from "next/server";
import { z } from "zod";
import { createInquiry } from "@/lib/aws/inquiries";
import { sendBusinessQuoteNotification, sendCustomerQuoteConfirmation } from "@/lib/email";
import { MAX_QUOTE_PHOTOS } from "@/lib/upload-policy";
import type { Inquiry } from "@/types/inquiry";

const serviceIds = ["interior", "exterior", "interior-exterior", "premium"] as const;
const addOnIds = ["paint-correction", "headlight-restoration"] as const;
const contactMethods = ["text", "phone", "email"] as const;

const quoteSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(254),
  vehicle: z.string().trim().min(2).max(120),
  service: z.enum(serviceIds),
  addOns: z.array(z.enum(addOnIds)).max(2).default([]),
  location: z.string().trim().min(2).max(120),
  message: z.string().trim().max(1500).optional().default(""),
  preferredContact: z.enum(contactMethods),
  photoKeys: z
    .array(z.string().regex(/^quotes\/[a-f0-9-]+\/[a-f0-9-]+\.(jpg|png|webp|heic|heif)$/i))
    .max(MAX_QUOTE_PHOTOS)
    .default([]),
  companyWebsite: z.string().max(200).optional().default(""),
});

export async function POST(request: Request) {
  try {
    const input = quoteSchema.parse(await request.json());

    // Honeypot: bots that fill the hidden field receive a non-revealing success response.
    if (input.companyWebsite) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const inquiry: Inquiry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "NEW",
      name: input.name,
      phone: input.phone,
      email: input.email,
      vehicle: input.vehicle,
      service: input.service,
      addOns: input.addOns,
      location: input.location,
      message: input.message || undefined,
      preferredContact: input.preferredContact,
      photoKeys: input.photoKeys,
    };

    await createInquiry(inquiry);

    // A stored lead is more important than email delivery. Don't encourage duplicate
    // submissions if SES has a transient failure after DynamoDB succeeds.
    const notifications = await Promise.allSettled([
      sendBusinessQuoteNotification(inquiry),
      sendCustomerQuoteConfirmation(inquiry),
    ]);

    notifications.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(index === 0 ? "Business email failed" : "Customer email failed", result.reason);
      }
    });

    return NextResponse.json(
      {
        ok: true,
        inquiryId: inquiry.id,
        notificationsDelivered: notifications.every((result) => result.status === "fulfilled"),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quote request failed", error);
    const message = error instanceof z.ZodError ? "Please check the form and try again." : "Unable to submit your request right now.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
