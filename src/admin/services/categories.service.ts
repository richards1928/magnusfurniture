import { storage } from './storage';
import type { AdminCategory } from '../types/admin.types';

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
    return storage.create(COLLECTION, category);
  },

  async update(id: string, data: Partial<AdminCategory>): Promise<AdminCategory | null> {
    return storage.update<AdminCategory>(COLLECTION, id, data);
  },

  async remove(id: string): Promise<boolean> {
    return storage.remove(COLLECTION, id);
  },
};
