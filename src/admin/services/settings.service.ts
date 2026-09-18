import { storage } from './storage';
import type { SiteSettings } from '../types/admin.types';

const COLLECTION = 'site_settings';
const DEFAULT_ID = 'default';

export const defaultSettings: SiteSettings = {
  businessName: 'Magnus Office Furniture',
  tagline: 'Premium Office Furniture in Hyderabad',
  phone: '9090626207',
  email: 'magnusofficefurniture@gmail.com',
  whatsapp: '919090626207',
  address: 'M R Elite, 3rd Floor, Opposite Sarath City, Kondapur, Hyderabad 500084',
  socialLinks: {},
  seoTitle: 'Magnus Office Furniture | Premium Office Furniture in Hyderabad',
  seoDescription: 'Transform your workspace with Magnus Office Furniture. Premium office chairs, workstations, and conference tables in Hyderabad.',
};

export const settingsService = {
  async get(): Promise<SiteSettings> {
    try {
      const res = await storage.getById<SiteSettings & { id: string }>(COLLECTION, DEFAULT_ID);
      if (res) return res;
    } catch {
      // Return defaults if not yet initialized
    }
    return defaultSettings;
  },

  async update(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const existing = await this.get();
    const updated = { ...existing, ...data, id: DEFAULT_ID };
    try {
      const saved = await storage.update<SiteSettings & { id: string }>(COLLECTION, DEFAULT_ID, updated);
      if (saved) return saved;
    } catch {
      // Fallback create if not exists
    }
    const created = await storage.create<SiteSettings & { id: string }>(COLLECTION, updated);
    return created as SiteSettings;
  },
};
