export interface ProductDimensions {
  length?: string;
  width?: string;
  depth?: string;
  height?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  dimensions?: ProductDimensions;
  color?: string;
}

export interface Product {
  // Identity
  id: string;
  sku: string;

  // Classification
  category: string;
  subCategory?: string;

  // Basic Information
  name: string;
  shortDescription: string;
  description: string;

  // Product Details
  material?: string;
  dimensions?: ProductDimensions;
  features: string[];
  applications: string[];
  variants?: ProductVariant[];

  // Media
  images: string[];
  brochure?: string;

  // Relationships
  relatedProducts: string[];
  tags: string[];

  // Business
  featured: boolean;
  status: "Active" | "Inactive";

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Audit
  createdAt: string;
  updatedAt: string;
}