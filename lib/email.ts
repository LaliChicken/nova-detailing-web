import { SendEmailCommand } from "@aws-sdk/client-ses";
import { ses } from "@/lib/aws/clients";
import { requiredEnv } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import { getServiceById } from "@/data/services";
import { createPrivatePhotoViewUrl } from "@/lib/aws/media";
import type { Inquiry } from "@/types/inquiry";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmail(to: string, subject: string, html: string, text: string) {
  await ses.send(
    new SendEmailCommand({
      Source: requiredEnv("SES_FROM_ADDRESS"),
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
          Text: { Data: text, Charset: "UTF-8" },
        },
      },
    })
  );
}

export async function sendBusinessQuoteNotification(inquiry: Inquiry) {
  const recipient = process.env.NOTIFICATION_EMAIL || siteConfig.notificationEmail;
  const serviceName = getServiceById(inquiry.service)?.name || inquiry.service;
  const photoUrls = await Promise.all(inquiry.photoKeys.map(createPrivatePhotoViewUrl));

  const photoHtml = photoUrls.length
    ? `<ul>${photoUrls
        .map((url, index) => `<li><a href="${url}">Vehicle photo ${index + 1}</a> (link expires in 7 days)</li>`)
        .join("")}</ul>`
    : "<p>No vehicle photos were uploaded.</p>";

  const addOns = inquiry.addOns.length ? inquiry.addOns.join(", ") : "None";
  const message = inquiry.message || "None";

  const html = `
    <h1>New NOVA Detailing quote request</h1>
    <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
    <p><strong>Vehicle:</strong> ${escapeHtml(inquiry.vehicle)}</p>
    <p><strong>Service:</strong> ${escapeHtml(serviceName)}</p>
    <p><strong>Add-ons:</strong> ${escapeHtml(addOns)}</p>
    <p><strong>Location:</strong> ${escapeHtml(inquiry.location)}</p>
    <p><strong>Preferred contact:</strong> ${escapeHtml(inquiry.preferredContact)}</p>
    <p><strong>Message:</strong> ${escapeHtml(message)}</p>
    <h2>Photos</h2>
    ${photoHtml}
    <p><a href="sms:${escapeHtml(inquiry.phone)}">Text customer</a></p>
  `;

  const text = [
    "New NOVA Detailing quote request",
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.phone}`,
    `Email: ${inquiry.email}`,
    `Vehicle: ${inquiry.vehicle}`,
    `Service: ${serviceName}`,
    `Add-ons: ${addOns}`,
    `Location: ${inquiry.location}`,
    `Preferred contact: ${inquiry.preferredContact}`,
    `Message: ${message}`,
    ...photoUrls.map((url, index) => `Vehicle photo ${index + 1}: ${url}`),
  ].join("\n");

  await sendEmail(recipient, `New quote request — ${inquiry.vehicle}`, html, text);
}

export async function sendCustomerQuoteConfirmation(inquiry: Inquiry) {
  const serviceName = getServiceById(inquiry.service)?.name || inquiry.service;

  const html = `
    <h1>NOVA Detailing</h1>
    <p>Hi ${escapeHtml(inquiry.name)},</p>
    <p>We've received your quote request.</p>
    <p><strong>Vehicle:</strong> ${escapeHtml(inquiry.vehicle)}</p>
    <p><strong>Requested service:</strong> ${escapeHtml(serviceName)}</p>
    <p>This confirms your request only. Your appointment is not booked until NOVA contacts you and confirms the details and availability.</p>
    <p>For the fastest response, text us at <a href="sms:${siteConfig.phoneE164}">${siteConfig.phoneDisplay}</a>.</p>
    <p>— NOVA Detailing</p>
  `;

  const text = [
    `Hi ${inquiry.name},`,
    "",
    "We've received your NOVA Detailing quote request.",
    `Vehicle: ${inquiry.vehicle}`,
    `Requested service: ${serviceName}`,
    "",
    "This confirms your request only. Your appointment is not booked until NOVA contacts you and confirms the details and availability.",
    `For the fastest response, text ${siteConfig.phoneDisplay}.`,
    "",
    "— NOVA Detailing",
  ].join("\n");

  await sendEmail(inquiry.email, "We received your NOVA Detailing quote request", html, text);
}
