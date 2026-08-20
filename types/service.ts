export type ServiceId =
  | "interior"
  | "exterior"
  | "interior-exterior"
  | "premium";

export type AddOnId = "paint-correction" | "headlight-restoration";

export interface ServicePackage {
  id: ServiceId;
  name: string;
  price: number;
  description: string;
  features: string[];
  /** Highlights the package visually in service listings. */
  popular?: boolean;
}

export interface AddOn {
  id: AddOnId;
  name: string;
  priceLabel: string;
  description: string;
}
