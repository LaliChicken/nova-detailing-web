import type { AddOn, ServicePackage } from "@/types/service";

// Package inclusions are intentionally easy to edit once NOVA confirms them.
export const services: ServicePackage[] = [
  {
    id: "interior",
    name: "Interior Detail",
    price: 70,
    description: "Interior detailing package. Full inclusion list to be confirmed.",
    features: [],
  },
  {
    id: "exterior",
    name: "Exterior Detail",
    price: 70,
    description: "Exterior detailing package. Full inclusion list to be confirmed.",
    features: [],
  },
  {
    id: "interior-exterior",
    name: "Interior + Exterior Detail",
    price: 100,
    description:
      "Combined interior and exterior detailing package. Full inclusion list to be confirmed.",
    features: [],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Detail",
    price: 200,
    description: "Premium detailing package. Full inclusion list to be confirmed.",
    features: [],
  },
];

export const addOns: AddOn[] = [
  {
    id: "paint-correction",
    name: "Paint Correction",
    priceLabel: "Custom quote",
    description: "Available as an add-on. Final scope is confirmed directly with NOVA.",
  },
  {
    id: "headlight-restoration",
    name: "Headlight Restoration",
    priceLabel: "Custom quote",
    description: "Available as an add-on. Final scope is confirmed directly with NOVA.",
  },
];

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}
