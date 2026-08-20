export const siteConfig = {
  name: "NOVA Detailing",
  description:
    "Professional mobile auto detailing across the San Francisco Bay Area, from San Francisco to San Jose.",
  phoneE164: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+12137008395",
  phoneDisplay: "213-700-8395",
  socialUrl: "https://linktr.ee/novadetailing17",
  notificationEmail: "novadetailing17@gmail.com",
  serviceArea: "San Francisco Bay Area — San Francisco to San Jose",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const smsHref = `sms:${siteConfig.phoneE164}?body=${encodeURIComponent(
  "Hi NOVA Detailing, I'd like to get a quote for my vehicle."
)}`;

export const callHref = `tel:${siteConfig.phoneE164}`;
