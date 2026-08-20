# NOVA Detailing — website scaffold

This repository is the first functional implementation pass for the NOVA Detailing website.

## Current scope

Implemented:

- Next.js App Router + TypeScript
- Tailwind structural styling (intentionally minimal; visual design comes later)
- Public routes:
  - `/`
  - `/services`
  - `/gallery`
  - `/reviews`
  - `/quote`
  - `/quote/success`
  - `/contact`
  - `/privacy`
- Persistent mobile Text / Quote / Call actions
- Fixed package prices ($70 / $70 / $100 / $200)
- Optional paint-correction and headlight-restoration add-ons
- Quote form with optional photo uploads
- Presigned private S3 uploads
- DynamoDB inquiry persistence
- Business quote notification email to `novadetailing17@gmail.com`
- Automatic customer confirmation email
- Public gallery/review reads from DynamoDB
- Robots + sitemap
- Admin route shells that are disabled by default

## Intentionally unfinished

- Final package inclusion lists (waiting on NOVA)
- Final rescheduling-policy wording (fee vs credited deposit)
- Visual design / animation system
- Logo asset integration (asset exists but has not been supplied in this project yet)
- Cognito login + authorization
- Admin CRUD operations
- Gallery image rendering / lightbox / before-after slider
- Final legal privacy policy
- Spam controls beyond a honeypot (add rate limiting / WAF before production if needed)
- CNN quote estimator (future data/model phase)

## Development

```bash
cp .env.example .env.local
npm install
npm run dev
```

The public pages render locally even without AWS environment variables. The quote submission API requires the AWS resources/environment variables from the CloudFormation stack.

## AWS environment variables

The CloudFormation template supplies these in Amplify:

- `INQUIRIES_TABLE`
- `GALLERY_TABLE`
- `REVIEWS_TABLE`
- `MEDIA_BUCKET`
- `NEXT_PUBLIC_MEDIA_CDN_URL`
- `NEXT_PUBLIC_COGNITO_USER_POOL_ID`
- `NEXT_PUBLIC_COGNITO_CLIENT_ID`
- `NEXT_PUBLIC_BUSINESS_PHONE`
- `NEXT_PUBLIC_SITE_URL`
- `NOTIFICATION_EMAIL`
- `SES_FROM_ADDRESS`

Amplify supplies AWS runtime credentials to the SSR compute role; do not put long-lived AWS keys in the app.

## SES

`novadetailing17@gmail.com` is the notification recipient. The `SES_FROM_ADDRESS` must be a verified SES identity. Customer confirmations are also sent from that address.

During SES sandbox mode, recipient restrictions apply. Move SES production sending out of the sandbox before launch.

## Admin safety

`/admin` is deliberately unavailable unless:

```env
ENABLE_ADMIN_UI=true
```

This flag is **not authentication**. Do not enable it in production until Cognito authentication and server-side authorization checks have been implemented.

## Package data

Edit `data/services.ts` when NOVA sends the package inclusions. UI components read from that single source, so no page rewrite should be needed.

## Quote photo flow

1. Browser asks `/api/uploads/presign` for a signed S3 PUT URL.
2. Browser uploads the photo directly to the private S3 bucket.
3. Browser sends the resulting private S3 keys to `/api/quote`.
4. Server validates and stores the inquiry in DynamoDB.
5. Server sends NOVA a notification email and the customer a confirmation email.
6. Business notification includes temporary signed links to the private photos.

Quote-photo keys are never made public through the gallery CDN.
