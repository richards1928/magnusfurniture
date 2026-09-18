import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { authService } from './auth.service';

// Mock Web Storage for Vitest Node environment
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

// Assign to global if running in Node test environment
if (typeof globalThis.sessionStorage === 'undefined') {
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: new MemoryStorage(),
    writable: true,
  });
}
if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: new MemoryStorage(),
    writable: true,
  });
}

describe('authService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('rejects empty or whitespace email and password', async () => {
    const result1 = await authService.login('', '');
    expect(result1).toBeNull();

    const result2 = await authService.login('   ', 'password');
    expect(result2).toBeNull();

    const result3 = await authService.login('admin@test.com', '');
    expect(result3).toBeNull();
  });

  it('reports unauthenticated when no session exists', () => {
    expect(authService.isAuthenticated()).toBe(false);
    expect(authService.getUser()).toBeNull();
    expect(authService.getToken()).toBeNull();
  });

  it('handles active sessions and properly parses stored user', () => {
    const mockToken = {
      token: 'test_token_abc123',
      user: {
        id: 'admin_1',
        email: 'admin@magnusfurniture.com',
        name: 'Lead Administrator',
        role: 'super_admin' as const,
      },
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour future
    };

    authService.setSession(mockToken);
    expect(authService.isAuthenticated()).toBe(true);
    expect(authService.getUser()?.email).toBe('admin@magnusfurniture.com');
    expect(authService.getUser()?.name).toBe('Lead Administrator');
  });

  it('invalidates expired sessions automatically', () => {
    const expiredToken = {
      token: 'expired_token',
      user: {
        id: 'admin_1',
        email: 'admin@magnusfurniture.com',
        name: 'Lead Administrator',
        role: 'super_admin' as const,
      },
      expiresAt: Date.now() - 1000, // Expired in past
    };

    authService.setSession(expiredToken);
    expect(authService.isAuthenticated()).toBe(false);
    expect(authService.getToken()).toBeNull();
    expect(authService.getUser()).toBeNull();
  });

  it('clears session on logout and purges legacy localStorage token', async () => {
    const activeToken = {
      token: 'active_token',
      user: {
        id: 'admin_1',
        email: 'admin@magnusfurniture.com',
        name: 'Lead Administrator',
        role: 'super_admin' as const,
      },
      expiresAt: Date.now() + 60 * 60 * 1000,
    };

    authService.setSession(activeToken);
    localStorage.setItem('magnus_admin_token', 'legacy_data');

    expect(authService.isAuthenticated()).toBe(true);

    await authService.logout();

    expect(authService.isAuthenticated()).toBe(false);
    expect(sessionStorage.getItem('magnus_admin_session')).toBeNull();
    expect(localStorage.getItem('magnus_admin_token')).toBeNull();
  });

  it('handles corrupted JSON in session storage gracefully without crashing', () => {
    sessionStorage.setItem('magnus_admin_session', '{invalid_json');
    expect(authService.isAuthenticated()).toBe(false);
    expect(authService.getToken()).toBeNull();
    expect(authService.getUser()).toBeNull();
  });
});
