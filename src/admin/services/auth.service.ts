import type { AuthToken, AdminUser } from '../types/admin.types';

const TOKEN_KEY = 'magnus_admin_token';

const ADMIN_USERS: { email: string; password: string; user: AdminUser }[] = [
  {
    email: 'admin@magnus.com',
    password: 'magnus2024',
    user: {
      id: 'admin_001',
      email: 'admin@magnus.com',
      name: 'Magnus Admin',
      role: 'super_admin',
    },
  },
];

export const authService = {
  async login(email: string, password: string): Promise<AuthToken | null> {
    const match = ADMIN_USERS.find(u => u.email === email && u.password === password);
    if (!match) return null;

    const token: AuthToken = {
      token: `jwt_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      user: match.user,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    return token;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken(): AuthToken | null {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const token: AuthToken = JSON.parse(raw);
    if (Date.now() > token.expiresAt) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return token;
  },

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  },

  getUser(): AdminUser | null {
    const token = this.getToken();
    return token?.user || null;
  },
};
