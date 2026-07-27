import { storage } from './storage';
import type { AdminProduct } from '../types/admin.types';

const COLLECTION = 'products';

export const productsService = {
  async getAll(): Promise<AdminProduct[]> {
    return storage.getAll<AdminProduct>(COLLECTION);
  },

  async getById(id: string): Promise<AdminProduct | null> {
    return storage.getById<AdminProduct>(COLLECTION, id);
  },

  async create(data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminProduct> {
    const product: AdminProduct = {
      ...data,
      id: storage.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.create(COLLECTION, product);
  },

  async update(id: string, data: Partial<AdminProduct>): Promise<AdminProduct | null> {
    return storage.update<AdminProduct>(COLLECTION, id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },

  async remove(id: string): Promise<boolean> {
    return storage.remove(COLLECTION, id);
  },

  async getFeatured(): Promise<AdminProduct[]> {
    const all = await this.getAll();
    return all.filter(p => p.featured && p.status === 'active');
  },

  async getByCategory(category: string): Promise<AdminProduct[]> {
    const all = await this.getAll();
    return all.filter(p => p.category === category);
  },
};
