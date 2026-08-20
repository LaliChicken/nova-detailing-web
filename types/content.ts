import type { ServiceId } from "@/types/service";

export interface GalleryJob {
  id: string;
  title: string;
  vehicle?: string;
  service?: ServiceId;
  description?: string;
  beforeImages?: string[];
  afterImages?: string[];
  otherImages?: string[];
  featured?: boolean;
  published?: boolean;
  displayOrder?: number;
  createdAt?: string;
}

export interface Review {
  id: string;
  customerName: string;
  text: string;
  rating?: number;
  vehicle?: string;
  featured?: boolean;
  published?: boolean;
  displayOrder?: number;
  createdAt?: string;
}
