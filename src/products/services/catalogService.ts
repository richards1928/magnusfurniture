import catalog from "../catalog";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { useState, useEffect } from "react";

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
  hero?: string;
  thumbnail?: string;
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

const rawProducts: any[] = Object.values(catalog.products)
  .flat()
  .filter((p: any) => p && p.status !== "Inactive" && p.status !== "Draft" && !p._disabled);

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
    price: raw.price || 0,
    originalPrice: raw.originalPrice,
    description: raw.description || "",
    shortDescription: raw.shortDescription || "",
    dimensions: Array.isArray(raw.dimensions)
      ? raw.dimensions.join(", ")
      : raw.dimensions || "",
    material: Array.isArray(raw.materials)
      ? raw.materials.join(", ")
      : raw.materials || (Array.isArray(raw.material) ? raw.material.join(", ") : raw.material || ""),
    features: raw.features || [],
    images: raw.images?.gallery || [],
    hero: raw.images?.hero || (typeof raw.images === "string" ? raw.images : ""),
    thumbnail: raw.images?.thumbnail || (typeof raw.images === "string" ? raw.images : ""),
    badge: raw.badge || "",
    inStock: raw.status === "Active",
  };
}

// ── Map Supabase DB Product ──

function mapDbProduct(raw: any): Product {
  const images = Array.isArray(raw.images) ? raw.images : (typeof raw.images === "string" && raw.images ? [raw.images] : []);
  const hero = images[0] || "";
  const dims = raw.dimensions
    ? typeof raw.dimensions === "object"
      ? Object.entries(raw.dimensions)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ")
      : String(raw.dimensions)
    : "";

  return {
    id: raw.id,
    slug: raw.slug || toSlug(raw.name),
    name: raw.name,
    category: raw.category,
    categorySlug: toSlug(raw.category),
    price: Number(raw.price) || 0,
    originalPrice: raw.original_price ? Number(raw.original_price) : undefined,
    description: raw.description || "",
    shortDescription: raw.short_description || "",
    dimensions: dims,
    material: raw.specifications?.material || "",
    features: raw.specifications?.features
      ? Array.isArray(raw.specifications.features)
        ? raw.specifications.features
        : [raw.specifications.features]
      : [],
    images,
    hero,
    thumbnail: hero,
    badge: raw.badge || "",
    inStock: raw.status === "active",
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

// ── Live state & subscribers ──

let currentProducts: Product[] = rawProducts.map(mapProduct);
let currentCategories: Category[] = deriveCategories(currentProducts);
const listeners = new Set<() => void>();
let fetchPromise: Promise<any> | null = null;

export let products: Product[] = currentProducts;
export let categories: Category[] = currentCategories;

export async function fetchSupabaseCatalog(): Promise<{ products: Product[]; categories: Category[] }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { products: currentProducts, categories: currentCategories };
  }

  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const [catsRes, prodsRes] = await Promise.all([
        supabase.from("categories").select("*").eq("status", "active"),
        supabase.from("products").select("*").eq("status", "active"),
      ]);

      let mergedProducts = [...rawProducts.map(mapProduct)];
      if (prodsRes.data && prodsRes.data.length > 0) {
        const dbProds = prodsRes.data.map(mapDbProduct);
        const dbIds = new Set(dbProds.map(p => p.id));
        const dbSlugs = new Set(dbProds.map(p => p.slug));
        mergedProducts = [
          ...dbProds,
          ...mergedProducts.filter(p => !dbIds.has(p.id) && !dbSlugs.has(p.slug)),
        ];
      }

      let mergedCategories = deriveCategories(mergedProducts);
      if (catsRes.data && catsRes.data.length > 0) {
        catsRes.data.forEach((dbCat: any) => {
          const catSlug = dbCat.slug || toSlug(dbCat.name);
          const existingIdx = mergedCategories.findIndex(
            c => c.slug === catSlug || c.name.toLowerCase() === dbCat.name.toLowerCase()
          );
          const count = mergedProducts.filter(
            p => p.category.toLowerCase() === dbCat.name.toLowerCase() || p.categorySlug === catSlug
          ).length;

          const catObj: Category = {
            id: dbCat.id,
            slug: catSlug,
            name: dbCat.name,
            description: dbCat.description || "",
            icon: categoryIcons[dbCat.name] || "📦",
            productCount: count,
            image: dbCat.image || "",
          };

          if (existingIdx >= 0) {
            mergedCategories[existingIdx] = { ...mergedCategories[existingIdx], ...catObj };
          } else {
            mergedCategories.push(catObj);
          }
        });
      }

      currentProducts = mergedProducts;
      currentCategories = mergedCategories;
      products = currentProducts;
      categories = currentCategories;
      listeners.forEach(fn => fn());
      return { products: currentProducts, categories: currentCategories };
    } catch (err) {
      console.warn("[CatalogService] Failed to sync with Supabase:", err);
      return { products: currentProducts, categories: currentCategories };
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

// Auto-fetch on browser load
if (typeof window !== "undefined") {
  fetchSupabaseCatalog();
}

// ── React Hook for dynamic components ──

export function useCatalog() {
  const [data, setData] = useState({
    products: currentProducts,
    categories: currentCategories,
  });

  useEffect(() => {
    const onUpdate = () => {
      setData({
        products: [...currentProducts],
        categories: [...currentCategories],
      });
    };
    listeners.add(onUpdate);
    fetchSupabaseCatalog();
    return () => {
      listeners.delete(onUpdate);
    };
  }, []);

  return {
    products: data.products,
    categories: data.categories,
    getCategoryBySlug: (slug: string) => data.categories.find(c => c.slug === slug),
    getProductBySlug: (slug: string) => {
      if (!slug) return undefined;
      const normalized = slug.toLowerCase().trim();
      return data.products.find(p =>
        p.slug?.toLowerCase() === normalized ||
        p.id?.toLowerCase() === normalized ||
        toSlug(p.name) === normalized
      );
    },
    getProductsByCategory: (categorySlug: string) => {
      const category = data.categories.find(c => c.slug === categorySlug);
      if (category) {
        return data.products.filter(p => p.category.toLowerCase() === category.name.toLowerCase());
      }
      return data.products.filter(p => p.categorySlug === categorySlug);
    },
    getProductById: (id: string) => data.products.find(p => p.id === id),
  };
}

// ── Exported functions (synchronous compatibility fallback) ──

export function getCatalog() {
  return catalog;
}

export function getAllProducts(): Product[] {
  return currentProducts;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return currentCategories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return currentProducts.find((p) => 
    p.slug?.toLowerCase() === normalized || 
    p.id?.toLowerCase() === normalized || 
    toSlug(p.name) === normalized
  );
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug);
  if (category) {
    return currentProducts.filter((p) => p.category.toLowerCase() === category.name.toLowerCase());
  }
  return currentProducts.filter((p) => p.categorySlug === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return currentProducts.find((p) => p.id === id);
}