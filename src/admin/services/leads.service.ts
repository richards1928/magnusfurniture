import { storage } from './storage';
import type { Lead } from '../types/admin.types';

const COLLECTION = 'leads';

export const leadsService = {
  async getAll(): Promise<Lead[]> {
    return storage.getAll<Lead>(COLLECTION);
  },

  async getById(id: string): Promise<Lead | null> {
    return storage.getById<Lead>(COLLECTION, id);
  },

  async create(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    const lead: Lead = {
      ...data,
      id: storage.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.create(COLLECTION, lead);
  },

  async update(id: string, data: Partial<Lead>): Promise<Lead | null> {
    return storage.update<Lead>(COLLECTION, id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },

  async remove(id: string): Promise<boolean> {
    return storage.remove(COLLECTION, id);
  },

  async getByStatus(status: Lead['status']): Promise<Lead[]> {
    const all = await this.getAll();
    return all.filter(l => l.status === status);
  },
};
