import type { AddOnId, ServiceId } from "@/types/service";

export type ContactMethod = "text" | "phone" | "email";
export type InquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "QUOTED"
  | "BOOKED"
  | "COMPLETED"
  | "CANCELLED";

export interface Inquiry {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: ServiceId;
  addOns: AddOnId[];
  location: string;
  message?: string;
  preferredContact: ContactMethod;
  photoKeys: string[];
}
