import type { AuthToken, AdminUser } from '../types/admin.types';
import { parseStoredJson } from './storage';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const SESSION_TOKEN_KEY = 'magnus_admin_session';

export const authService = {
  /**
   * Authenticate admin user.
   * If Supabase is configured, authenticates via Supabase GoTrue Auth (server-side bcrypt & JWT).
   * Otherwise, falls back to dev environment variables if configured in .env.local.
   * Fails cleanly and generically without leaking credentials or account existence.
   */
  async login(email: string, password: string): Promise<AuthToken | null> {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      return null;
    }

    // 1. Supabase Backend Authentication (Production)
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (error || !data.session || !data.user) {
          return null;
        }

        // ── Admin Authorization Verification ──
        // Ensure ordinary authenticated users cannot access the administration area.
        const appRole = data.user.app_metadata?.role;
        let isAuthorizedAdmin = appRole === 'admin' || appRole === 'super_admin';

        if (!isAuthorizedAdmin) {
          try {
            const { data: adminRecord, error: adminErr } = await supabase
              .from('admin_users')
              .select('role')
              .eq('id', data.user.id)
              .maybeSingle();

            if (!adminErr && adminRecord) {
              isAuthorizedAdmin = true;
            }
          } catch {
            // Fails closed if query errors out
          }
        }

        if (!isAuthorizedAdmin) {
          // Reject access and revoke session immediately
          await supabase.auth.signOut();
          return null;
        }

        const sessionToken: AuthToken = {
          token: data.session.access_token,
          user: {
            id: data.user.id,
            email: data.user.email || trimmedEmail,
            name: data.user.user_metadata?.full_name || 'Magnus Administrator',
            role: 'super_admin',
          },
          expiresAt: (data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 8 * 60 * 60 * 1000),
        };

        this.setSession(sessionToken);
        return sessionToken;
      } catch {
        return null;
      }
    }

    // 2. Development / Sandbox fallback (local development only via .env.local)
    const devEmail = import.meta.env.VITE_DEV_ADMIN_EMAIL;
    const devPassword = import.meta.env.VITE_DEV_ADMIN_PASSWORD;

    if (import.meta.env.DEV && devEmail && devPassword) {
      if (trimmedEmail === devEmail.trim().toLowerCase() && password === devPassword) {
        const devSession: AuthToken = {
          token: `dev_${Date.now()}`,
          user: {
            id: 'dev_admin',
            email: devEmail,
            name: 'Magnus Administrator',
            role: 'super_admin',
          },
          expiresAt: Date.now() + 8 * 60 * 60 * 1000,
        };
        this.setSession(devSession);
        return devSession;
      }
    }

    return null;
  },

  /**
   * Save active session in sessionStorage so it is cleared on browser close.
   */
  setSession(session: AuthToken): void {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(session));
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('magnus_admin_token');
      }
    } catch {
      // Storage unavailable or disabled
    }
  },

  /**
   * End the user session and clear all authentication tokens.
   */
  async logout(): Promise<void> {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('magnus_admin_token');
      }
    } catch {
      // Ignore
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Continue even if remote network fails
      }
    }
  },

  /**
   * Retrieve current active session token if valid and unexpired.
   */
  getToken(): AuthToken | null {
    try {
      if (typeof sessionStorage === 'undefined') return null;
      const raw = sessionStorage.getItem(SESSION_TOKEN_KEY);
      if (!raw) return null;

      const token = parseStoredJson<AuthToken | null>(raw, null);
      if (!token) return null;

      if (Date.now() > token.expiresAt) {
        this.logout();
        return null;
      }
      return token;
    } catch {
      return null;
    }
  },

  /**
   * Check if a session exists and has not expired.
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  },

  /**
   * Get the currently authenticated admin user details.
   */
  getUser(): AdminUser | null {
    const token = this.getToken();
    return token?.user || null;
  },

  /**
   * Request a password recovery email via Supabase Auth.
   * Dynamically constructs redirectTo using window.location.origin so both dev (5173)
   * and production domains work without hardcoding ports.
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: 'Email address is required.' };
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        const redirectTo = typeof window !== 'undefined' && window.location?.origin
          ? `${window.location.origin}/admin/reset-password`
          : undefined;

        const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
          redirectTo,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : 'Failed to send password reset email.',
        };
      }
    }

    return { success: false, error: 'Authentication service is not configured.' };
  },

  /**
   * Update the user password when in a Supabase password-recovery session.
   * On success, establishes the admin session token.
   */
  async updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          const sessionData = await supabase.auth.getSession();
          const session = sessionData.data.session;
          const sessionToken: AuthToken = {
            token: session?.access_token || '',
            user: {
              id: data.user.id,
              email: data.user.email || '',
              name: data.user.user_metadata?.full_name || 'Magnus Administrator',
              role: 'super_admin',
            },
            expiresAt: session?.expires_at ? session.expires_at * 1000 : Date.now() + 8 * 60 * 60 * 1000,
          };
          this.setSession(sessionToken);
        }

        return { success: true };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : 'Failed to update password.',
        };
      }
    }

    return { success: false, error: 'Authentication service is not configured.' };
  },
};
