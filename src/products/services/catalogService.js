import catalog from "../catalog";

export function getCatalog() {
  return catalog;
}

export function getAllProducts() {
  return Object.values(catalog.products).flat();
}

export function getProductsByCategory(category: string) {
  return getAllProducts().filter(
    (product) => product.category === category
  );
}

export function getProductById(id: string) {
  return getAllProducts().find(
    (product) => product.id === id
  );
}