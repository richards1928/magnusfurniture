import type { Product } from "../types";

export const mdTables: Product[] = [
  {
    id: "MAG-MDT-001",
    sku: "MAG-MDT-VBPRESTIGE",

    category: "MD Tables",

    name: "VB Prestige",

    shortDescription: "Premium executive MD table.",

    description:
      "Premium executive table designed for directors and managing offices.",

    material: "Engineered Wood",

    features: [],

    applications: [
      "Director Cabin",
      "Managing Director Office",
      "Executive Workspace"
    ],

    images: [],

    relatedProducts: [
      "MAG-MDT-002",
      "MAG-MDT-003"
    ],

    tags: [
      "Executive Table",
      "Office Furniture",
      "MD Table",
      "Director Desk"
    ],

    featured: true,

    status: "Active",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString()
  }
];