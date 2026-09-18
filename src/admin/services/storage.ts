/* ============================================================
   Authoritative Storage Abstraction — Supabase DB backed with
   graceful offline/local fallback.
   ============================================================ */

import { supabase, isSupabaseConfigured } from '../../lib/supabase';


export function parseStoredJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/* ── camelCase ↔ snake_case key mapping ────────────────────── */

/**
 * Convert a single camelCase string to snake_case.
 * e.g. "shortDescription" → "short_description"
 */
function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Convert a single snake_case string to camelCase.
 * e.g. "short_description" → "shortDescription"
 */
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/**
 * Transform all top-level keys of a plain object from camelCase to snake_case.
 * Used when writing data TO Supabase.
 */
export function toSnakeCaseKeys<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    result[camelToSnake(key)] = obj[key];
  }
  return result;
}

/**
 * Transform all top-level keys of a plain object from snake_case to camelCase.
 * Used when reading data FROM Supabase.
 */
export function toCamelCaseKeys<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    result[snakeToCamel(key)] = obj[key];
  }
  return result as T;
}

/* ── Storage abstraction ───────────────────────────────────── */

// In-memory sandbox store used strictly for offline local dev/unit tests when Supabase is not configured.
// Never persists to or relies on browser localStorage.
const devMemoryStore = new Map<string, Record<string, unknown>[]>();

export const storage = {
  async getAll<T>(collection: string): Promise<T[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from(collection).select('*');
      if (error) {
        throw new Error(`[Supabase ${collection}] ${error.message}`);
      }
      return ((data || []) as Record<string, unknown>[]).map((row) => toCamelCaseKeys<T>(row));
    }

    if (import.meta.env.PROD) {
      throw new Error(`[Storage] Remote database is not configured. Cannot read collection: ${collection}`);
    }

    const items = (devMemoryStore.get(collection) || []) as unknown as T[];
    return [...items];
  },

  async getById<T extends { id: string }>(collection: string, id: string): Promise<T | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from(collection).select('*').eq('id', id).maybeSingle();
      if (error) {
        throw new Error(`[Supabase ${collection}] ${error.message}`);
      }
      if (!data) return null;
      return toCamelCaseKeys<T>(data as Record<string, unknown>);
    }

    const items = await this.getAll<T>(collection);
    return items.find(item => item.id === id) || null;
  },

  async create<T extends { id: string }>(collection: string, item: T): Promise<T> {
    if (isSupabaseConfigured() && supabase) {
      const snakeItem = toSnakeCaseKeys(item as unknown as Record<string, unknown>);
      // Attempt insert with select (returns generated row for authenticated users/tables with select policies)
      const { data, error } = await supabase.from(collection).insert(snakeItem).select().maybeSingle();
      if (error) {
        // If representation request failed due to write-only RLS (anon inserting into leads or quote_requests),
        // fallback to a minimal insert without representation
        const { error: insertError } = await supabase.from(collection).insert(snakeItem);
        if (insertError) {
          throw new Error(`[Supabase ${collection}] ${insertError.message}`);
        }
        return item;
      }
      return data ? toCamelCaseKeys<T>(data as Record<string, unknown>) : item;
    }

    if (import.meta.env.PROD) {
      throw new Error(`[Storage] Remote database is not configured. Cannot write to collection: ${collection}`);
    }

    const items = devMemoryStore.get(collection) || [];
    items.push(item as unknown as Record<string, unknown>);
    devMemoryStore.set(collection, items);
    return item;
  },

  async update<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): Promise<T | null> {
    if (isSupabaseConfigured() && supabase) {
      const snakeUpdates = toSnakeCaseKeys(updates as unknown as Record<string, unknown>);
      const { data, error } = await supabase.from(collection).update(snakeUpdates).eq('id', id).select().single();
      if (error) {
        throw new Error(`[Supabase ${collection}] ${error.message}`);
      }
      return toCamelCaseKeys<T>(data as Record<string, unknown>);
    }

    if (import.meta.env.PROD) {
      throw new Error(`[Storage] Remote database is not configured. Cannot update collection: ${collection}`);
    }

    const items = (devMemoryStore.get(collection) || []) as unknown as (T & { id: string })[];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    return items[index];
  },

  async remove(collection: string, id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from(collection).delete().eq('id', id);
      if (error) {
        throw new Error(`[Supabase ${collection}] ${error.message}`);
      }
      return true;
    }

    if (import.meta.env.PROD) {
      throw new Error(`[Storage] Remote database is not configured. Cannot delete from collection: ${collection}`);
    }

    const items = (devMemoryStore.get(collection) || []) as unknown as { id: string }[];
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    devMemoryStore.set(collection, filtered as unknown as Record<string, unknown>[]);
    return true;
  },

  async count(collection: string): Promise<number> {
    if (isSupabaseConfigured() && supabase) {
      const { count, error } = await supabase.from(collection).select('*', { count: 'exact', head: true });
      if (error) {
        throw new Error(`[Supabase ${collection}] ${error.message}`);
      }
      return count || 0;
    }

    const items = await this.getAll(collection);
    return items.length;
  },

  generateId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
};
