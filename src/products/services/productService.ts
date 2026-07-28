import type { Product } from "../types";
import { mdTables } from "../data/mdTables";

class ProductService {
  private products: Product[] = [
    ...mdTables,
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  searchProducts(query: string): Product[] {
    const search = query.toLowerCase();

    return this.products.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.tags.some(tag => tag.toLowerCase().includes(search))
    );
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter(product => product.featured);
  }
}

export const productService = new ProductService();