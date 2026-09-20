import { storage } from './storage';
import type { AdminCategory } from '../types/admin.types';
import { fetchSupabaseCatalog } from '../../products/services/catalogService';

const COLLECTION = 'categories';

export const categoriesService = {
  async getAll(): Promise<AdminCategory[]> {
    return storage.getAll<AdminCategory>(COLLECTION);
  },

  async getById(id: string): Promise<AdminCategory | null> {
    return storage.getById<AdminCategory>(COLLECTION, id);
  },

  async create(data: Omit<AdminCategory, 'id' | 'createdAt'>): Promise<AdminCategory> {
    const category: AdminCategory = {
      ...data,
      id: storage.generateId(),
      createdAt: new Date().toISOString(),
    };
    const res = await storage.create(COLLECTION, category);
    fetchSupabaseCatalog();
    return res;
  },

  async update(id: string, data: Partial<AdminCategory>): Promise<AdminCategory | null> {
    const res = await storage.update<AdminCategory>(COLLECTION, id, data);
    fetchSupabaseCatalog();
    return res;
  },

  async remove(id: string): Promise<boolean> {
    const res = await storage.remove(COLLECTION, id);
    fetchSupabaseCatalog();
    return res;
  },
};
