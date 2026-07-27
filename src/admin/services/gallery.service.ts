import { storage } from './storage';
import type { GalleryItem } from '../types/admin.types';

const COLLECTION = 'gallery';

export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    return storage.getAll<GalleryItem>(COLLECTION);
  },

  async getById(id: string): Promise<GalleryItem | null> {
    return storage.getById<GalleryItem>(COLLECTION, id);
  },

  async create(data: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
    const item: GalleryItem = {
      ...data,
      id: storage.generateId(),
      createdAt: new Date().toISOString(),
    };
    return storage.create(COLLECTION, item);
  },

  async update(id: string, data: Partial<GalleryItem>): Promise<GalleryItem | null> {
    return storage.update<GalleryItem>(COLLECTION, id, data);
  },

  async remove(id: string): Promise<boolean> {
    return storage.remove(COLLECTION, id);
  },
};
