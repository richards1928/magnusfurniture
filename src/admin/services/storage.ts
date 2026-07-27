/* ============================================================
   Storage Abstraction — localStorage backed, API-ready
   All methods return Promises for easy backend migration.
   ============================================================ */

const PREFIX = 'magnus_admin_';

function getKey(collection: string): string {
  return `${PREFIX}${collection}`;
}

export const storage = {
  async getAll<T>(collection: string): Promise<T[]> {
    const raw = localStorage.getItem(getKey(collection));
    return raw ? JSON.parse(raw) : [];
  },

  async getById<T extends { id: string }>(collection: string, id: string): Promise<T | null> {
    const items = await this.getAll<T>(collection);
    return items.find(item => item.id === id) || null;
  },

  async create<T extends { id: string }>(collection: string, item: T): Promise<T> {
    const items = await this.getAll<T>(collection);
    items.push(item);
    localStorage.setItem(getKey(collection), JSON.stringify(items));
    return item;
  },

  async update<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): Promise<T | null> {
    const items = await this.getAll<T>(collection);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(getKey(collection), JSON.stringify(items));
    return items[index];
  },

  async remove(collection: string, id: string): Promise<boolean> {
    const items = await this.getAll<{ id: string }>(collection);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    localStorage.setItem(getKey(collection), JSON.stringify(filtered));
    return true;
  },

  async count(collection: string): Promise<number> {
    const items = await this.getAll(collection);
    return items.length;
  },

  generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  },
};
