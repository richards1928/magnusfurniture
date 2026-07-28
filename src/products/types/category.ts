export interface ProductCategory {
  id: string;
  name: string;
  slug: string;

  description: string;

  icon?: string;

  featuredImage?: string;

  sortOrder: number;

  active: boolean;
}