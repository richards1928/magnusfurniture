import catalog from "../catalog";

// ── Compatibility types matching src/data/products.ts ──

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  dimensions: string;
  material: string;
  features: string[];
  images: string[];
  badge?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  image: string;
}

// ── Raw catalog data ──

const rawProducts: any[] = Object.values(catalog.products).flat();

// ── Category icon mapping ──

const categoryIcons: Record<string, string> = {
  "MD Tables": "🖥️",
  "Manager Tables": "🖥️",
  "Workstations": "💻",
  "Conference Tables": "🤝",
  "Reception Tables": "🏢",
  "Storages and Pedestals": "🗄️",
  "Discussion Tables": "🤝",
  "Executive Chairs": "💺",
  "Visitor Chairs": "🪑",
  "Cafeteria Furniture": "☕",
  "High Counter Tables": "🖥️",
};

// ── Slug generation ──

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ── Map catalog product to legacy Product shape ──

function mapProduct(raw: any): Product {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    category: raw.category,
    categorySlug: toSlug(raw.category),
    price: 0,
    description: raw.description || "",
    shortDescription: raw.shortDescription || "",
    dimensions: Array.isArray(raw.dimensions)
      ? raw.dimensions.join(", ")
      : raw.dimensions || "",
    material: Array.isArray(raw.materials)
      ? raw.materials.join(", ")
      : raw.materials || "",
    features: raw.features || [],
    images: raw.images?.gallery || [],
    inStock: raw.status === "Active",
  };
}

// ── Derive categories from products ──

function deriveCategories(mappedProducts: Product[]): Category[] {
  const categoryMap = new Map<string, number>();
  mappedProducts.forEach((p) => {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
  });

  let id = 1;
  const cats: Category[] = [];
  categoryMap.forEach((count, name) => {
    cats.push({
      id: String(id++),
      slug: toSlug(name),
      name,
      description: "",
      icon: categoryIcons[name] || "📦",
      productCount: count,
      image: "",
    });
  });

  // Enrich descriptions from categories.json where available
  const catalogCats = catalog.categories as any[];
  cats.forEach((cat) => {
    const match = catalogCats.find(
      (c: any) => c.slug === cat.slug || c.name === cat.name
    );
    if (match && match.description) {
      cat.description = match.description;
    }
  });

  return cats;
}

// ── Exported data ──

export const products: Product[] = rawProducts.map(mapProduct);
export const categories: Category[] = deriveCategories(products);

// ── Exported functions ──

export function getCatalog() {
  return catalog;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug);
  if (category) {
    return products.filter((p) => p.category === category.name);
  }
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}