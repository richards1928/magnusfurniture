import { storage } from './storage';
import type { AdminTestimonial } from '../types/admin.types';

const COLLECTION = 'testimonials';

export const testimonialsService = {
  async getAll(): Promise<AdminTestimonial[]> {
    return storage.getAll<AdminTestimonial>(COLLECTION);
  },

  async getById(id: string): Promise<AdminTestimonial | null> {
    return storage.getById<AdminTestimonial>(COLLECTION, id);
  },

  async create(data: Omit<AdminTestimonial, 'id' | 'createdAt'>): Promise<AdminTestimonial> {
    const testimonial: AdminTestimonial = {
      ...data,
      id: storage.generateId(),
      createdAt: new Date().toISOString(),
    };
    return storage.create(COLLECTION, testimonial);
  },

  async update(id: string, data: Partial<AdminTestimonial>): Promise<AdminTestimonial | null> {
    return storage.update<AdminTestimonial>(COLLECTION, id, data);
  },

  async remove(id: string): Promise<boolean> {
    return storage.remove(COLLECTION, id);
  },
};
